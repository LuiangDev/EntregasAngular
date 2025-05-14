import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InscripcionService } from '../../services/inscripcion.service';
import { CursoService } from '../../../cursos/services/curso.service';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';

@Component({
  selector: 'app-abm-inscripciones',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './abm-inscripciones.component.html',
  styleUrls: ['./abm-inscripciones.component.scss'],
})
export class AbmInscripcionesComponent {
  inscripcionForm: FormGroup;
  inscripcionEditando: any = null;
  indiceEditando: number | null = null;

  alumnos: any[] = [];
  cursos: any[] = [];
  inscripciones: any[] = [];

  constructor(
    private fb: FormBuilder,
    private inscripcionService: InscripcionService,
    private cursoService: CursoService,
    private alumnosService: AlumnosService,
    private router: Router
  ) {
    this.inscripcionForm = this.fb.group({
      alumno: ['', Validators.required],
      curso: ['', Validators.required],
      fecha: ['', Validators.required],
    });

    // Datos dinámicos desde los servicios
    this.alumnosService.alumnos$.subscribe((data) => {
      this.alumnos = data;
    });

    this.inscripcionService.inscripciones$.subscribe((data) => {
      this.inscripciones = data;
    });

        this.cursoService.cursos$.subscribe((cursosDisponibles) => {
      this.cursos = cursosDisponibles.filter((curso) => {
        const inscripcionesCurso = this.inscripciones.filter(
          (ins) => ins.curso === curso.nombre
        );
        return inscripcionesCurso.length < curso.cupos;
      });
    });

    // Carga si se está editando
    this.inscripcionService.inscripcionSeleccionada$.subscribe((data) => {
      if (data) {
        this.inscripcionEditando = data.inscripcion;
        this.indiceEditando = data.index;
        this.inscripcionForm.patchValue(data.inscripcion);
      }
    });
  }

  onSubmit() {
    if (this.inscripcionForm.valid) {
      const inscripcion = this.inscripcionForm.value;

      if (this.indiceEditando !== null) {
        this.inscripcionService.actualizarInscripcion(
          this.indiceEditando,
          inscripcion
        );
        Swal.fire(
          'Actualizado',
          'La inscripción fue modificada correctamente.',
          'success'
        );
      } else {
        this.inscripcionService.agregarInscripcion(inscripcion);
        Swal.fire(
          'Agregado',
          'La inscripción fue registrada correctamente.',
          'success'
        );
      }

      this.inscripcionForm.reset();
      this.inscripcionService.limpiarInscripcionSeleccionada();
      this.router.navigate(['/inscripciones']);
    } else {
      this.inscripcionForm.markAllAsTouched();
    }
  }

  cancelar() {
    this.router.navigate(['/inscripciones']);
  }
}
