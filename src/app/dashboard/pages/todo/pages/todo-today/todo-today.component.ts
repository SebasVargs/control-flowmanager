import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriorityTasks } from '../../models/PriorityTask';
import { monthItems } from '../../../../shared/data/months';
import { CrudTasksService } from '../../services/tasks/crudTasks.service';
import { Task } from '../../models/Task';
import { CrudEstimationsService } from '../../services/estimations/crudEstimations.service';
import { EstimationTask } from '../../models/EstimationTask';
import { CrudCategoriesService } from '../../services/categories/CrudCategories.service';
import { CategoryTask } from '../../models/CategoryTask';
import { CrudPriorityService } from '../../services/priorities/CrudPriority.service';
@Component({
  selector: 'app-todo-today',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './todo-today.component.html',
  styleUrl: './todo-today.component.css'
})
export class TodoTodayComponent implements OnInit {

  isDeleteTask = false;
  taskId: number = 0;


  formattedDate: string = '';
  isDateFormat: boolean = false;
  months = monthItems
  isEditingFilter: boolean = true;

  selectedTask: any;

  searchText: String = '';
  product: String = ''

  priorities: PriorityTasks[] = []
  categories: CategoryTask[] = []
  estimations: EstimationTask[] = []
  tasks: Task[] = []

  selectedPriority: string = '';
  filteredTask: any[] = []

  private serviceTasks = inject(CrudTasksService)
  private serviceEstimations = inject(CrudEstimationsService)
  private serviceCategories = inject(CrudCategoriesService)
  private servicePriorities = inject(CrudPriorityService)

  ngOnInit(): void {
    this.getEstimations()
    this.getTasks()
    this.getPriorities()
  }

  //START GETS SERVICES

  getCategories(): void{
    this.serviceCategories.getCategories().subscribe({
      next: (data) => {
        this.categories = data.map((category: CategoryTask, index: number) => ({
          ...category,
          index: index + 1
        }))
      }
    })
  }

  getPriorities():void {
    this.servicePriorities.getPriorities().subscribe({
      next: (data) => {
        this.priorities = data.map((priority: PriorityTasks, index: number) => ({
          ...priority,
          index: index + 1
        }))
      }
    })
  }

  getTasks(): void{
    this.serviceTasks.getTasks().subscribe({
      next: (data) => {
        this.tasks = data.map((task: Task, index: number) => ({
          ...task,
          index: index + 1
        }))
      }
    })
  }

  getEstimations(): void{
    this.serviceEstimations.getEstimations().subscribe({
      next: (data) => {
        this.estimations = data.map((estimation: EstimationTask, index: number) => ({
          ...estimation,
          index: index + 1
        }))
      }
    })
  }

  //END GETS SERVICES

  //START FORMAT SERVICES

  formDateVisualization(originalDate: string | Date): string {
    // Si la fecha es una cadena en formato 'YYYY-MM-DD', construirla en UTC para evitar cambios de zona horaria
    const date = new Date(`${originalDate}T00:00:00`); // Agregar T00:00:00 para indicar que es medianoche

    // Verifica si la fecha es válida
    if (isNaN(date.getTime())) {
      console.error('Fecha no válida', originalDate);
      return 'Fecha inválida';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = this.getMonthName(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day} ${month} de ${year}`;
  }


  getMonthName(monthIndex: number): string {
    const month = this.months.find((m) => m.id === monthIndex);
    return month ? month.name : "Mes desconocido";
  }

  //END FORMAT SERVICES

  //START FORMS MODULE - SHOW MODALS

  showFormatMake(tablee: any){
    tablee.isEditingMake = true;
    tablee.formattedMakeDate = this.formDateVisualization(tablee.make_date);
    console.log('Fecha formateada:', this.formattedDate);
  }

  hiddeFormatMake(tablee: any){
    tablee.isEditingMake = false;
  }

  showFormatLimit(tablee: any){
    tablee.isEditingLimit = true;
    tablee.formattedLimitDate = this.formDateVisualization(tablee.limit_date);
    console.log('Fecha formateada:', this.formattedDate);
  }

  hiddeFormatLimit(tablee: any){
    tablee.isEditingLimit = false;
  }

  selectItem(task: any){
    this.selectedTask = task;
    if(task.isEditingLimit == false ){
      task.formattLimitDate = this.formDateVisualization(task.limit_date);
    } else if(task.isEditingMake == false){
      task.formattMakeDate = this.formDateVisualization(task.make_date);
    }
  }

  isEditingDates(task: any){
    task.isEditingDates = true
  }

  toggleEditDates(task: any): void {
    // Verifica que la tarea existe antes de modificar su estado
    if (task) {
      task.isEditingDates = !task.isEditingDates;
    }
  }

  hiddeDescripTask(){
    this.selectedTask = false;
  }

  //END FORMS MODULE - SHOW MODALS

  //START FILTERS

  filterPriorities(priority: string): void {
    this.selectedPriority = priority; // Establece la prioridad seleccionada
    // Aquí debes traer las tareas con el servicio adecuado
    this.serviceTasks.getTasks().subscribe({
      next: (data: any) => {
        // Filtra las tareas por la prioridad seleccionada
        this.tasks = data.filter((task: any) => task.id_priority.name === priority);

        if (this.tasks.length > 0) {
          //
        } else {
          console.warn('No tasks matched the selected priority.');
        }
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      },
    });
    this.isEditingFilter = false;
  }

  cancelFilterPriorities(){
    this.isEditingFilter = true;
    this.selectedPriority = '';
    //this.tasks = this.getTasks();
  }

  //END FILTERS

  openDeleteTask(id: number){
    this.isDeleteTask = true
    this.taskId = id;
  }

  acceptLogoutModal(){
    if(this.taskId){
      this.deleteTaskById(this.taskId)
      console.log("Tarea eliminada exitosamente")
    } else{
      console.log("Tarea no encontrada")
    }
    this.closeLogoutModal()
  }

  closeLogoutModal(){
    this.isDeleteTask = false
  }

  deleteTaskById(taskId: number): void {
    if (taskId) {
      this.serviceTasks.deleteTaskById(taskId).subscribe(
        () => {
          this.tasks = this.tasks.filter(task => task.id !== taskId); // Remover el producto del array localmente
        }
      );
    }
  }

}
