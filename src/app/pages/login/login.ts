import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email: string = '';
  password: string = '';
  mantenerSesion: boolean = false;
  mostrarPassword: boolean = false;
  cargando: boolean = false;

  alertaVisible: boolean = false;
  alertaTipo: 'exito' | 'error' = 'exito';
  alertaMensaje: string = '';

  constructor(private router: Router) {}

  togglePassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  ingresar(): void {
    if (!this.email || !this.password) {
      this.mostrarAlerta('error', 'Por favor complete todos los campos.');
      return;
    }

    this.cargando = true;
    this.alertaVisible = false;


    setTimeout(() => {
      this.cargando = false;

      if (this.email === 'admin@assac.cl' && this.password === '123456') {
        this.mostrarAlerta('exito', 'Acceso concedido.');
        setTimeout(() => this.router.navigate(['/dashboard']), 1000);
      } else {
        this.mostrarAlerta('error', 'Correo o contraseña incorrectos.');
      }
    }, 1500);
  }

  private mostrarAlerta(tipo: 'exito' | 'error', mensaje: string): void {
    this.alertaTipo = tipo;
    this.alertaMensaje = mensaje;
    this.alertaVisible = true;

    if (tipo === 'exito') return;

    setTimeout(() => {
      this.alertaVisible = false;
    }, 4000);
  }
}
