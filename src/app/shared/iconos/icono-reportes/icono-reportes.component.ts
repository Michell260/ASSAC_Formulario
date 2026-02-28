import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icono-reportes.component.html',
  styleUrls: ['./icono-reportes.component.css']
})
export class IconoReportesComponent {
  @Input() ancho: number = 24;
  @Input() alto: number = 24;
  @Input() color: string = 'currentColor';
}
