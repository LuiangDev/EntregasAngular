import { Component } from '@angular/core';
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
export class AbmCursosComponent {
  cursoForm: FormGroup;
  cursoEditando: any = null;
  indiceEditando: number | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly cursoService: CursoService,
    private readonly router: Router
  ) {
    this.cursoForm = this.fb.group({
      nombre: ['', Validators.required],
      profesor: ['', Validators.required],
      cupos: ['', [Validators.required, Validators.min(1)]],
    });

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
        this.cursoService.actualizarCurso(this.indiceEditando, curso);
        Swal.fire(
          'Actualizado',
          'El curso fue modificado correctamente.',
          'success'
        );
      } else {
        this.cursoService.agregarCurso(curso);
        Swal.fire(
          'Agregado',
          'El curso fue registrado correctamente.',
          'success'
        );
      }

      this.cursoForm.reset();
      this.cursoService.limpiarCursoSeleccionado();
      this.router.navigate(['/cursos']);
    } else {
      this.cursoForm.markAllAsTouched();
    }
  }

  cancelar() {
    this.router.navigate(['/cursos']);
  }
}
