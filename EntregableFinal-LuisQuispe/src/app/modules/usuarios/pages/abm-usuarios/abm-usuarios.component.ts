import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../../../shared/models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-abm-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './abm-usuarios.component.html',
  styleUrls: ['./abm-usuarios.component.scss'],
})
export class AbmUsuariosComponent implements OnInit {
  usuarioForm!: FormGroup;
  modoEdicion = false;
  idUsuario!: string; 

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      direccion: [''],
      telefono: [''],
      perfil: ['usuario', Validators.required],
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.modoEdicion = true;
      this.idUsuario = idParam;

      this.usuariosService.getUsuario(this.idUsuario).subscribe((usuario) => {
        this.usuarioForm.patchValue(usuario);


        this.usuarioForm.get('password')?.clearValidators();
        this.usuarioForm.get('password')?.updateValueAndValidity();
      });
    }
  }

  guardar(): void {
    const usuario = this.usuarioForm.value as Usuario;

    if (this.modoEdicion) {
      usuario.id = this.idUsuario;
      this.usuariosService.updateUsuario(usuario).subscribe(() => {
        Swal.fire('Actualizado', 'El usuario fue actualizado correctamente.', 'success');
        this.router.navigate(['/usuarios']);
      });
    } else {
      this.usuariosService.createUsuario(usuario).subscribe(() => {
        Swal.fire('Guardado', 'El usuario fue creado exitosamente.', 'success');
        this.router.navigate(['/usuarios']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/usuarios']);
  }
}
