import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategComplexService } from '../todo-today/services/categ-complex.service';

@Component({
  selector: 'app-add-task',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit{

  taskForm: any;

  getIdPriorities: number = 0;
  getIdComplexities: number = 0;

  hashMaps: boolean = false;
  hashCourse: boolean = false;

  categoriesTask: any[] = []
  complexitiesTask: any[] = []
  prioritiesTask: any[] = []
  statusTask: any[] = []
  courses: any[] = []


  constructor(
    private fb: FormBuilder,
    private getCateComplex: CategComplexService
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(25)]],
      description: ['', [Validators.required, Validators.maxLength(512)]],
      make_date: ['2024-04-10', Validators.required],
      limit_date: ['2025-05-11', Validators.required],
      avatar_url: ['jiowdjaiowfj.wdij', [Validators.maxLength(255)]],
      id_priority: [1, Validators.required],
      id_estimation: [1, Validators.required],
      id_category_task: [1, Validators.required],
      id_status_task: [1, Validators.required],
      id_course: [0, ]
    });
  }

  ngOnInit(): void {
    this.getCategories()
    this.getStatusTask()
    this.getSchedule()
    this.getPriorities()
    this.getComplexities()
  }

  createTask(): void {
    this.getCateComplex.createTask(this.taskForm.value).subscribe({
      next: (res) => {
        console.log('Tarea creada:', res);
      },
      error: (err) => {
        console.error('Error al crear detalles', err);
      }
    })
  }

  getSchedule(): void {
    this.getCateComplex.getSchedule().subscribe({
      next: (data) => {
        this.courses = data.map((courses: any, index: any) => ({
          ...courses,
          index: index + 1
        }))
      },
      error: (err) => {
        console.error("Error al obtener el calendario")
      }
    })
  }

  getStatusTask(): void{
    this.getCateComplex.getStatusTask().subscribe({
      next: (data) => {
        this.statusTask = data.map((statusTask: any, index: any) => ({
          ...statusTask,
          index: index + 1
        }))
      },
      error: (err) => {
        console.error("Error al obtener los estados de la tareas")
      }
    })
  }

  getCategories():void {
    this.getCateComplex.getCategories().subscribe({
      next: (data) => {
        this.categoriesTask = data.map((categoryTask: any, index: any) => ({
          ...categoryTask,
          index: index + 1
        }));
      },
      error: (err) => {
        console.error("Error al obtener las categorias de tareas")
      }
    })
  }

  getPriorities():void {
    this.getCateComplex.getPriorities().subscribe({
      next: (data) => {
        this.prioritiesTask = data.map((priorityTask: any, index: any) => ({
          ...priorityTask,
          index: index + 1
        }));
      },
      error: (err) => {
        console.error("Error al obtener las complejidades de tareas")
      }
    })
  }

  getComplexities():void {
    this.getCateComplex.getComplexities().subscribe({
      next: (data) => {
        this.complexitiesTask = data.map((complexityTask: any, index: any) => ({
          ...complexityTask,
          index: index + 1
        }));
      },
      error: (err) => {
        console.error("Error al obtener las complejidades de tareas")
      }
    })
  }

  setPriority(priorities: any): void {
    this.getIdPriorities = priorities.id;
    if (this.getIdPriorities !== undefined) {
      this.taskForm.patchValue({ id_priority: this.getIdPriorities });
      console.log('id_priority actualizado:', this.taskForm.get('id_priority')?.value);
    } else {
      console.error('No se pudo actualizar id_priority. Valor no definido.');
    }
  }

  setComplexity(complexities: any): void {
    this.getIdComplexities = complexities.id;
    if (this.getIdComplexities !== undefined) {
      this.taskForm.patchValue({ id_estimation: this.getIdComplexities });
      console.log('id_estimation actualizado:', this.taskForm.get('id_estimation')?.value);
    } else {
      console.error('No se pudo actualizar id_estimation. Valor no definido.');
    }
  }

  onSubmit(): void {
    console.log(this.taskForm.value)
    this.createTask()
    if (this.taskForm.valid) {

    }
  }

  showMaps(){
    if(this.hashCourse == false){
      this.hashCourse = true
    } else {
      this.hashCourse = false
    }
  }

  showCourse(){
    if(this.hashMaps == false){
      this.hashMaps = true
    } else {
      this.hashMaps = false
    }
  }
}
