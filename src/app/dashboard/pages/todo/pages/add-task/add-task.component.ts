import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudTasksService } from '../../services/tasks/crudTasks.service';
import { CrudEstimationsService } from '../../services/estimations/crudEstimations.service';
import { CrudPriorityService } from '../../services/priorities/CrudPriority.service';
import { CrudCategoriesService } from '../../services/categories/CrudCategories.service';
import { CrudStatusService } from '../../services/status/CrudStatus.service';
import { CategoryTask } from '../../models/CategoryTask';
import { EstimationTask } from '../../models/EstimationTask';
import { PriorityTasks } from '../../models/PriorityTask';
import { StatusTask } from '../../models/StatusTask';
import { Course } from '../../models/Courses';
import { CrudCoursesService } from '../../../calendar/services/courses/CrudCourses.service';
import { GeneralDataService } from '../../../../../core/services/generalData.service';

@Component({
  selector: 'app-add-task',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit{

  getIdPriorities: number = 0;
  getIdComplexities: number = 0;

  hashMaps: boolean = false;
  hashCourse: boolean = false;

  categories: CategoryTask[] = []
  estimations: EstimationTask[] = []
  priorities: PriorityTasks[] = []
  status: StatusTask[] = []
  courses: Course[] = []

  private fb = inject(FormBuilder)
  private serviceTask = inject(CrudTasksService)
  private serviceEstimation = inject(CrudEstimationsService)
  private servicePriority = inject(CrudPriorityService)
  private serviceCategory = inject(CrudCategoriesService)
  private serviceStatus = inject(CrudStatusService)
  private serviceCourse = inject(CrudCoursesService)
  private generalData = inject(GeneralDataService)

  readonly urlCourses: string = `${this.serviceCourse.getApiUrl()}`
  readonly urlStatusTasks: string = `${this.serviceStatus.getApiUrl()}`
  readonly urlCategories: string = `${this.serviceCategory.getApiUrl()}`
  readonly urlPriorities: string = `${this.servicePriority.getApiUrl()}`
  readonly urlEstimations: string = `${this.serviceEstimation.getApiUrl()}`
  readonly urlTaks: string = `${this.serviceTask.getApiUrl()}`

  private createForm(): FormGroup{
    return this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(512)]],
      make_date: ['2024-04-10', Validators.required],
      limit_date: ['2025-05-11', Validators.required],
      avatar_url: ['jiowdjaiowfj.wdij', [Validators.maxLength(255)]],
      id_priority: [1, Validators.required],
      id_estimation: [1, Validators.required],
      id_category_task: [0, Validators.required],
      id_status_task: [0, Validators.required],
      id_course: [undefined]
    });
  }

  taskForm: FormGroup = this.createForm();
  categies: any[] = [];

  ngOnInit(): void {
    this.loadData<StatusTask>(this.urlStatusTasks, 'status')
    this.loadData<CategoryTask>(this.urlCategories, 'categories')
    this.loadData<PriorityTasks>(this.urlPriorities, 'priorities')
    this.loadData<EstimationTask>(this.urlEstimations, 'estimations')
    this.loadData<Course>(this.urlCourses, 'courses')

    this.categies = [
      {
        id: 1,
        name: 'Development',
        icon_path: 'https://imageshack.com/i/po6Cpxgcp',
      },
      {
        id: 2,
        name: 'Design',
        icon_path: 'https://via.placeholder.com/150',
      },
    ];
  }

  //START Services

  private loadData<T>(url: string, target: keyof this & string): void {
    this.generalData.getDataWithIndex(url).subscribe({
      next: (data: T[]) => {
        (this[target] as T[]) = data;
        console.log(data)
      },
      error: (err) => {
        console.error(`Error cargando datos desde ${url}`, err)
      }
    });
  }

  createTask(): void {
    const taskData = this.taskForm.getRawValue();
    this.generalData.createData(`${this.urlTaks}`, taskData).subscribe({
      next: (res) => {
        console.log('Tarea creada', res);
      }
    })
  }

  private setFormValue(formKey: string, value: number | undefined): void {
    if(value !== undefined){
      this.taskForm.patchValue({ [formKey]: value });
    } else {
      console.error(`No se pudo actualizar ${formKey}. Valor no definido`);
    }
  }

  //END Services

  setPriority(priorities: any): void {
    this.setFormValue('id_priority', priorities.id)
  }

  setComplexity(estimations: any): void {
    this.setFormValue('id_estimation', estimations.id)
  }

  onSubmit(): void {
    console.log(this.taskForm.value)
    this.createTask()
  }

  toggleProperty(property: 'hashMaps' | 'hashCourse'): void {
    this[property] = !this[property];
  }

}
