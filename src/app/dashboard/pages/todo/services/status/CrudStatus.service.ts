import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { StatusTask } from '../../models/StatusTask';

@Injectable({
  providedIn: 'root'
})
export class CrudStatusService {

  private apiUrl: string = `${environment.apiUrl}/${environment.apiRoutes.tasks.base}`
  private http = inject(HttpClient)

  getApiUrl(): string {
    return `${this.apiUrl}/${environment.apiRoutes.tasks.others[4].base}`
  }

  getStatus(): Observable<StatusTask[]>{
    return this.http.get<StatusTask[]>(`${this.apiUrl}/${environment.apiRoutes.tasks.others[4].base}`).pipe(
      catchError(err => {
        console.error('Error fetching status');
        return throwError(() => new Error('Error fetching status'))
      })
    )
  }

}
