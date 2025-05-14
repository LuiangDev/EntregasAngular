import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { NombreCompletoPipe } from '../../../../shared/pipes/nombre-completo.pipe';
import { AlumnosService } from '../../services/alumnos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Titulo20Directive } from '../../../../shared/directives/titulo20.directive';


@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [CommonModule, MatTableModule, NombreCompletoPipe,Titulo20Directive],
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss'],
})
export class ListaAlumnosComponent {
  displayedColumns: string[] = ['nombreCompleto', 'email', 'acciones'];


  agregarAlumno() {
    this.alumnosService.limpiarAlumnoSeleccionado(); // Limpia selección previa
    this.router.navigate(['/alumnos/abm']); //Redirige al ABM para agregar
  }


  editarAlumno(index: number) {
    this.alumnosService.alumnos$
      .subscribe((alumnos) => {
        const alumno = alumnos[index];
        this.alumnosService.seleccionarAlumno(alumno, index);
        this.router.navigate(['/alumnos/abm']); //Redirige después de seleccionar
      })
      .unsubscribe();
  }


  eliminarAlumno(index: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el alumno de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnosService.eliminarAlumno(index);

        Swal.fire({
          icon: 'success',
          title: 'Alumno eliminado',
          text: 'El alumno fue eliminado correctamente.',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }


  constructor(
    public alumnosService: AlumnosService,
    private router: Router
  ) {}

}
