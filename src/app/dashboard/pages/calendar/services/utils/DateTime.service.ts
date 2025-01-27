import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  formatHour(dateHour: Date): string {
    const date = new Date(dateHour);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const formattedHour = `${hours > 12 ? hours - 12 : hours}:${minutes === 0 ? '00' : minutes} ${suffix}`;
    return formattedHour;
  }

  convertMinutesToHours(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if(remainingMinutes == 0){
      return `${hours} horas`
    } else {
      return `${hours} horas y ${remainingMinutes} minutos`;
    }
  }

}
