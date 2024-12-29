import { Component, OnInit } from '@angular/core';
import { CategComplexService } from '../../services/categ-complex.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableExample } from '../../models/table-example';
import { tableData } from '../../models/table-data';
import { DateUtilsService } from '../../../../../../utils/date-utils.service';
import { DateTimeTaskService } from '../../../../../../services/date-time-task.service';
import { Months } from '../../../../../../models/Months';

@Component({
  selector: 'app-interf-view',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './interf-view.component.html',
  styleUrl: './interf-view.component.css'
})
export class InterfViewComponent implements OnInit{

  formattedDate: string = '';
  isDateFormat: boolean = false;
  months: Months[] = []

  searchText: String = '';
  product: String = ''
  categoriesTask: any[] = []
  complexitiesTask: any[] = []
  tableDataa = tableData;

  constructor(
    private dateUtilsService: DateUtilsService,
    private getCateComplex: CategComplexService,
    private monthTaskService: DateTimeTaskService

  ){}

  ngOnInit(): void {
    this.getComplexities()
    this.monthTaskService.getMonths().subscribe((data) => {
      console.log("Meses recibidos:", data);  // Verifica los datos de meses recibidos
      this.months = data;
    })
  }

  showFormatMake(tablee: any){
    tablee.isEditingMake = true;
    this.formattedDate = this.formDateVisualization(tablee.make_date);
    console.log('Fecha formateada:', this.formattedDate);
  }

  hiddeFormatMake(tablee: any){
    tablee.isEditingMake = false;
  }

  showFormatLimit(tablee: any){
    tablee.isEditingLimit = true;
    this.formattedDate = this.formDateVisualization(tablee.limit_date);
    console.log('Fecha formateada:', this.formattedDate);
  }

  hiddeFormatLimit(tablee: any){
    tablee.isEditingLimit = false;
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
}
