import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PriorityTasks } from '../../models/PriorityTask';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { monthItems } from '../../../../shared/data/months';
import { CrudTasksService } from '../../services/tasks/crudTasks.service';
import { CrudEstimationsService } from '../../services/estimations/crudEstimations.service';
import { CrudCategoriesService } from '../../services/categories/CrudCategories.service';
import { CrudPriorityService } from '../../services/priorities/CrudPriority.service';
import { CategoryTask } from '../../models/CategoryTask';
import { EstimationTask } from '../../models/EstimationTask';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-todo-home',
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './todo-home.component.html',
  styleUrl: './todo-home.component.css'
})
export class TodoHomeComponent {


    formattedDate: string = '';
    isDateFormat: boolean = false;
    months = monthItems
    isEditingFilter: boolean = true;

    selectedTask: any;

    searchText: String = '';
    product: String = ''
    categories: CategoryTask[] = []
    estimations: EstimationTask[] = []
    priorities: PriorityTasks[] = []
    tasks: any = []

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


    getMonthName(montIndex: number): string {
      const month = this.months.find((m) => m.id === montIndex);
      return month ? month.name : "Mes desconocido";
    }

    //END FORMAT SERVICES

    //START FORMS MODULE - SHOW MODALS


    showFormatMake(tablee: any){
      tablee.isEditingMake = true;
      tablee.formattedMakeDate = this.formDateVisualization(tablee.make_date);
    }

    hiddeFormatMake(tablee: any){
      tablee.isEditingMake = false;
    }

    showFormatLimit(tablee: any){
      tablee.isEditingLimit = true;
      tablee.formattedLimitDate = this.formDateVisualization(tablee.limit_date);
    }

    hiddeFormatLimit(tablee: any){
      tablee.isEditingLimit = false;
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
      this.tasks = this.getTasks();
    }

    //END FILTERS

}
