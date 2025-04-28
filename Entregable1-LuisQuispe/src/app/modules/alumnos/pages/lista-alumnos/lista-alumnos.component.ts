import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { NombreCompletoPipe } from '../../../../shared/pipes/nombre-completo.pipe';

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [CommonModule, MatTableModule, NombreCompletoPipe],
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss'],
})
export class ListaAlumnosComponent {
  displayedColumns: string[] = ['nombreCompleto', 'email'];
  dataSource = [
    { nombre: 'Luis', apellido: 'Ángel', email: 'luis.angel@email.com' },
    { nombre: 'María', apellido: 'Pérez', email: 'maria.perez@email.com' },
    { nombre: 'Juan', apellido: 'Ramírez', email: 'juan.ramirez@email.com' },
  ];
}
