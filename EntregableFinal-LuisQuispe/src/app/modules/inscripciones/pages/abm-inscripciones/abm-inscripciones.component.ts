import { Component, OnInit } from '@angular/core';
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
import { AuthService } from '../../../../auth/auth.service';

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
export class AbmInscripcionesComponent implements OnInit {
  inscripcionForm: FormGroup;
  inscripcionEditando: any = null;

  alumnos: any[] = [];
  cursos: any[] = [];
  inscripciones: any[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly inscripcionService: InscripcionService,
    private readonly cursoService: CursoService,
    private readonly alumnosService: AlumnosService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.inscripcionForm = this.fb.group({
      alumno: ['', Validators.required],
      curso: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarDatos();

    this.inscripcionService.inscripcionSeleccionada$.subscribe((data) => {
      if (data) {
        this.inscripcionEditando = data.inscripcion;
        this.inscripcionForm.patchValue(data.inscripcion);
      }
    });
  }

  cargarDatos(): void {
    this.cargarAlumnos();
    this.cargarInscripcionesYFiltrarCursos();
  }

  private cargarAlumnos(): void {
    this.alumnosService.obtenerAlumnos().subscribe((data) => {
      this.alumnos = data;
    });
  }

  private cargarInscripcionesYFiltrarCursos(): void {
    this.inscripcionService.obtenerInscripciones().subscribe((data) => {
      this.inscripciones = data;
      this.cargarCursosConCupos();
    });
  }

  private cargarCursosConCupos(): void {
    this.cursoService.obtenerCursos().subscribe((cursosDisponibles) => {
      this.cursos = cursosDisponibles.filter((curso) =>
        this.tieneCuposDisponibles(curso)
      );
    });
  }

  private tieneCuposDisponibles(curso: any): boolean {
    const inscripcionesCurso = this.inscripciones.filter(
      (ins) => ins.curso === curso.nombre
    );
    return inscripcionesCurso.length < curso.cupos;
  }

  onSubmit(): void {
    if (this.inscripcionForm.valid) {
      const inscripcion = this.inscripcionForm.value;

      const usuarioActual = this.authService.getUsuario();
      inscripcion.idUsuario = usuarioActual?.id ?? 0;

      if (this.inscripcionEditando) {
        this.inscripcionService
          .actualizarInscripcion(this.inscripcionEditando.id, inscripcion)
          .subscribe(() => {
            Swal.fire('Actualizado', 'La inscripción fue modificada correctamente.', 'success');
            this.router.navigate(['/inscripciones']);
          });
      } else {
        this.inscripcionService
          .agregarInscripcion(inscripcion)
          .subscribe(() => {
            Swal.fire('Agregado', 'La inscripción fue registrada correctamente.', 'success');
            this.router.navigate(['/inscripciones']);
          });
      }
    } else {
      this.inscripcionForm.markAllAsTouched();
    }
  }

  cancelar(): void {
    this.router.navigate(['/inscripciones']);
  }
}
