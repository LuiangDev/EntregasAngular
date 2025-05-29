import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private readonly apiUrl = 'http://localhost:3000/cursos';

  private readonly cursoSeleccionadoSource = new BehaviorSubject<{ curso: any, id: number } | null>(null);
  cursoSeleccionado$ = this.cursoSeleccionadoSource.asObservable();

  constructor(private readonly http: HttpClient) {}

  obtenerCursos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  agregarCurso(curso: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, curso);
  }

  actualizarCurso(id: number, cursoActualizado: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, cursoActualizado);
  }

  eliminarCurso(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  seleccionarCurso(curso: any, id: number) {
    this.cursoSeleccionadoSource.next({ curso, id });
  }

  limpiarCursoSeleccionado() {
    this.cursoSeleccionadoSource.next(null);
  }
}
