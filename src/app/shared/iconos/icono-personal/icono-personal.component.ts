import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icono-personal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icono-personal.component.html',
  styleUrls: ['./icono-personal.component.css']
})
export class IconoPersonalComponent {
  @Input() ancho: number = 24;
  @Input() alto: number = 24;
  @Input() color: string = 'currentColor';
}
