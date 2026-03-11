import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-evaluacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent {

  tabActivo = 'recibidos';
  modalAbierto = false;
  evaluacionSeleccionada: any = null;
  alertaVisible = false;
  alertaMensaje = '';
  alertaTipo: 'exito' | 'error' = 'exito';
  private alertaTimer: any;

  todasEvaluaciones = [
    {
      nombre: 'Juan Pérez', iniciales: 'JP', color: '#4c6983',
      formulario: 'Seguridad en Alturas', fecha: '15/10/2023',
      puntuacion: '85/100', estado: 'Aprobado', verificado: true,
      preguntas: [
        { numero: 1, texto: '¿Cuál es la altura mínima para considerar un trabajo en altura?', correcta: true, respuestaEsperada: '1.80 metros', respuestaTrabajador: '1.80 metros' },
        { numero: 2, texto: '¿Qué EPP es fundamental para evitar caídas?', correcta: true, respuestaEsperada: 'Arnés de seguridad de cuerpo completo', respuestaTrabajador: 'Arnés de seguridad' },
        { numero: 3, texto: '¿Con qué frecuencia se deben inspeccionar los equipos?', correcta: false, respuestaEsperada: 'Antes de cada uso', respuestaTrabajador: 'Cada semana' }
      ]
    },
    {
      nombre: 'María García', iniciales: 'MG', color: '#cb9120',
      formulario: 'Protocolo COVID-19', fecha: '14/10/2023',
      puntuacion: '92/100', estado: 'Aprobado', verificado: true,
      preguntas: [
        { numero: 1, texto: '¿Cuál es la distancia mínima de seguridad?', correcta: true, respuestaEsperada: '1.5 metros', respuestaTrabajador: '1.5 metros' },
        { numero: 2, texto: '¿Con qué frecuencia debe lavarse las manos?', correcta: true, respuestaEsperada: 'Cada 30 minutos', respuestaTrabajador: 'Cada 30 minutos' }
      ]
    },
    {
      nombre: 'Carlos Ruiz', iniciales: 'CR', color: '#e05c5c',
      formulario: 'Manejo de Sustancias', fecha: '12/10/2023',
      puntuacion: '55/100', estado: 'Reprobado', verificado: true,
      preguntas: [
        { numero: 1, texto: '¿Qué significa la señal de peligro en un recipiente?', correcta: false, respuestaEsperada: 'Sustancia tóxica o peligrosa', respuestaTrabajador: 'Sustancia inflamable' },
        { numero: 2, texto: '¿Dónde se deben almacenar los químicos?', correcta: false, respuestaEsperada: 'Lugar ventilado y señalizado', respuestaTrabajador: 'En cualquier lugar seguro' }
      ]
    },
    {
      nombre: 'Ana Blanco', iniciales: 'AB', color: '#5c9e6e',
      formulario: 'Uso de EPP', fecha: '10/10/2023',
      puntuacion: '88/100', estado: 'Aprobado', verificado: true,
      preguntas: [
        { numero: 1, texto: '¿Qué significa EPP?', correcta: true, respuestaEsperada: 'Equipo de Protección Personal', respuestaTrabajador: 'Equipo de Protección Personal' },
        { numero: 2, texto: '¿Cuándo se debe usar casco?', correcta: true, respuestaEsperada: 'En zonas de riesgo de caída de objetos', respuestaTrabajador: 'En zonas de construcción' }
      ]
    },
    {
      nombre: 'Luis Torres', iniciales: 'LT', color: '#7c6983',
      formulario: 'Primeros Auxilios', fecha: '11/03/2026',
      puntuacion: '—', estado: 'Pendiente', verificado: false,
      preguntas: [
        { numero: 1, texto: '¿Qué es la maniobra de Heimlich?', correcta: true, respuestaEsperada: 'Técnica para desatascar vías respiratorias', respuestaTrabajador: 'Técnica de emergencia' },
        { numero: 2, texto: '¿Cuántos ciclos de RCP se hacen por minuto?', correcta: false, respuestaEsperada: '100-120 compresiones', respuestaTrabajador: '60 compresiones' }
      ]
    },
    {
      nombre: 'Sandra Mora', iniciales: 'SM', color: '#c06060',
      formulario: 'Evacuación de Emergencia', fecha: '11/03/2026',
      puntuacion: '—', estado: 'Pendiente', verificado: false,
      preguntas: [
        { numero: 1, texto: '¿Cuál es la ruta de evacuación principal?', correcta: true, respuestaEsperada: 'Salida de emergencia señalizada', respuestaTrabajador: 'La salida más cercana' },
        { numero: 2, texto: '¿Qué se debe hacer al escuchar la alarma?', correcta: true, respuestaEsperada: 'Evacuar de forma ordenada', respuestaTrabajador: 'Evacuar inmediatamente' }
      ]
    },
    {
      nombre: 'Pedro Álvarez', iniciales: 'PA', color: '#4a90a4',
      formulario: 'Trabajo en Espacios Confinados', fecha: '11/03/2026',
      puntuacion: '—', estado: 'Pendiente', verificado: false,
      preguntas: [
        { numero: 1, texto: '¿Qué es un espacio confinado?', correcta: false, respuestaEsperada: 'Espacio con acceso limitado y riesgo de atmósfera peligrosa', respuestaTrabajador: 'Un espacio pequeño y cerrado' },
        { numero: 2, texto: '¿Qué equipo es obligatorio en espacios confinados?', correcta: true, respuestaEsperada: 'Detector de gases y arnés', respuestaTrabajador: 'Detector de gases y arnés' }
      ]
    }
  ];

  get evaluaciones() { return this.todasEvaluaciones.filter(e => e.verificado); }
  get pendientes() { return this.todasEvaluaciones.filter(e => !e.verificado); }
  get isMobile(): boolean { return window.innerWidth <= 768; }

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef) {}

  calcularPuntaje(item: any): string {
    const total = item.preguntas.length;
    if (total === 0) return '0/100';
    const puntajePorPregunta = Math.round(100 / total);
    const correctas = item.preguntas.filter((p: any) => p.correcta).length;
    let puntaje = correctas * puntajePorPregunta;
    if (correctas === total) puntaje = 100;
    return `${puntaje}/100`;
  }

  get puntajeActual(): string {
    if (!this.evaluacionSeleccionada) return '—';
    return this.calcularPuntaje(this.evaluacionSeleccionada);
  }

  toggleRespuesta(pregunta: any, correcta: boolean) {
    pregunta.correcta = correcta;
    this.cdr.detectChanges();
  }

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

  verificarYAprobar() {
    if (this.evaluacionSeleccionada) {
      const puntaje = this.calcularPuntaje(this.evaluacionSeleccionada);
      const valor = parseInt(puntaje.split('/')[0]);
      this.evaluacionSeleccionada.puntuacion = puntaje;
      this.evaluacionSeleccionada.estado = valor >= 60 ? 'Aprobado' : 'Reprobado';
      this.evaluacionSeleccionada.verificado = true;
    }
    this.cerrarModal();
    this.mostrarAlerta('Formulario verificado y guardado', 'exito');
  }

  rechazar() {
    if (this.evaluacionSeleccionada) {
      this.evaluacionSeleccionada.puntuacion = this.calcularPuntaje(this.evaluacionSeleccionada);
      this.evaluacionSeleccionada.estado = 'Reprobado';
      this.evaluacionSeleccionada.verificado = true;
    }
    this.cerrarModal();
    this.mostrarAlerta('Formulario rechazado', 'error');
  }

  aprobarTodos() {
    const cantidad = this.pendientes.length;
    this.pendientes.forEach(e => {
      const puntaje = this.calcularPuntaje(e);
      const valor = parseInt(puntaje.split('/')[0]);
      e.puntuacion = puntaje;
      e.estado = valor >= 60 ? 'Aprobado' : 'Reprobado';
      e.verificado = true;
    });
    this.tabActivo = 'recibidos';
    this.mostrarAlerta(`${cantidad} formularios procesados`, 'exito');
  }
}
