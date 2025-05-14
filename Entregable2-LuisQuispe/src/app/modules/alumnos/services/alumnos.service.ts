import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private alumnosSource = new BehaviorSubject<any[]>([
    { nombre: 'Luis', apellido: 'Ángel', email: 'luis.angel@email.com' },
    { nombre: 'María', apellido: 'Pérez', email: 'maria.perez@email.com' },
    { nombre: 'Juan', apellido: 'Ramírez', email: 'juan.ramirez@email.com' },
  ]);

  alumnos$ = this.alumnosSource.asObservable();

  agregarAlumno(alumno: any) {
    const actual = this.alumnosSource.value;
    this.alumnosSource.next([...actual, alumno]);
  }

  actualizarAlumno(index: number, alumnoActualizado: any) {
    const actual = [...this.alumnosSource.value];
    actual[index] = alumnoActualizado;
    this.alumnosSource.next(actual);
  }


  eliminarAlumno(index: number) {
    const actual = this.alumnosSource.value.filter((_, i) => i !== index);
    this.alumnosSource.next(actual);
  }

  private alumnoSeleccionadoSource = new BehaviorSubject<{ alumno: any, index: number } | null>(null);
  alumnoSeleccionado$ = this.alumnoSeleccionadoSource.asObservable();

  seleccionarAlumno(alumno: any, index: number) {
    this.alumnoSeleccionadoSource.next({ alumno, index });
  }

  limpiarAlumnoSeleccionado() {
    this.alumnoSeleccionadoSource.next(null);
  }

}
