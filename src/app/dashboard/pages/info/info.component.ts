import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, RouterLink } from '@angular/router';
import { InfoCardComponent } from "./pages/info-card/info-card.component";

@Component({
  selector: 'app-info',
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, FormsModule, InfoCardComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {

}
