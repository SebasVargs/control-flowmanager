import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatCurrencyService {

  constructor() { }

  formatTotal(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!d))/g, ".")
  }
}
