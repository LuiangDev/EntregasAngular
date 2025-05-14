import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private cursosSource = new BehaviorSubject<any[]>([
    { nombre: 'Angular Básico', profesor: 'Juan Pérez', cupos: 20 },
    { nombre: 'TypeScript Avanzado', profesor: 'María Gómez', cupos: 15 }
  ]);

  cursos$ = this.cursosSource.asObservable();

  agregarCurso(curso: any) {
    const actual = this.cursosSource.value;
    this.cursosSource.next([...actual, curso]);
  }

  actualizarCurso(index: number, cursoActualizado: any) {
    const actual = [...this.cursosSource.value];
    actual[index] = cursoActualizado;
    this.cursosSource.next(actual);
  }

  eliminarCurso(index: number) {
    const actual = this.cursosSource.value.filter((_, i) => i !== index);
    this.cursosSource.next(actual);
  }

  private cursoSeleccionadoSource = new BehaviorSubject<{ curso: any, index: number } | null>(null);
  cursoSeleccionado$ = this.cursoSeleccionadoSource.asObservable();

  seleccionarCurso(curso: any, index: number) {
    this.cursoSeleccionadoSource.next({ curso, index });
  }

  limpiarCursoSeleccionado() {
    this.cursoSeleccionadoSource.next(null);
  }
}
