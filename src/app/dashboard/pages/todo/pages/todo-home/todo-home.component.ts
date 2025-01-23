import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PriorityTasks } from '../../models/PriorityTask';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { monthItems } from '../../../../shared/data/month-items';
import { CrudTasksService } from '../../services/tasks/crudTasks.service';
import { CrudEstimationsService } from '../../services/estimations/crudEstimations.service';
import { CrudCategoriesService } from '../../services/categories/CrudCategories.service';
import { CrudPriorityService } from '../../services/priorities/CrudPriority.service';
import { CategoryTask } from '../../models/CategoryTask';
import { EstimationTask } from '../../models/EstimationTask';
import { Task } from '../../models/Task';
import { GeneralDataService } from '../../../../../core/services/generalData.service';

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
  tasks: Task[] = []

  selectedPriority: string = '';
  filteredTask: any[] = []

  private serviceTasks = inject(CrudTasksService)
  private serviceEstimations = inject(CrudEstimationsService)
  private serviceCategories = inject(CrudCategoriesService)
  private servicePriorities = inject(CrudPriorityService)
  private generalData = inject(GeneralDataService)

  readonly urlEstimation: string = `${this.serviceEstimations.getApiUrl()}`
  readonly urlCategories: string = `${this.serviceCategories.getApiUrl()}`
  readonly urlPriorities: string = `${this.servicePriorities.getApiUrl()}`
  readonly urlTasks: string = `${this.serviceTasks.getApiUrl()}`

  ngOnInit(): void {
    this.loadData<EstimationTask>(`${this.urlEstimation}`, 'estimations')
    this.loadData<PriorityTasks>(`${this.urlPriorities}`, 'priorities')
    this.loadData<Task>(`${this.urlTasks}`, 'tasks')
    this.loadData<CategoryTask>(`${this.urlCategories}`, 'categories')
  }

  //START GETS SERVICES

  private loadData<T>(url: string, target: keyof this & string): void {
    this.generalData.getDataWithIndex(url).subscribe({
      next: (data: T[]) => {
        (this[target] as T[]) = data;
      },
      error: (err) => {
        console.error(`Error cargando datos desde ${url}`, err)
      }
    });
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

  toggleFormat(tablee: any, type: 'make' | 'limit', action: 'show' | 'hide'): void {
    const isEditingKey = `isEditing${type.charAt(0).toUpperCase()}${type.slice(1)}`;
    const formattedDateKey = `formatted${type.charAt(0).toUpperCase()}${type.slice(1)}Date`;
    const dateKey = `${type}_date`;

    if (action === 'show') {
      tablee[isEditingKey] = true;
      tablee[formattedDateKey] = this.formDateVisualization(tablee[dateKey]);
    } else if (action === 'hide') {
      tablee[isEditingKey] = false;
    }
  }

  onShowMake(tablee: any) {
    this.toggleFormat(tablee, 'make', 'show')
  }

  onHideMake(tablee: any) {
    this.toggleFormat(tablee, 'make', 'hide')
  }

  onShowLimit(tablee: any) {
    this.toggleFormat(tablee, 'limit', 'show')
  }

  onHideLimit(tablee: any) {
    this.toggleFormat(tablee, 'limit', 'hide')
  }

  //END FORMS MODULE - SHOW MODALS

  //START FILTERS

  filterPriorities(priority: string): void {
    this.selectedPriority = priority; // Establece la prioridad seleccionada

    // Aquí debes traer las tareas con el servicio adecuado
    this.generalData.getDataWithIndex(`${this.urlTasks}`).subscribe({
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

  cancelFilterPriorities() {
    this.isEditingFilter = true;
    this.selectedPriority = '';
    this.loadData<Task>(`${this.urlTasks}`, 'tasks');
  }

  //END FILTERS

}
