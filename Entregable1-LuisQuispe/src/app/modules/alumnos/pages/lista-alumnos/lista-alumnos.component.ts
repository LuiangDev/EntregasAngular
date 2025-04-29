import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { NombreCompletoPipe } from '../../../../shared/pipes/nombre-completo.pipe';
import { AlumnosService } from '../../services/alumnos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [CommonModule, MatTableModule, NombreCompletoPipe],
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss'],
})
export class ListaAlumnosComponent {
  displayedColumns: string[] = ['nombreCompleto', 'email', 'acciones'];


  agregarAlumno() {
    this.alumnosService.limpiarAlumnoSeleccionado(); // Limpia selección previa
    this.router.navigate(['/alumnos/abm']); // 🚀 Redirige al ABM para agregar
  }


  editarAlumno(index: number) {
    this.alumnosService.alumnos$
      .subscribe((alumnos) => {
        const alumno = alumnos[index];
        this.alumnosService.seleccionarAlumno(alumno, index);
        this.router.navigate(['/alumnos/abm']); // 🚀 Redirige después de seleccionar
      })
      .unsubscribe();
  }


  eliminarAlumno(index: number) {
    if (confirm('¿Seguro que quieres eliminar este alumno?')) {
      this.alumnosService.eliminarAlumno(index);
    }
  }

  constructor(
    public alumnosService: AlumnosService,
    private router: Router
  ) {}

}
