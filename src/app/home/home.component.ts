import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { features } from './shared/data/features';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  features = features;

  isVisible = {
    left: false,
    right: false
  }
  isMenuOpen = false;

  toggleMobileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.checkVisibility();
  }

  checkVisibility() {
    const leftMessage = document.querySelector('.left-message') as HTMLElement;
    const rightMessage = document.querySelector('.right-message') as HTMLElement;

    // Detecta si el mensaje izquierdo está dentro del viewport
    if (this.isInViewport(leftMessage)) {
      this.isVisible.left = true;
    } else {
      this.isVisible.left = false;
    }

    // Detecta si el mensaje derecho está dentro del viewport
    if (this.isInViewport(rightMessage)) {
      this.isVisible.right = true;
    } else {
      this.isVisible.right = false;
    }
  }

  // Función para verificar si un elemento está en el viewport
  isInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  }

}
