import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CursoService } from '../../services/curso.service';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-abm-cursos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './abm-cursos.component.html',
  styleUrls: ['./abm-cursos.component.scss'],
})
export class AbmCursosComponent implements OnInit {
  cursoForm: FormGroup;
  cursoEditando: any = null;
  indiceEditando: number | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly cursoService: CursoService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.cursoForm = this.fb.group({
      nombre: ['', Validators.required],
      profesor: ['', Validators.required],
      horas: [1, [Validators.required, Validators.min(1)]],
      clases: [1, [Validators.required, Validators.min(1)]],
      cupos: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    if (this.authService.getUserRole() !== 'admin') {
      this.router.navigate(['/cursos']);
      return;
    }

    this.cursoService.cursoSeleccionado$.subscribe((data) => {
      if (data) {
        this.cursoEditando = data.curso;
        this.indiceEditando = data.id;
        this.cursoForm.patchValue(data.curso);
      }
    });
  }

  onSubmit() {
    if (this.cursoForm.valid) {
      const curso = this.cursoForm.value;

      if (this.indiceEditando !== null) {
        this.cursoService.actualizarCurso(this.indiceEditando, curso).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Actualizado',
            text: 'El curso fue modificado correctamente.'
          }).then(() => {
            this.finalizarFormulario();
          });
        });
      } else {
        this.cursoService.agregarCurso(curso).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Agregado',
            text: 'El curso fue registrado correctamente.'
          }).then(() => {
            this.finalizarFormulario();
          });
        });
      }
    } else {
      this.cursoForm.markAllAsTouched();
    }
  }

  finalizarFormulario(): void {
    this.cursoForm.reset();
    this.cursoService.limpiarCursoSeleccionado();
    this.indiceEditando = null;
    this.router.navigate(['/cursos']);
  }

  cancelar(): void {
    this.router.navigate(['/cursos']);
  }
}
