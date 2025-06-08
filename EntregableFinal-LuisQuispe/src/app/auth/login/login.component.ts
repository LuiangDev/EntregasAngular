import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const { email, password, role } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (usuario) => {

        if (usuario.perfil !== role) {
          Swal.fire({
            icon: 'warning',
            title: 'Rol incorrecto',
            text: `Este usuario no pertenece al rol seleccionado.`,
            confirmButtonText: 'Aceptar'
          });
          return;
        }

        this.router.navigate([role === 'admin' ? '/alumnos' : '/inscripciones']);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message ?? 'Error en la autenticación',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}
