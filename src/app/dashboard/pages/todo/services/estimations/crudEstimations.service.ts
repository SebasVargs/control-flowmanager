import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { EstimationTask } from '../../models/EstimationTask';

@Injectable({
  providedIn: 'root'
})
export class CrudEstimationsService {

  private apiUrl: string = `${environment.apiUrl}/${environment.apiRoutes.tasks.base}`
  private http = inject(HttpClient)

  getEstimations(): Observable<EstimationTask[]>{
    return this.http.get<EstimationTask[]>(`${this.apiUrl}/${environment.apiRoutes.tasks.others[1].base}`).pipe(
      catchError(err => {
        console.error('Error fetching estimation');
        return throwError(() => new Error('Error fetching estimations'))
      })
    )
  }

  getEstimationsById(id: number): Observable<EstimationTask>{
    return this.http.get<EstimationTask>(`${this.apiUrl}/${environment.apiRoutes.tasks.others[1].byId}`).pipe(
      catchError(err => {
        console.error(`Error fetching task with id ${id}`, err);
        return throwError(() => new Error('Error fetching task by id'));
      })
    )
  }

}
