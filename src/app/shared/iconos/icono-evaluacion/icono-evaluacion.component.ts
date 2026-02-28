import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icono-evaluacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icono-evaluacion.component.html',
  styleUrls: ['./icono-evaluacion.component.css']
})
export class IconoEvaluacionComponent {
  @Input() ancho: number = 24;
  @Input() alto: number = 24;
  @Input() color: string = 'currentColor';
}
