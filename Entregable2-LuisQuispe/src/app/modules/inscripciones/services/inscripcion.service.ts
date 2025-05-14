import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {
  private inscripcionesSource = new BehaviorSubject<any[]>([
    {
      alumno: 'Luis Quispe',
      curso: 'Angular Básico',
      fecha: '2025-05-01'
    },
    {
      alumno: 'Cinthia García',
      curso: 'TypeScript Avanzado',
      fecha: '2025-05-10'
    }
  ]);

  inscripciones$ = this.inscripcionesSource.asObservable();

  agregarInscripcion(inscripcion: any) {
    const actual = this.inscripcionesSource.value;
    this.inscripcionesSource.next([...actual, inscripcion]);
  }

  actualizarInscripcion(index: number, inscripcionActualizada: any) {
    const actual = [...this.inscripcionesSource.value];
    actual[index] = inscripcionActualizada;
    this.inscripcionesSource.next(actual);
  }

  eliminarInscripcion(index: number) {
    const actual = this.inscripcionesSource.value.filter((_, i) => i !== index);
    this.inscripcionesSource.next(actual);
  }

  private inscripcionSeleccionadaSource = new BehaviorSubject<{ inscripcion: any, index: number } | null>(null);
  inscripcionSeleccionada$ = this.inscripcionSeleccionadaSource.asObservable();

  seleccionarInscripcion(inscripcion: any, index: number) {
    this.inscripcionSeleccionadaSource.next({ inscripcion, index });
  }

  limpiarInscripcionSeleccionada() {
    this.inscripcionSeleccionadaSource.next(null);
  }
}
