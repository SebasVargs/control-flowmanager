import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Months } from '../models/Months';
import { DateTimeTaskService } from '../services/date-time-task.service';

@Injectable({
  providedIn: 'root'
})
export class DateUtilsService implements OnInit{

  originalDate: string = '2024-02-01'
  formattedDate: string = this.originalDate;
  months: Months[] = []

  constructor(
    private monthTaskService: DateTimeTaskService
  ) { }

  ngOnInit(): void {
    this.monthTaskService.getMonths().subscribe((data) => {
      console.log("Meses recibidos:", data);  // Verifica los datos de meses recibidos
      this.months = data;
    })
  }

  getCurrentDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);  // Asegurarse de que tenga dos dígitos
    const day = ('0' + now.getDate()).slice(-2);

    // Formato final: YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }

  // Método para obtener la hora actual en formato 'HH:mm:ss'
  getCurrentTime(): string {
    const now = new Date();
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);

    // Formato final: HH:mm:ss
    return `${hours}:${minutes}:${seconds}`;
  }

  getCurrentDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  //Visualization Date

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
