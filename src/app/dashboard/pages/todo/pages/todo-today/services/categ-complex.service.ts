import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategComplexService {

  private apiUrlCategories: String = "http://localhost:8080/todo/category_task"
  private apiUrlComplexities: String = "http://localhost:8080/todo/complexities"
  private apiUrlPriorities: String = "http://localhost:8080/todo/priorities"

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any>{
    return this.http.get<any>(`${this.apiUrlCategories}`)
  }

  getComplexities(): Observable<any>{
    return this.http.get<any>(`${this.apiUrlComplexities}`)
  }

  getPriorities(): Observable<any>{
    return this.http.get<any>(`${this.apiUrlPriorities}`)
  }
}
