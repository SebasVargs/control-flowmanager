import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../../models/Task';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudTasksService {

  private apiUrl: string = `${environment.apiUrl}/${environment.apiRoutes.tasks.base}`
  private http = inject(HttpClient);

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.apiUrl}/${environment.apiRoutes.tasks.others[0].base}`).pipe(
      catchError(err => {
        console.error('Error fetching task', err);
        return throwError(() => new Error('Error fetching tasks'))
      })
    )
  }

  getTaskById(id: number): Observable<Task>{
    return this.http.get<Task>(`${this.apiUrl}/${environment.apiRoutes.tasks.others[0].byId}`).pipe(
      catchError((err) => {
        console.error(`Error fetching task with id ${id}`, err);
        return throwError(() => new Error('Error fetching task by id'));
      })
    );
  }

  deleteTaskById(id: number):Observable<Task>{
    return this.http.delete<Task>(`${this.apiUrl}/${environment.apiRoutes.tasks.others[0]}/${id}`).pipe(
      catchError((err) => {
        console.error(`Error delete task with id ${id}`, err);
        return throwError(() => new Error('Error delete task by id'))
      })
    )
  }

}
