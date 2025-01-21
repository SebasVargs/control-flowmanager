import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { settingsItems } from '../todo/shared/data/settings-items';
import { monthItems } from '../../shared/data/months';
import { menuItems } from '../../shared/data/menu-items';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  imports: [RouterOutlet, RouterLink, CommonModule, ReactiveFormsModule, FormsModule, ClickOutsideDirective],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {

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
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
    this.configItems.find(config => config.label === 'Logout')!.onClick = this.openLogoutModal.bind(this)
    this.generateHours(7, 20)
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

  // Lista de días de la semana
  days: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  // Horas desde las 7:00 AM hasta las 8:00 PM
  hours: string[] = [];

  // Generar lista de horas
  private generateHours(startHour: number, endHour: number): void {
    for (let hour = startHour; hour <= endHour; hour++) {
      const time = hour <= 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`;
      this.hours.push(time);
    }
  }
}
