import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InscripcionService } from '../../services/inscripcion.service';

@Component({
  selector: 'app-abm-inscripciones',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './abm-inscripciones.component.html',
  styleUrls: ['./abm-inscripciones.component.scss']
})
export class AbmInscripcionesComponent {
  inscripcionForm: FormGroup;
  inscripcionEditando: any = null;
  indiceEditando: number | null = null;

  // Mock de alumnos y cursos
  alumnos = ['Luis Quispe', 'Cinthia Garcia', 'Juan Ramírez'];
  cursos = ['Angular Básico', 'TypeScript Avanzado', 'NestJS Pro'];

  constructor(
    private fb: FormBuilder,
    private inscripcionService: InscripcionService,
    private router: Router
  ) {
    this.inscripcionForm = this.fb.group({
      alumno: ['', Validators.required],
      curso: ['', Validators.required],
      fecha: ['', Validators.required]
    });

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
        this.inscripcionService.actualizarInscripcion(this.indiceEditando, inscripcion);
        Swal.fire('Actualizado', 'La inscripción fue modificada correctamente.', 'success');
      } else {
        this.inscripcionService.agregarInscripcion(inscripcion);
        Swal.fire('Agregado', 'La inscripción fue registrada correctamente.', 'success');
      }

      this.inscripcionForm.reset();
      this.inscripcionService.limpiarInscripcionSeleccionada();
      this.router.navigate(['/inscripciones']);
    } else {
      this.inscripcionForm.markAllAsTouched();
    }
  }
}
