import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../../../shared/models/usuario.model';

@Component({
  selector: 'app-abm-usuarios',
  templateUrl: './abm-usuarios.component.html',
  styleUrls: ['./abm-usuarios.component.scss']
})
export class AbmUsuariosComponent implements OnInit {
  usuarioForm!: FormGroup;
  modoEdicion = false;
  idUsuario!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      direccion: [''],
      telefono: [''],
      perfil: ['usuario', Validators.required]
    });

    this.idUsuario = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idUsuario) {
      this.modoEdicion = true;
      this.usuariosService.getUsuario(this.idUsuario).subscribe((usuario) => {
        this.usuarioForm.patchValue(usuario);
      });
    }
  }

  guardar(): void {
    const usuario = this.usuarioForm.value as Usuario;

    if (this.modoEdicion) {
      usuario.id = this.idUsuario;
      this.usuariosService.updateUsuario(usuario).subscribe(() => {
        this.router.navigate(['/usuarios']);
      });
    } else {
      this.usuariosService.createUsuario(usuario).subscribe(() => {
        this.router.navigate(['/usuarios']);
      });
    }
  }
}
