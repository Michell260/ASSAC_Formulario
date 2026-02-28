import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icono-configuracion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icono-configuracion.component.html',
  styleUrls: ['./icono-configuracion.component.css']
})
export class IconoConfiguracionComponent {
  @Input() ancho: number = 24;
  @Input() alto: number = 24;
  @Input() color: string = 'currentColor';
}
