import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CategoryTask } from '../../models/CategoryTask';

@Injectable({
  providedIn: 'root'
})
export class CrudCategoriesService {

  private apiUrl: string = `${environment.apiUrl}/${environment.apiRoutes.tasks.base}`
  private http = inject(HttpClient)

  getApiUrl(): string{
    return `${this.apiUrl}/${environment.apiRoutes.tasks.others[2].base}`;
  }

  getCategories(): Observable<CategoryTask[]>{
    return this.http.get<CategoryTask[]>(`${this.apiUrl}/${environment.apiRoutes.tasks.others[2].base}`).pipe(
      catchError(err => {
        console.error('Error fetching categories', err);
        return throwError(() => new Error('Error fetching categories'))
      })
    )
  }

  getCategoryById(id: number): Observable<CategoryTask>{
    return this.http.get<CategoryTask>(`${this.apiUrl}/${environment.apiRoutes.tasks.others[2].byId}`).pipe(
      catchError(err => {
        console.error(`Error fetching category with id ${id}`, err);
        return throwError(() => new Error('Error fetching category by id'));
      })
    )
  }
}
