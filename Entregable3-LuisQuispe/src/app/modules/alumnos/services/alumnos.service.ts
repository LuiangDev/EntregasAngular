import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private alumnosSource = new BehaviorSubject<any[]>([
    { nombre: 'Luis', apellido: 'Quispe', email: 'luis.quispe@email.com' },
    { nombre: 'Cinthia', apellido: 'García', email: 'cinthia.garcia@email.com' },
    { nombre: 'Liliana', apellido: 'Valqui', email: 'liliana.valqui@email.com' },
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
