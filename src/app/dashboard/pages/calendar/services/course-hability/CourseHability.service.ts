import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseHabilityService {

  private http = inject(HttpClient)
  private apiUrl: string = `${environment.apiUrl}/${environment.apiRoutes.schedule.base}`

  getApiUrl(): string {
    return `${this.apiUrl}/${environment.apiRoutes.schedule.others[2].base}`
  }

}
