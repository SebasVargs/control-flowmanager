import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { error } from 'console';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralDataService {

  private http = inject(HttpClient)

  getDataWithIndex(url: string): Observable<any[]> {
    return this.http.get<any[]>(url).pipe(
      map((items) =>
        items.map((item: any, index: number) => ({
          ...item,
          index: index + 1
        }))
      ),
      catchError((err) => {
        console.error(`Error al obtener los datos: ${err.message}`);
        // Aquí puedes decidir si devolver un Observable vacío, un valor por defecto, o propagar el error
        return throwError(() => new Error('Error al obtener los datos del servidor'));
      })
    );
  }

  getDataWithId(url: string, id: number): Observable<any[]> {
    const endPoint: string = `${url}/${id}`
    return this.http.get<any[]>(endPoint).pipe(
      catchError((err) => {
        return throwError(() => new Error(`Error al obtener los datos con id: ${id}: ${err.message}`))
      })
    )
  }

  createData(url: string, data: any): Observable<any>{
    return this.http.post<any>(url, data).pipe(
      catchError((err) => {
        return throwError(() => new Error(`Error al crear los datos: ${err.message}`))
      })
    )
  }

}
