import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { settingsItems } from '../todo/shared/data/settings-items';
import { monthItems } from '../../shared/data/month-items';
import { menuItems } from '../../shared/data/menu-items';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { filter } from 'rxjs/operators';
import { CrudScheduleService } from './services/schedule/CrudSchedule.service';
import { dayWeek } from './shared/data/day-items';
import { GeneralDataService } from '../../../core/services/generalData.service';
import { Schedule } from './models/Schedule';

@Component({
  selector: 'app-calendar',
  imports: [RouterOutlet, RouterLink, CommonModule, ReactiveFormsModule, FormsModule, ClickOutsideDirective],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {

  constructor(
  ){
    this.configItems.find(config => config.label === 'Logout')!.onClick = this.openLogoutModal.bind(this)
    this.generateHours(7, 20)
  }

  days = dayWeek;
  calendar: { [day: string]: { [hour: string]: any[] } } = {};
  hours: string[] = [];

  currentRoute: string = 'home'; // Ruta inicial
  isOpenCourses: boolean = false
  isOpenHabilities: boolean = false
  isMenuOpen: boolean = false;
  months = monthItems
  isOpenLogoutModal = false;
  height: String = '100vh';
  itemsDrop = menuItems;
  configItems = settingsItems
  schedule: Schedule[] = []

  configOpen = false;
  categoriesOpen = false;
  dropdownOpen = false; // Controla si el dropdown está abierto o cerrado

  private serviceSchedule = inject(CrudScheduleService)
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  private generalData = inject(GeneralDataService)

  readonly urlSchedule: string = `${this.serviceSchedule.getApiUrl()}`


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
  }

  // Generar lista de horas
  private generateHours(startHour: number, endHour: number): void {
    for (let hour = startHour; hour <= endHour; hour++) {
      const time = hour <= 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`;
      this.hours.push(time);
    }
  }

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
