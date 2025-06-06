import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

onSubmit(): void {
  const { username, password, role } = this.loginForm.value;

  // Validación
  const validCombination =
    (role === 'admin' && username === 'admin') ||
    (role === 'user' && username === 'user');

  if (!validCombination) {
    Swal.fire({
      icon: 'warning',
      title: 'Rol inválido',
      text: 'El usuario ingresado no corresponde al rol seleccionado.',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  // Validación
  const loginExitoso = this.authService.login(username, password, role);

  if (loginExitoso) {
    this.router.navigate([role === 'admin' ? '/alumnos' : '/inscripciones']);
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Usuario o contraseña incorrectos.',
      confirmButtonText: 'Aceptar'
    });
  }
}

}
