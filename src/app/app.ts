import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [RouterOutlet],
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ASSACFormulario');
}
