import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Months } from '../models/Months';

@Injectable({
  providedIn: 'root'
})
export class DateTimeTaskService {

  private apiUrlDateTimeTask: string = "http://localhost:8080/todo/date_time_task"

  constructor(private httpClient: HttpClient) { }

  getMonths(): Observable<Months[]>{
    return this.httpClient.get<Months[]>(`${this.apiUrlDateTimeTask}`)
  }
}
