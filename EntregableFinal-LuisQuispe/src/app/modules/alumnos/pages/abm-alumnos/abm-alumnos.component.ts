import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlumnosService } from '../../services/alumnos.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-abm-alumnos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.scss'],
})
export class AbmAlumnosComponent implements OnInit {
  alumnoForm: FormGroup;
  alumnoEditando: any = null;
  indiceEditando: number | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly alumnosService: AlumnosService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.alumnoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    if (this.authService.getUserRole() !== 'admin') {
      this.router.navigate(['/alumnos']);
      return;
    }

    this.alumnosService.alumnoSeleccionado$.subscribe((data) => {
      if (data) {
        this.alumnoEditando = data.alumno;
        this.indiceEditando = data.id;
        this.alumnoForm.patchValue(data.alumno);
      }
    });
  }

  onSubmit() {
    if (this.alumnoForm.valid) {
      if (this.indiceEditando !== null) {
        this.alumnosService
          .actualizarAlumno(this.indiceEditando, this.alumnoForm.value)
          .subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Alumno actualizado',
              text: 'Los datos del alumno fueron modificados correctamente.',
            }).then(() => {
              this.router.navigate(['/alumnos']);
            });
          });
      } else {
        this.alumnosService
          .agregarAlumno(this.alumnoForm.value)
          .subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Alumno agregado',
              text: 'El alumno fue registrado correctamente.',
            }).then(() => {
              this.router.navigate(['/alumnos']);
            });
          });
      }

      this.alumnoForm.reset();
      this.alumnosService.limpiarAlumnoSeleccionado();
      this.indiceEditando = null;
    } else {
      this.alumnoForm.markAllAsTouched();
    }
  }

  cancelar() {
    this.alumnoForm.reset();
    this.router.navigate(['/alumnos']);
  }
}
