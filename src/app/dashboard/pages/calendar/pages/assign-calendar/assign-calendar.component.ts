import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { menuItems } from '../../../../shared/data/menu-items';
import { monthItems } from '../../../../shared/data/month-items';
import { settingsItems } from '../../../todo/shared/data/settings-items';
import { CrudScheduleService } from '../../services/schedule/CrudSchedule.service';
import { Router } from '@angular/router';
import { dayWeek } from '../../shared/data/day-items';

@Component({
  selector: 'app-assign-calendar',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './assign-calendar.component.html',
  styleUrl: './assign-calendar.component.css'
})
export class AssignCalendarComponent {
  currentRoute: string = 'home'; // Ruta inicial

  isOpenCourses: boolean = false
  isOpenHabilities: boolean = false
  isMenuOpen: boolean = false;
  months = monthItems
  isOpenLogoutModal = false;
  height: String = '100vh';
  itemsDrop = menuItems;
  configItems = settingsItems

  configOpen = false;
  categoriesOpen = false;
  dropdownOpen = false; // Controla si el dropdown está abierto o cerrado

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.height = `${window.innerHeight}px`; // Altura dinámica basada en la ventana del navegador
    }
    // Escucha los cambios de ruta
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd)) // Filtra solo los eventos de finalización de navegación
      .subscribe(() => {
        // Actualiza la ruta actual
        const routePath = this.activatedRoute.snapshot.firstChild?.routeConfig?.path;
        this.currentRoute = routePath ? `home / ${routePath}` : 'home';
      });
    this.getSchedule();
  }

  private serviceSchedule = inject(CrudScheduleService)
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)

  constructor(
  ){
    this.configItems.find(config => config.label === 'Logout')!.onClick = this.openLogoutModal.bind(this)
    this.generateHours(7, 20)
  }

  // Lista de días de la semana
  days = dayWeek;
  calendar: { [day: string]: { [hour: string]: any[] } } = {};

  // Horas desde las 7:00 AM hasta las 8:00 PM
  hours: string[] = [];

  // Generar lista de horas
  private generateHours(startHour: number, endHour: number): void {
    for (let hour = startHour; hour <= endHour; hour++) {
      const time = hour <= 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`;
      this.hours.push(time);
    }
  }

  getSchedule(): void {
    this.calendar = {};
    this.serviceSchedule.getSchedule().subscribe({
      next: (data) => {
        // Inicializar el calendario
        this.days.forEach(day => {
          this.calendar[day.name] = {}; // Asume que `day.name` es el nombre del día
          this.hours.forEach(hour => {
            this.calendar[day.name][hour] = []; // Cada hora inicia como un array vacío
          });
        });

        // Mapear los datos al calendario
        data.forEach(schedule => {
          const dayName = this.days.find(day => day.id === schedule.day_week)?.name;
          const hour = this.formatHour(schedule.date_hour); // Formatear la hora desde `date_hour`
          if (dayName && hour && this.calendar[dayName]?.[hour]) {
            this.calendar[dayName][hour].push({
              course: schedule.course.name,
              duration: schedule.duration,
              recurrent: schedule.recurrent,
              info: schedule.course.info,
            });
          }
        });
      },
      error: (err) => console.error('Error fetching schedule:', err),
    });
  }


  private formatHour(dateHour: Date): string {
    const date = new Date(dateHour);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = `${hours > 12 ? hours - 12 : hours}:${minutes === 0 ? '00' : minutes} ${suffix}`;
    return formattedHour;
  }

  openLogoutModal(){
    this.isOpenLogoutModal = true
    document.body.style.overflow = 'hidden';
  }

  closeLogoutModal(){
    this.isOpenLogoutModal = false;
    document.body.style.overflow = '';
  }

  OpenCoursesModal(){
    this.isOpenCourses = true;
  }

  OpenHabilitiesModal(){
    this.isOpenHabilities = true;
  }

  configDropdown(): void {
    this.configOpen = !this.configOpen;
  }
}
