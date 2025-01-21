import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategComplexService {

  private apiUrlCategories: string = "http://localhost:8080/todo/category_task"
  private apiUrlEstimations: string = "http://localhost:8080/todo/estimations"
  private apiUrlPriorities: string = "http://localhost:8080/todo/priorities"
  private apiUrlStatusTask: string = "http://localhost:8080/todo/status_tasks"
  private apiUrlSchedule: string = 'http://localhost:8080/schedule/course'
  private apiUrlTasks: string = "http://localhost:8080/todo/tasks"

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any>{
    return this.http.get<any>(`${this.apiUrlCategories}`)
  }

  getComplexities(): Observable<any>{
    return this.http.get<any>(`${this.apiUrlEstimations}`)
  }

  getPriorities(): Observable<any>{
    return this.http.get<any>(`${this.apiUrlPriorities}`)
  }

  getTasks(): Observable<any>{
    return this.http.get<any>(`${this.apiUrlTasks}`)
  }

  getStatusTask(): Observable<any>{
    return this.http.get<any>(`${this.apiUrlStatusTask}`)
  }

  getSchedule(): Observable<any>{
    return this.http.get<any>(`${this.apiUrlSchedule}`)
  }

  createTask(task: any[]): Observable<any>{
    return this.http.post<any>(`${this,this.apiUrlTasks}`, task)
  }

  deleteTaskById(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrlTasks}/${id}`)
  }
}
