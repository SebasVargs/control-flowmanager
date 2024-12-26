import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { menuItems } from './shared/data/menu-items';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  isSidebarOpen = false;
  isOpenLogoutModal = false;
  menuItems = menuItems;

  constructor(){
    this.menuItems.find(item => item.label === 'Logout')!.onClick = this.openLogoutModal.bind(this)
  }

  toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }

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

}
