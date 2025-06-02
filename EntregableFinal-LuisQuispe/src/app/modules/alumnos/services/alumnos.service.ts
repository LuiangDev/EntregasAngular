import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private readonly apiUrl = 'http://localhost:3000/alumnos';

  //Alumno seleccionado para edición
  private readonly alumnoSeleccionadoSource = new BehaviorSubject<{
    alumno: any;
    id: number;
  } | null>(null);
  alumnoSeleccionado$ = this.alumnoSeleccionadoSource.asObservable();

  constructor(private readonly http: HttpClient) {}

  //Listado de alumnos
  obtenerAlumnos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  //Agregar un nuevo alumno
  agregarAlumno(alumno: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, alumno);
  }

  //Actualizar un alumno existente
  actualizarAlumno(id: number, alumnoActualizado: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, alumnoActualizado);
  }

  //Eliminar un alumno
  eliminarAlumno(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  //Seleccionar un alumno para edición
  seleccionarAlumno(alumno: any, id: number) {
    this.alumnoSeleccionadoSource.next({ alumno, id });
  }

  //Limpiar el alumno seleccionado
  limpiarAlumnoSeleccionado() {
    this.alumnoSeleccionadoSource.next(null);
  }
}
