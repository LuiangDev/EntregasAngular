import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InscripcionService } from '../../services/inscripcion.service';

@Component({
  selector: 'app-lista-inscripciones',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.scss']
})
export class ListaInscripcionesComponent implements OnInit {
  inscripciones: any[] = [];
  displayedColumns: string[] = ['alumno', 'curso', 'fecha', 'acciones'];

  constructor(
    private readonly inscripcionService: InscripcionService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.cargarInscripciones();
  }

  cargarInscripciones(): void {
    this.inscripcionService.obtenerInscripciones().subscribe((data) => {
      this.inscripciones = data;
    });
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
          this.cargarInscripciones(); // Recargamos la lista
        });
      }
    });
  }
}
