import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icono-verificado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icono-verificado.component.html',
  styleUrls: ['./icono-verificado.component.css']
})
export class IconoVerificadoComponent {
  @Input() ancho: number = 24;
  @Input() alto: number = 24;
  @Input() color: string = 'currentColor';
}
