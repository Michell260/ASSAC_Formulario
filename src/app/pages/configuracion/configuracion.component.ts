import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {
  mostrarContrasenaActual = false;
  mostrarNuevaContrasena = false;
  mostrarConfirmarContrasena = false;

  contrasenaActual = 'Contraseña actual';
  nuevaContrasena = 'Contraseña nueva';
  confirmarContrasena = 'Contraseña nueva';

  activar2FA = false;
  notifCorreo = true;
  notifSistema = true;
  notifPush = false;

  vistaMovil: 'principal' | 'contrasena' = 'principal';

  mostrarCambioContrasena() {
    this.vistaMovil = 'contrasena';
  }

  volverPrincipal() {
    this.vistaMovil = 'principal';
  }
}
