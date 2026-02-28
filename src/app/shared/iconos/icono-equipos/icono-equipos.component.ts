import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icono-equipos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icono-equipos.component.html',
  styleUrls: ['./icono-equipos.component.css']
})
export class IconoEquiposComponent {
  @Input() ancho: number = 24;
  @Input() alto: number = 24;
  @Input() color: string = 'currentColor';
}
