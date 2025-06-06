import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Inscripcion } from '../../../shared/models/inscripcion.model';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private readonly apiUrl = 'http://localhost:3000/inscripciones';

  private readonly inscripcionSeleccionadaSource = new BehaviorSubject<{ inscripcion: Inscripcion, id: number } | null>(null);
  readonly inscripcionSeleccionada$ = this.inscripcionSeleccionadaSource.asObservable();

  constructor(private readonly http: HttpClient) {}

  obtenerInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(this.apiUrl);
  }

  agregarInscripcion(inscripcion: Inscripcion): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(this.apiUrl, inscripcion);
  }

  actualizarInscripcion(id: number, inscripcionActualizada: Inscripcion): Observable<Inscripcion> {
    return this.http.put<Inscripcion>(`${this.apiUrl}/${id}`, inscripcionActualizada);
  }

  eliminarInscripcion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  seleccionarInscripcion(inscripcion: Inscripcion, id: number) {
    this.inscripcionSeleccionadaSource.next({ inscripcion, id });
  }

  limpiarInscripcionSeleccionada() {
    this.inscripcionSeleccionadaSource.next(null);
  }
}
