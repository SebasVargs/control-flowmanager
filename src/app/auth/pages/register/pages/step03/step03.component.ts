import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-step03',
  imports: [RouterLink],
  templateUrl: './step03.component.html',
  styleUrl: './step03.component.css'
})
export class Step03Component implements OnInit {

  constructor(){

  }

  ngOnInit(): void {

  }

  activarModal(){
    console.log('Activado el modal')
  }
}
