import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icono-pdf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icono-pdf.component.html',
  styleUrls: ['./icono-pdf.component.css']
})
export class IconoPdfComponent {
  @Input() ancho: number = 24;
  @Input() alto: number = 24;
  @Input() color: string = 'currentColor';
}
