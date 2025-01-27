import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Schedule } from '../../models/Schedule';

@Injectable({
  providedIn: 'root'
})
export class CrudScheduleService {

  private apiUrl: string = `${environment.apiUrl}/${environment.apiRoutes.schedule.base}`
  private http = inject(HttpClient)

  getApiUrl(): string{
    return `${this.apiUrl}/${environment.apiRoutes.schedule.others[1].base}`
  }

  getSchedule(): Observable<Schedule[]>{
    return this.http.get<Schedule[]>(`${this.apiUrl}/${environment.apiRoutes.schedule.others[1].base}`).pipe(
      catchError(err => {
        console.error('Error fetching schedule');
        return throwError(() => new Error('Error fetching schedule'))
      })
    )
  }

}
