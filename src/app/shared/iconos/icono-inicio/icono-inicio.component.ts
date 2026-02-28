import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icono-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icono-inicio.component.html',
  styleUrls: ['./icono-inicio.component.css']
})
export class IconoInicioComponent {
  @Input() ancho: number = 24;
  @Input() alto: number = 24;
  @Input() color: string = 'currentColor';
}
