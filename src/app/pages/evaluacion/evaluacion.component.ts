import { Component, NgZone,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evaluacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent {
  constructor(private zone: NgZone, private cdr: ChangeDetectorRef) {}
    modalAbierto = false;
    evaluacionSeleccionada: any = null;
    alertaVisible = false;
    alertaMensaje = '';
    alertaTipo = 'exito';
    tabActivo = 'recibidos';
  evaluaciones = [
    {
      iniciales: 'JP', nombre: 'Juan Pérez', color: '#4c6983',
      formulario: 'Seguridad en Alturas', fecha: '15/10/2023',
      puntuacion: '85/100', estado: 'Aprobado', tiempo: '45 min 12 seg',
      preguntas: [
        { numero: 1, texto: '¿Cuál es la altura mínima para considerar un trabajo en altura?', correcta: true, respuestaEsperada: '1.80 metros', respuestaTrabajador: '1.80 metros' },
        { numero: 2, texto: '¿Qué EPP es fundamental para evitar caídas?', correcta: true, respuestaEsperada: 'Arnés de seguridad de cuerpo completo', respuestaTrabajador: 'Arnés de seguridad' },
        { numero: 3, texto: '¿Frecuencia de inspección de los equipos?', correcta: false, respuestaEsperada: 'Antes de cada uso y anualmente certificada', respuestaTrabajador: 'Una vez al mes' }
      ]
    },
    {
      iniciales: 'MG', nombre: 'María García', color: '#cb9120',
      formulario: 'Protocolo COVID-19', fecha: '14/10/2023',
      puntuacion: '92/100', estado: 'Aprobado', tiempo: '38 min 05 seg',
      preguntas: [
        { numero: 1, texto: '¿Cuál es el tiempo recomendado de lavado de manos?', correcta: true, respuestaEsperada: '20 segundos', respuestaTrabajador: '20 segundos' }
      ]
    },
    {
      iniciales: 'CR', nombre: 'Carlos Ruiz', color: '#e07070',
      formulario: 'Manejo de Residuos', fecha: '12/10/2023',
      puntuacion: '45/100', estado: 'Reprobado', tiempo: '52 min 30 seg',
      preguntas: [
        { numero: 1, texto: '¿Cómo se clasifican los residuos peligrosos?', correcta: false, respuestaEsperada: 'Por su naturaleza química y nivel de peligrosidad', respuestaTrabajador: 'Por color de bolsa' }
      ]
    },
    {
      iniciales: 'AB', nombre: 'Ana Beltrán', color: '#6a8f6a',
      formulario: 'Primeros Auxilios', fecha: '10/10/2023',
      puntuacion: '78/100', estado: 'Aprobado', tiempo: '41 min 20 seg',
      preguntas: [
        { numero: 1, texto: '¿Cuántas compresiones por minuto en RCP?', correcta: true, respuestaEsperada: '100-120 compresiones por minuto', respuestaTrabajador: '100-120 por minuto' }
      ]
    }
  ];

  abrirModal(evaluacion: any) {
    this.evaluacionSeleccionada = evaluacion;
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.evaluacionSeleccionada = null;
  }
  private alertaTimer: any = null;

  mostrarAlerta(mensaje: string, tipo: string) {
    if (this.alertaTimer) {
      clearTimeout(this.alertaTimer);
      this.alertaTimer = null;
    }

    this.alertaMensaje = mensaje;
    this.alertaTipo = tipo;
    this.alertaVisible = true;
    this.cdr.detectChanges();

    this.alertaTimer = this.zone.runOutsideAngular(() => {
      return setTimeout(() => {
        this.zone.run(() => {
          this.alertaVisible = false;
          this.cdr.detectChanges();
          this.alertaTimer = null;
        });
      }, 3500);
    });
  }

  verificarYAprobar() {
    const nombre = this.evaluacionSeleccionada?.formulario;
    const index = this.evaluaciones.findIndex(e => e === this.evaluacionSeleccionada);
    if (index !== -1) {
      this.evaluaciones[index].estado = 'Aprobado';
    }
    this.cerrarModal();
    this.mostrarAlerta(` Formulario "${nombre}" aprobado correctamente`, 'exito');
  }

  rechazar() {
    const nombre = this.evaluacionSeleccionada?.formulario;
    const index = this.evaluaciones.findIndex(e => e === this.evaluacionSeleccionada);
    if (index !== -1) {
      this.evaluaciones[index].estado = 'Reprobado';
    }
    this.cerrarModal();
    this.mostrarAlerta(` Formulario "${nombre}" ha sido rechazado`, 'error');
  }
}
