import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { InscripcionService } from '../../services/inscripcion.service';
import { AuthService } from '../../../../auth/auth.service';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { CursoService } from '../../../cursos/services/curso.service';

@Component({
  selector: 'app-lista-inscripciones',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.scss']
})
export class ListaInscripcionesComponent implements OnInit {
  inscripciones: any[] = [];
  alumnos: any[] = [];
  cursos: any[] = [];

  displayedColumns: string[] = ['alumno', 'curso', 'fecha', 'acciones'];

  constructor(
    private readonly inscripcionService: InscripcionService,
    private readonly alumnosService: AlumnosService,
    private readonly cursoService: CursoService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    this.alumnosService.obtenerAlumnos().subscribe((alumnos) => {
      this.alumnos = alumnos;

      this.cursoService.obtenerCursos().subscribe((cursos) => {
        this.cursos = cursos;

        this.inscripcionService.obtenerInscripciones().subscribe((data) => {
          this.inscripciones = data;
        });
      });
    });
  }

  esAdmin(): boolean {
    return this.authService.getUserRole() === 'admin';
  }

  agregarInscripcion(): void {
    this.inscripcionService.limpiarInscripcionSeleccionada();
    this.router.navigate(['/inscripciones/abm']);
  }

  editarInscripcion(inscripcion: any): void {
    this.inscripcionService.seleccionarInscripcion(inscripcion, inscripcion.id);
    this.router.navigate(['/inscripciones/abm']);
  }

  eliminarInscripcion(inscripcion: any): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la inscripción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.inscripcionService.eliminarInscripcion(inscripcion.id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Inscripción eliminada',
            text: 'La inscripción fue eliminada correctamente.',
            timer: 1500,
            showConfirmButton: false
          });
          this.cargarInscripciones();
        });
      }
    });
  }

  private cargarInscripciones(): void {
    this.inscripcionService.obtenerInscripciones().subscribe((data) => {
      this.inscripciones = data;
    });
  }

  getNombreAlumno(id: number | string): string {
    return this.alumnos.find(al => al.id === id || al.nombre === id)?.nombre ?? 'Desconocido';
  }

  getNombreCurso(id: number | string): string {
    return this.cursos.find(c => c.id === id || c.nombre === id)?.nombre ?? 'Desconocido';
  }
}
