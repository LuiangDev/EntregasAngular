import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CursoService } from '../../services/curso.service';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-lista-cursos',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.scss']
})
export class ListaCursosComponent implements OnInit {
  cursos: any[] = [];
  displayedColumns: string[] = ['nombre', 'profesor', 'cupos', 'acciones'];

  constructor(
    private readonly cursoService: CursoService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  esAdmin(): boolean {
  return this.authService.getUserRole() === 'admin';
}

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.cursoService.obtenerCursos().subscribe((data) => {
      this.cursos = data;
    });
  }

  agregarCurso(): void {
    this.cursoService.limpiarCursoSeleccionado();
    this.router.navigate(['/cursos/abm']);
  }

  editarCurso(curso: any): void {
    this.cursoService.seleccionarCurso(curso, curso.id);
    this.router.navigate(['/cursos/abm']);
  }

  eliminarCurso(curso: any): void {
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
        this.cursoService.eliminarCurso(curso.id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Curso eliminado',
            text: 'El curso fue eliminado correctamente.',
            timer: 1500,
            showConfirmButton: false
          });
          this.cargarCursos(); // Recargamos la lista
        });
      }
    });
  }
}
