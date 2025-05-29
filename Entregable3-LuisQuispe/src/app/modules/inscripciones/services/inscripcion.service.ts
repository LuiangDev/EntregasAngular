import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private readonly apiUrl = 'http://localhost:3000/inscripciones';

  private readonly inscripcionSeleccionadaSource = new BehaviorSubject<{ inscripcion: any, id: number } | null>(null);
  inscripcionSeleccionada$ = this.inscripcionSeleccionadaSource.asObservable();

  constructor(private readonly http: HttpClient) {}

  obtenerInscripciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  agregarInscripcion(inscripcion: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, inscripcion);
  }

  actualizarInscripcion(id: number, inscripcionActualizada: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, inscripcionActualizada);
  }

  eliminarInscripcion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  seleccionarInscripcion(inscripcion: any, id: number) {
    this.inscripcionSeleccionadaSource.next({ inscripcion, id });
  }

  limpiarInscripcionSeleccionada() {
    this.inscripcionSeleccionadaSource.next(null);
  }
}
