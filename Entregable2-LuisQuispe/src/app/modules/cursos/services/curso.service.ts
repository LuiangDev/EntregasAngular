import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private cursosSource = new BehaviorSubject<any[]>([
    { nombre: 'Angular Básico', profesor: 'Adolfo Correa', cupos: 20 },
    { nombre: 'TypeScript Avanzado', profesor: 'Alindor Ocas', cupos: 15 },
    { nombre: 'NestJS Pro', profesor: 'Nayeli Ramirez', cupos: 10 }

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
