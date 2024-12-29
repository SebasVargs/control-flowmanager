import { Component, OnInit } from '@angular/core';
import { CategComplexService } from './services/categ-complex.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InterfViewComponent } from "./pages/interf-view/interf-view.component";
import { PriorityTasks } from '../../models/priority-tasks';
import { CategoriesTask } from '../../models/categories-tasks';

@Component({
  selector: 'app-todo-today',
  imports: [CommonModule, ReactiveFormsModule, InterfViewComponent],
  templateUrl: './todo-today.component.html',
  styleUrl: './todo-today.component.css'
})
export class TodoTodayComponent implements OnInit {

  categoriesTask: CategoriesTask[] = []
  prioritiesTask: PriorityTasks[] = []

  constructor(
    private getCateComplex: CategComplexService
  ){}

  ngOnInit(): void {
    this.getPrioties()
  }

  getCategories():void {
    this.getCateComplex.getCategories().subscribe({
      next: (data) => {
        console.log("Categories", data)
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

  getPrioties():void {
    this.getCateComplex.getPriorities().subscribe({
      next: (data) => {
        console.log("Priorities", data)
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

}
