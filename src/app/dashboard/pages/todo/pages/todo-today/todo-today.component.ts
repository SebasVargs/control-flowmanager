import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriorityTasks } from '../../models/PriorityTask';
import { CrudTasksService } from '../../services/tasks/crudTasks.service';
import { Task } from '../../models/Task';
import { CrudEstimationsService } from '../../services/estimations/crudEstimations.service';
import { EstimationTask } from '../../models/EstimationTask';
import { CrudCategoriesService } from '../../services/categories/CrudCategories.service';
import { CategoryTask } from '../../models/CategoryTask';
import { CrudPriorityService } from '../../services/priorities/CrudPriority.service';
import { GeneralDataService } from '../../../../../core/services/generalData.service';
import { CrudCoursesService } from '../../../calendar/services/courses/CrudCourses.service';
import { Course } from '../../models/Courses';
import { RouterLink } from '@angular/router';
import { CrudHabilitiesService } from '../../services/habilities/CrudHabilities.service';
import { initialTaskFilters, TaskFilters } from './config/vars/app-filters';
import { initialTaskData, TaskData } from './config/vars/app-task-today';
import { AppConfig, initialAppConfig } from './config/vars/app-config';
@Component({
  selector: 'app-todo-today',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './todo-today.component.html',
  styleUrl: './todo-today.component.css'
})
export class TodoTodayComponent implements OnInit {

  config: AppConfig = initialAppConfig
  taskData: TaskData = initialTaskData
  taskFilters: TaskFilters = initialTaskFilters;

  private serviceTasks = inject(CrudTasksService)
  private serviceEstimations = inject(CrudEstimationsService)
  private serviceCategories = inject(CrudCategoriesService)
  private servicePriorities = inject(CrudPriorityService)
  private serviceCourses = inject(CrudCoursesService)
  private serviceHabilities = inject(CrudHabilitiesService)
  private generalData = inject(GeneralDataService)

  readonly urlCategories: string = `${this.serviceCategories.getApiUrl()}`
  readonly urlPriorities: string = `${this.servicePriorities.getApiUrl()}`
  readonly urlTasks: string = `${this.serviceTasks.getApiUrl()}`
  readonly urlEstimation: string = `${this.serviceEstimations.getApiUrl()}`
  readonly urlCourses: string = `${this.serviceCourses.getApiUrl()}`
  readonly urlHabilities: string = `${this.serviceHabilities.getApiUrl()}`

  ngOnInit(): void {
    this.loadData<EstimationTask>(`${this.urlEstimation}`, 'estimations')
    this.loadData<Task>(`${this.urlTasks}`, 'tasks')
    this.loadData<CategoryTask>(`${this.urlCategories}`, 'categories')
    this.loadData<PriorityTasks>(`${this.urlPriorities}`, 'priorities')
    this.loadData<Course>(`${this.urlCourses}`, 'courses')
    this.loadData(`${this.urlHabilities}`, 'habilities')
  }

  private loadData<T>(url: string, target: keyof TaskData): void {
    this.generalData.getDataWithIndex(url).subscribe({
      next: (data: T[]) => {
        // Asegurarse de que T coincida con el tipo correcto
        if (Array.isArray(data)) {
          this.taskData[target] = data as any[];  // Asegurar que sea un arreglo
          console.log(`Datos cargados para ${target}:`, data);
        } else {
          console.error('Error: Los datos no son un arreglo válido');
        }
      },
      error: (err) => {
        console.error(`Error cargando datos desde ${url}`, err);
      }
    });
  }

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
    const month = this.config.months.find((m) => m.id === monthIndex);
    return month ? month.name : "Mes desconocido";
  }

  //END FORMAT SERVICES

  //START FORMS MODULE - SHOW MODALS

  showFormatMake(tablee: any) {
    tablee.isEditingMake = true;
    tablee.formattedMakeDate = this.formDateVisualization(tablee.make_date);
    console.log('Fecha formateada:', this.config.formattedDate);
  }

  hiddeFormatMake(tablee: any) {
    tablee.isEditingMake = false;
  }

  showFormatLimit(tablee: any) {
    tablee.isEditingLimit = true;
    tablee.formattedLimitDate = this.formDateVisualization(tablee.limit_date);
    console.log('Fecha formateada:', this.config.formattedDate);
  }

  hiddeFormatLimit(tablee: any) {
    tablee.isEditingLimit = false;
  }

  selectItem(task: any) {
    this.config.selectedTask = task;
    if (task.isEditingLimit == false) {
      task.formattLimitDate = this.formDateVisualization(task.limit_date);
    } else if (task.isEditingMake == false) {
      task.formattMakeDate = this.formDateVisualization(task.make_date);
    }
  }

  isEditingDates(task: any) {
    task.isEditingDates = true
  }

  toggleEditDates(task: any): void {
    // Verifica que la tarea existe antes de modificar su estado
    if (task) {
      task.isEditingDates = !task.isEditingDates;
    }
  }

  hiddeDescripTask() {
    this.config.selectedTask = false;
  }

  //END FORMS MODULE - SHOW MODALS

  //START FILTERS

  filterPriorities(priority: string): void {
    this.taskFilters.selectedPriority = priority; // Establece la prioridad seleccionada

    // Aquí debes traer las tareas con el servicio adecuado
    this.generalData.getDataWithIndex(`${this.urlTasks}`).subscribe({
      next: (data: any) => {
        // Filtra las tareas por la prioridad seleccionada
        this.taskData.tasks = data.filter((task: any) => task.id_priority.name === priority);

        if (this.taskData.tasks.length > 0) {
          //
        } else {
          console.warn('No tasks matched the selected priority.');
        }
      },
      error: (err) => {
        console.error('Error fetching tasks:', err);
      },
    });
    this.config.isEditingFilter = false;
  }

  cancelFilterPriorities() {
    this.config.isEditingFilter = true;
    this.taskFilters.selectedPriority = '';
    this.loadData<Task>(`${this.urlTasks}`, 'tasks')
  }

  //END FILTERS

  openDeleteTask(id: number) {
    this.config.isDeleteTask = true
    this.config.taskId = id;
  }

  acceptLogoutModal() {
    if (this.config.taskId) {
      this.deleteTaskById(this.config.taskId)
      console.log("Tarea eliminada exitosamente")
    } else {
      console.log("Tarea no encontrada")
    }
    this.closeLogoutModal()
  }

  closeLogoutModal() {
    this.config.isDeleteTask = false
  }

  deleteTaskById(taskId: number): void {
    if (taskId) {
      this.serviceTasks.deleteTaskById(taskId).subscribe(
        () => {
          this.taskData.tasks = this.taskData.tasks.filter(task => task.id !== taskId); // Remover el producto del array localmente
        }
      );
    }
  }

  selectedCourseId: number | null = null;
  selectedHabilityId: number | null = null;

  onCourseChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    console.log('Selected Course ID:', selectedId);
    // Puedes realizar acciones aquí según el ID seleccionado
    this.selectedCourseId = Number(selectedId);
  }

  onHabilityChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    console.log('Selected Hability ID:', selectedId);
    this.selectedHabilityId = Number(selectedId)
  }

}
