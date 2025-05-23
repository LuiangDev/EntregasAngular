import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-lista-cursos',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.scss']
})
export class ListaCursosComponent {
  displayedColumns: string[] = ['nombre', 'profesor', 'cupos', 'acciones'];

  constructor(
    public cursoService: CursoService,
    private router: Router
  ) {}

  agregarCurso() {
    this.cursoService.limpiarCursoSeleccionado();
    this.router.navigate(['/cursos/abm']);
  }

  editarCurso(index: number) {
    this.cursoService.cursos$
      .subscribe((cursos) => {
        const curso = cursos[index];
        this.cursoService.seleccionarCurso(curso, index);
        this.router.navigate(['/cursos/abm']);
      })
      .unsubscribe();
  }

  eliminarCurso(index: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el curso permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursoService.eliminarCurso(index);
        Swal.fire({
          icon: 'success',
          title: 'Curso eliminado',
          text: 'El curso fue eliminado correctamente.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }
}
