import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { menuItems } from './shared/data/menu-items';
import { settingsItems } from './shared/data/settings-items';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { DateTimeTaskService } from '../../services/date-time-task.service';
import { Months } from '../../models/Months';

@Component({
  selector: 'app-todo',
  imports: [RouterLink, CommonModule, ReactiveFormsModule, RouterOutlet, ClickOutsideDirective],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {

  months: Months[] = []
  isOpenLogoutModal = false;
  height: String = '100vh';
  itemsDrop = menuItems;
  configItems = settingsItems;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.height = `${window.innerHeight}px`; // Altura dinámica basada en la ventana del navegador
    }
  }

  constructor(
  ){
    this.configItems.find(config => config.label === 'Logout')!.onClick = this.openLogoutModal.bind(this)
  }

  /* VENTANAS Y/O MODALES */

  configOpen = false;
  categoriesOpen = false;
  dropdownOpen = false; // Controla si el dropdown está abierto o cerrado

  openLogoutModal(){
    this.isOpenLogoutModal = true
    document.body.style.overflow = 'hidden';
  }

  closeLogoutModal(){
    this.isOpenLogoutModal = false;
    document.body.style.overflow = '';
  }

  acceptLogoutModal(){

  }

  mainDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  categoriesDropdown(): void {
    this.categoriesOpen = !this.categoriesOpen;
  }

  configDropdown(): void {
    this.configOpen = !this.configOpen;
  }
}
