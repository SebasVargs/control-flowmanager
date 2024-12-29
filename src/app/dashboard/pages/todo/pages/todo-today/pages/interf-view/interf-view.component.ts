import { Component, OnInit } from '@angular/core';
import { CategComplexService } from '../../services/categ-complex.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableExample } from '../../models/table-example';
import { tableData } from '../../models/table-data';

@Component({
  selector: 'app-interf-view',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './interf-view.component.html',
  styleUrl: './interf-view.component.css'
})
export class InterfViewComponent implements OnInit{

  searchText: String = '';
  product: String = ''
  categoriesTask: any[] = []
  complexitiesTask: any[] = []
  tableData = tableData;

  constructor(
    private getCateComplex: CategComplexService
  ){}

  ngOnInit(): void {
    this.getComplexities()
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

  getComplexities():void {
    this.getCateComplex.getComplexities().subscribe({
      next: (data) => {
        console.log("Complexities", data)
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
}
