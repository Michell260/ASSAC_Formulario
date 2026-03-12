import { Component, NgZone, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-evaluacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EvaluacionComponent {

  modalAbierto = false;
  evaluacionSeleccionada: any = null;
  alertaVisible = false;
  alertaMensaje = '';
  alertaTipo: 'exito' | 'error' = 'exito';
  busqueda = '';
  private alertaTimer: any;

  evaluaciones = [
    {
      nombre: 'Juan Pérez', iniciales: 'JP', color: '#4c6983',
      cargo: 'Operaciones Mineras', correo: 'juan.perez@assac.com', empresa: 'ASSAC Chile',
      formulario: 'Seguridad en Alturas', fecha: '15/10/2023',
      puntuacion: '66/100', estado: 'Aprobado',
      preguntas: [
        { numero: 1, texto: '¿Cuál es la altura mínima para considerar un trabajo en altura?', correcta: true, respuestaEsperada: '1.80 metros', respuestaTrabajador: '1.80 metros' },
        { numero: 2, texto: '¿Qué EPP es fundamental para evitar caídas?', correcta: true, respuestaEsperada: 'Arnés de seguridad de cuerpo completo', respuestaTrabajador: 'Arnés de seguridad' },
        { numero: 3, texto: '¿Con qué frecuencia se deben inspeccionar los equipos?', correcta: false, respuestaEsperada: 'Antes de cada uso', respuestaTrabajador: 'Cada semana' }
      ]
    },
    {
      nombre: 'María García', iniciales: 'MG', color: '#cb9120',
      cargo: 'Seguridad Industrial', correo: 'maria.garcia@assac.com', empresa: 'ASSAC Chile',
      formulario: 'Protocolo COVID-19', fecha: '14/10/2023',
      puntuacion: '100/100', estado: 'Aprobado',
      preguntas: [
        { numero: 1, texto: '¿Cuál es la distancia mínima de seguridad?', correcta: true, respuestaEsperada: '1.5 metros', respuestaTrabajador: '1.5 metros' },
        { numero: 2, texto: '¿Con qué frecuencia debe lavarse las manos?', correcta: true, respuestaEsperada: 'Cada 30 minutos', respuestaTrabajador: 'Cada 30 minutos' }
      ]
    },
    {
      nombre: 'Carlos Ruiz', iniciales: 'CR', color: '#e05c5c',
      cargo: 'Logística', correo: 'carlos.ruiz@minera.com', empresa: 'Minera Norte',
      formulario: 'Manejo de Sustancias', fecha: '12/10/2023',
      puntuacion: '0/100', estado: 'Reprobado',
      preguntas: [
        { numero: 1, texto: '¿Qué significa la señal de peligro en un recipiente?', correcta: false, respuestaEsperada: 'Sustancia tóxica o peligrosa', respuestaTrabajador: 'Sustancia inflamable' },
        { numero: 2, texto: '¿Dónde se deben almacenar los químicos?', correcta: false, respuestaEsperada: 'Lugar ventilado y señalizado', respuestaTrabajador: 'En cualquier lugar seguro' }
      ]
    },
    {
      nombre: 'Ana Blanco', iniciales: 'AB', color: '#5c9e6e',
      cargo: 'Recursos Humanos', correo: 'ana.blanco@minera.com', empresa: 'Minera Norte',
      formulario: 'Uso de EPP', fecha: '10/10/2023',
      puntuacion: '100/100', estado: 'Aprobado',
      preguntas: [
        { numero: 1, texto: '¿Qué significa EPP?', correcta: true, respuestaEsperada: 'Equipo de Protección Personal', respuestaTrabajador: 'Equipo de Protección Personal' },
        { numero: 2, texto: '¿Cuándo se debe usar casco?', correcta: true, respuestaEsperada: 'En zonas de riesgo de caída de objetos', respuestaTrabajador: 'En zonas de construcción' }
      ]
    }
  ];

  get evaluacionesFiltradas() {
    const q = this.busqueda.toLowerCase().trim();
    if (!q) return this.evaluaciones;
    return this.evaluaciones.filter(e =>
      e.nombre.toLowerCase().includes(q) ||
      e.formulario.toLowerCase().includes(q) ||
      e.empresa.toLowerCase().includes(q)
    );
  }

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef) {}

  abrirModal(item: any) {
    this.evaluacionSeleccionada = item;
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.evaluacionSeleccionada = null;
  }

  mostrarAlerta(mensaje: string, tipo: 'exito' | 'error') {
    if (this.alertaTimer) clearTimeout(this.alertaTimer);
    this.alertaMensaje = mensaje;
    this.alertaTipo = tipo;
    this.alertaVisible = true;
    this.cdr.detectChanges();
    this.zone.runOutsideAngular(() => {
      this.alertaTimer = setTimeout(() => {
        this.zone.run(() => {
          this.alertaVisible = false;
          this.cdr.detectChanges();
        });
      }, 3500);
    });
  }

  puntosPorPregunta(item: any): number {
    if (!item?.preguntas?.length) return 0;
    return Math.round(100 / item.preguntas.length);
  }

  descargarPDF(item: any) {
    this.mostrarAlerta(`PDF de "${item.formulario}" descargado`, 'exito');
  }
}
