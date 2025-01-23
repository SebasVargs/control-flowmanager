import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { PriorityTasks } from '../../models/PriorityTask';

@Injectable({
  providedIn: 'root'
})
export class CrudPriorityService {

  private apiUrl: string = `${environment.apiUrl}/${environment.apiRoutes.tasks.base}`
  private http = inject(HttpClient)

  getApiUrl(): string{
    return `${this.apiUrl}/${environment.apiRoutes.tasks.others[3].base}`
  }

  getPriorities(): Observable<PriorityTasks[]>{
    return this.http.get<PriorityTasks[]>(`${this.apiUrl}/${environment.apiRoutes.tasks.others[3].base}`).pipe(
      catchError(err => {
        console.error('Error fetching priority', err)
        return throwError(() => new Error('Error fetching priorities'))
      })
    )
  }

  getPriorityById(id: number): Observable<PriorityTasks>{
    return this.http.get<PriorityTasks>(`${this.apiUrl}/${environment.apiRoutes.tasks.others[3].byId}`).pipe(
      catchError(err => {
        console.error(`Error fetching priority by id ${id}`, err);
        return throwError(() => new Error('Error fetching priority by id'))
      })
    )
  }

}
