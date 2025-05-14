import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { InscripcionService } from '../../services/inscripcion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-inscripciones',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './lista-inscripciones.component.html',
  styleUrls: ['./lista-inscripciones.component.scss']
})
export class ListaInscripcionesComponent {
  displayedColumns: string[] = ['alumno', 'curso', 'fecha', 'acciones'];

  constructor(
    public inscripcionService: InscripcionService,
    private router: Router
  ) {}

  agregarInscripcion() {
    this.inscripcionService.limpiarInscripcionSeleccionada();
    this.router.navigate(['/inscripciones/abm']);
  }

  editarInscripcion(index: number) {
    this.inscripcionService.inscripciones$.subscribe(inscripciones => {
      const inscripcion = inscripciones[index];
      this.inscripcionService.seleccionarInscripcion(inscripcion, index);
      this.router.navigate(['/inscripciones/abm']);
    }).unsubscribe();
  }

  eliminarInscripcion(index: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la inscripción permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.inscripcionService.eliminarInscripcion(index);
        Swal.fire({
          icon: 'success',
          title: 'Inscripción eliminada',
          text: 'La inscripción fue eliminada correctamente.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }
}
