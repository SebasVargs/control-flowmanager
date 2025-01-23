import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Course } from '../../../todo/models/Courses';

@Injectable({
  providedIn: 'root'
})
export class CrudCoursesService {

  private apiUrl: string = `${environment.apiUrl}/${environment.apiRoutes.schedule.base}`
  private http = inject(HttpClient)

  getApiUrl(): string {
    return `${this.apiUrl}/${environment.apiRoutes.schedule.others[0].base}`
  }

  getCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.apiUrl}/${environment.apiRoutes.schedule.others[0].base}`).pipe(
      catchError(err => {
        console.error('Error fetching courses');
        return throwError(() => new Error('Error fetching course'))
      })
    )
  }

}
