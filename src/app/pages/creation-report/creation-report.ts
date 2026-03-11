import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ── Pipe: Cuenta opciones correctas ─────────────────────────────────────────
@Pipe({ name: 'correctaCount', standalone: true, pure: false })
export class CorrectaCountPipe implements PipeTransform {
  transform(opciones: { esCorrecta?: boolean }[]): number {
    return opciones.filter(o => o.esCorrecta).length;
  }
}

// ── Pipe: Safe URL (YouTube iframes) ─────────────────────────────────────────
@Pipe({ name: 'trustUrl', standalone: true })
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

// ── Tipos ──────────────────────────────────────────────────────────────────
export type TipoPregunta =
  | 'texto_corto' | 'parrafo' | 'opcion_multiple' | 'casillas'
  | 'lista_desplegable' | 'fecha' | 'hora' | 'subir_archivo'
  | 'firma_digital' | 'geolocalizacion' | 'imagen' | 'video' | 'seccion';

export interface Opcion {
  id: string;
  texto: string;
  esCorrecta?: boolean;
}

export interface Pregunta {
  id: string;
  tipo: TipoPregunta;
  etiqueta: string;
  placeholder: string;
  obligatorio: boolean;
  opciones: Opcion[];
  respuestaCorrecta?: string;        // para texto_corto con calificación
  calificable?: boolean;
  puntaje?: number;
  imagenUrl?: string;                // imagen adjunta al campo
  videoUrl?: string;                 // URL youtube
  videoNombre?: string;
  minCaracteres?: number;
  maxCaracteres?: number;
  // Para sección
  tituloSeccion?: string;
  descripcionSeccion?: string;
}

export interface Tema {
  colorFormulario: string;           // color de fondo tarjeta
  colorFondo: string;                // color fondo general
  colorAcento: string;               // color botones/barra superior
  tamanoEncabezado: 'sm' | 'md' | 'lg' | 'xl';
  tamanoPregunta: 'xs' | 'sm' | 'md';
  tamanoTexto: 'xs' | 'sm' | 'md';
  imagenEncabezado?: string;         // URL imagen encabezado
  fuenteFormulario: string;
}

export interface Formulario {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  estado: 'borrador' | 'publicado';
  fechaCreacion: string;
  respuestas: number;
  link?: string;
  preguntas: Pregunta[];
  tema: Tema;
  ordenAleatorio: boolean;
}

// ── Catálogo de campos ──────────────────────────────────────────────────────
export interface TipoCampo {
  tipo: TipoPregunta;
  label: string;
  grupo: 'basico' | 'avanzado' | 'contenido';
  svgPath: string; // path del ícono SVG
}

export const TIPOS_CAMPO: TipoCampo[] = [
  { tipo: 'texto_corto',       label: 'Texto Corto',         grupo: 'basico',    svgPath: 'M4 6h16M4 12h10M4 18h6' },
  { tipo: 'parrafo',           label: 'Párrafo',             grupo: 'basico',    svgPath: 'M4 6h16M4 10h16M4 14h16M4 18h10' },
  { tipo: 'opcion_multiple',   label: 'Opción Múltiple',     grupo: 'basico',    svgPath: 'M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-6a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' },
  { tipo: 'casillas',          label: 'Casillas',            grupo: 'basico',    svgPath: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' },
  { tipo: 'lista_desplegable', label: 'Lista Desplegable',   grupo: 'basico',    svgPath: 'M6 9l6 6 6-6' },
  { tipo: 'fecha',             label: 'Fecha y Hora',        grupo: 'avanzado',  svgPath: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' },
  { tipo: 'subir_archivo',     label: 'Subir Archivo',       grupo: 'avanzado',  svgPath: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12' },
  { tipo: 'firma_digital',     label: 'Firma Digital',       grupo: 'avanzado',  svgPath: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z' },
  { tipo: 'geolocalizacion',   label: 'Geolocalización',     grupo: 'avanzado',  svgPath: 'M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z' },
  { tipo: 'imagen',            label: 'Imagen',              grupo: 'contenido', svgPath: 'M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 13.5l2.5 3 3.5-4.5 4.5 6H5l3.5-4.5z' },
  { tipo: 'video',             label: 'Video YouTube',       grupo: 'contenido', svgPath: 'M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
  { tipo: 'seccion',           label: 'Añadir Sección',      grupo: 'contenido', svgPath: 'M3 12h18M3 6h18M3 18h18' },
];

export const CATEGORIAS = [
  'Capacitación', 'Seguridad Industrial', 'Mantenimiento',
  'Inventario', 'Recursos Humanos', 'Auditoría', 'Otro',
];

export const FUENTES = ['Poppins', 'Roboto', 'Open Sans', 'Montserrat', 'Lato'];

export const PALETA_COLORES = [
  { fondo: '#F5F6F8', form: '#FFFFFF', acento: '#C89B3C', label: 'Dorado (Default)' },
  { fondo: '#EFF6FF', form: '#FFFFFF', acento: '#3B82F6', label: 'Azul' },
  { fondo: '#F0FDF4', form: '#FFFFFF', acento: '#16A34A', label: 'Verde' },
  { fondo: '#FDF4FF', form: '#FFFFFF', acento: '#9333EA', label: 'Morado' },
  { fondo: '#FFF1F2', form: '#FFFFFF', acento: '#E11D48', label: 'Rojo' },
  { fondo: '#1E293B', form: '#0F172A', acento: '#C89B3C', label: 'Oscuro' },
];

function uid(): string { return Math.random().toString(36).slice(2, 9); }

function nuevaPregunta(tipo: TipoPregunta = 'texto_corto'): Pregunta {
  if (tipo === 'seccion') {
    return { id: uid(), tipo, etiqueta: '', placeholder: '', obligatorio: false, opciones: [], tituloSeccion: 'Nueva Sección', descripcionSeccion: '' };
  }
  return {
    id: uid(), tipo, etiqueta: '', placeholder: '', obligatorio: false,
    calificable: false, puntaje: 1,
    opciones: ['opcion_multiple', 'casillas', 'lista_desplegable'].includes(tipo)
      ? [{ id: uid(), texto: 'Opción 1', esCorrecta: false }, { id: uid(), texto: 'Opción 2', esCorrecta: false }]
      : [],
  };
}

function temaPorDefecto(): Tema {
  return {
    colorFormulario: '#FFFFFF', colorFondo: '#F5F6F8', colorAcento: '#C89B3C',
    tamanoEncabezado: 'lg', tamanoPregunta: 'sm', tamanoTexto: 'sm',
    fuenteFormulario: 'Poppins',
  };
}

@Component({
  selector: 'app-creation-report',
  standalone: true,
  imports: [CommonModule, FormsModule, SafeUrlPipe, CorrectaCountPipe],
  templateUrl: './creation-report.html',
})
export class CreationReportComponent implements OnInit {

  // ── Vista activa ──────────────────────────────────────────────────────────
  vista: 'lista' | 'editor' | 'preview' = 'lista';
  tabLista: 'todos' | 'borradores' | 'publicados' = 'todos';
  panelDerecho: 'pregunta' | 'tema' = 'pregunta';

  readonly tabsLista: { v: 'todos' | 'publicados' | 'borradores'; l: string }[] = [
    { v: 'todos', l: 'Todos' }, { v: 'publicados', l: 'Publicados' }, { v: 'borradores', l: 'Borradores' },
  ];

  cambiarTab(v: 'todos' | 'publicados' | 'borradores'): void { this.tabLista = v; }

  // ── Alertas ───────────────────────────────────────────────────────────────
  alertaVisible = false;
  alertaTipo: 'exito' | 'error' = 'exito';
  alertaMensaje = '';

  // ── Modales ───────────────────────────────────────────────────────────────
  modalPublicadoVisible = false;
  linkGenerado = '';
  modalImagenVisible = false;        // para agregar imagen a pregunta
  modalVideoVisible = false;         // para agregar video a pregunta
  imagenTabModal: 'url' | 'archivo' = 'url';   // tab activo en modal imagen
  imagenUrlTmp = '';
  videoUrlTmp = '';
  videoNombreTmp = '';
  preguntaContexto: Pregunta | null = null; // pregunta que recibe imagen/video

  // ── Drag & drop ───────────────────────────────────────────────────────────
  dragIndex: number | null = null;
  dragOverIndex: number | null = null;

  // ── Datos ejemplo ─────────────────────────────────────────────────────────
  formularios: Formulario[] = [
    {
      id: uid(), titulo: 'Reporte de Seguridad Industrial', descripcion: 'Formulario de evaluación de normas de seguridad.',
      categoria: 'Seguridad Industrial', estado: 'publicado', fechaCreacion: '12/03/2025', respuestas: 452,
      link: 'https://assac.app/f/seguridad-2025', tema: temaPorDefecto(), ordenAleatorio: false,
      preguntas: [
        { id: uid(), tipo: 'texto_corto', etiqueta: 'Nombre Completo del Participante', placeholder: 'Ej: Juan Pérez', obligatorio: true, calificable: false, puntaje: 0, opciones: [] },
        { id: uid(), tipo: 'opcion_multiple', etiqueta: '¿Ha utilizado el EPP durante toda la jornada?', placeholder: '', obligatorio: true, calificable: true, puntaje: 2, opciones: [
          { id: uid(), texto: 'Sí, correctamente', esCorrecta: true },
          { id: uid(), texto: 'No, parcialmente', esCorrecta: false },
          { id: uid(), texto: 'No he recibido EPP', esCorrecta: false },
        ]},
        { id: uid(), tipo: 'firma_digital', etiqueta: 'Firma Digital del Trabajador', placeholder: '', obligatorio: true, calificable: false, puntaje: 0, opciones: [] },
      ],
    },
    {
      id: uid(), titulo: 'Control de Inventario Semanal', descripcion: 'Reporte semanal de estado de inventario.',
      categoria: 'Inventario', estado: 'publicado', fechaCreacion: '08/03/2025', respuestas: 312,
      link: 'https://assac.app/f/inventario-semanal', tema: temaPorDefecto(), ordenAleatorio: false, preguntas: [],
    },
    {
      id: uid(), titulo: 'Checklist de Mantenimiento', descripcion: 'Verificación de equipos y maquinaria.',
      categoria: 'Mantenimiento', estado: 'borrador', fechaCreacion: '05/03/2025', respuestas: 0,
      tema: temaPorDefecto(), ordenAleatorio: false, preguntas: [],
    },
  ];

  // ── Editor ────────────────────────────────────────────────────────────────
  formularioActual: Formulario = this.nuevoFormulario();
  preguntaSeleccionada: Pregunta | null = null;
  tiposCampo = TIPOS_CAMPO;
  categorias = CATEGORIAS;
  fuentes = FUENTES;
  paleta = PALETA_COLORES;

  // ── Computed ──────────────────────────────────────────────────────────────
  get formulariosFiltrados(): Formulario[] {
    if (this.tabLista === 'borradores') return this.formularios.filter(f => f.estado === 'borrador');
    if (this.tabLista === 'publicados') return this.formularios.filter(f => f.estado === 'publicado');
    return this.formularios;
  }
  get totalPublicados(): number { return this.formularios.filter(f => f.estado === 'publicado').length; }
  get totalBorradores(): number { return this.formularios.filter(f => f.estado === 'borrador').length; }
  get totalRespuestas(): number { return this.formularios.reduce((a, f) => a + f.respuestas, 0); }
  get tiposBasicos(): TipoCampo[] { return TIPOS_CAMPO.filter(t => t.grupo === 'basico'); }
  get tiposAvanzados(): TipoCampo[] { return TIPOS_CAMPO.filter(t => t.grupo === 'avanzado'); }
  get tiposContenido(): TipoCampo[] { return TIPOS_CAMPO.filter(t => t.grupo === 'contenido'); }
  get tieneCalificables(): boolean { return this.formularioActual.preguntas.some(p => p.calificable); }

  ngOnInit(): void {}

  // ── Factory ────────────────────────────────────────────────────────────────
  nuevoFormulario(): Formulario {
    return {
      id: uid(), titulo: '', descripcion: '', categoria: '',
      estado: 'borrador', fechaCreacion: new Date().toLocaleDateString('es-CL'),
      respuestas: 0, tema: temaPorDefecto(), ordenAleatorio: false,
      preguntas: [nuevaPregunta('texto_corto')],
    };
  }

  // ── Helpers UI ─────────────────────────────────────────────────────────────
  labelTipo(tipo: TipoPregunta): string {
    return TIPOS_CAMPO.find(t => t.tipo === tipo)?.label ?? tipo;
  }
  svgTipo(tipo: TipoPregunta): string {
    return TIPOS_CAMPO.find(t => t.tipo === tipo)?.svgPath ?? '';
  }
  tieneOpciones(tipo: TipoPregunta): boolean {
    return ['opcion_multiple', 'casillas', 'lista_desplegable'].includes(tipo);
  }
  youtubeEmbedUrl(url: string): string {
    const match = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : '';
  }
  esColorOscuro(hex: string): boolean {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) < 128;
  }
  textoSobreAcento(): string {
    return this.esColorOscuro(this.formularioActual.tema.colorAcento) ? '#FFFFFF' : '#1E293B';
  }
  tamanoEncabezadoClass(): string {
    const map: Record<string, string> = { sm: 'text-lg', md: 'text-xl', lg: 'text-2xl', xl: 'text-3xl' };
    return map[this.formularioActual.tema.tamanoEncabezado] ?? 'text-2xl';
  }

  // ── Navegación ──────────────────────────────────────────────────────────────
  abrirEditor(formulario?: Formulario): void {
    this.formularioActual = formulario ? JSON.parse(JSON.stringify(formulario)) : this.nuevoFormulario();
    this.preguntaSeleccionada = this.formularioActual.preguntas.find(p => p.tipo !== 'seccion') ?? this.formularioActual.preguntas[0] ?? null;
    this.panelDerecho = 'pregunta';
    this.vista = 'editor';
  }
  volverLista(): void { this.vista = 'lista'; this.preguntaSeleccionada = null; }
  abrirPreview(): void { this.vista = 'preview'; }
  volverEditor(): void { this.vista = 'editor'; }

  // ── Preguntas ───────────────────────────────────────────────────────────────
  seleccionarPregunta(p: Pregunta): void {
    this.preguntaSeleccionada = p;
    this.panelDerecho = 'pregunta';
  }

  agregarPregunta(tipo: TipoPregunta = 'texto_corto'): void {
    const p = nuevaPregunta(tipo);
    const idx = this.preguntaSeleccionada
      ? this.formularioActual.preguntas.indexOf(this.preguntaSeleccionada) + 1
      : this.formularioActual.preguntas.length;
    this.formularioActual.preguntas.splice(idx, 0, p);
    this.preguntaSeleccionada = p;
    this.panelDerecho = 'pregunta';
  }

  duplicarPregunta(p: Pregunta): void {
    const copia: Pregunta = { ...JSON.parse(JSON.stringify(p)), id: uid() };
    const idx = this.formularioActual.preguntas.indexOf(p);
    this.formularioActual.preguntas.splice(idx + 1, 0, copia);
    this.preguntaSeleccionada = copia;
  }

  eliminarPregunta(p: Pregunta): void {
    const idx = this.formularioActual.preguntas.indexOf(p);
    this.formularioActual.preguntas.splice(idx, 1);
    this.preguntaSeleccionada = this.formularioActual.preguntas[Math.max(0, idx - 1)] ?? null;
  }

  cambiarTipo(p: Pregunta, tipo: TipoPregunta): void {
    p.tipo = tipo;
    if (this.tieneOpciones(tipo) && p.opciones.length === 0) {
      p.opciones = [{ id: uid(), texto: 'Opción 1', esCorrecta: false }, { id: uid(), texto: 'Opción 2', esCorrecta: false }];
    }
  }

  agregarOpcion(p: Pregunta): void {
    p.opciones.push({ id: uid(), texto: `Opción ${p.opciones.length + 1}`, esCorrecta: false });
  }

  eliminarOpcion(p: Pregunta, o: Opcion): void {
    if (p.opciones.length > 1) p.opciones = p.opciones.filter(x => x.id !== o.id);
  }

  toggleCorrecta(p: Pregunta, o: Opcion): void {
    if (p.tipo === 'opcion_multiple') {
      p.opciones.forEach(op => op.esCorrecta = false);
    }
    o.esCorrecta = !o.esCorrecta;
    if (!p.calificable) p.calificable = true;
  }

  // ── Orden (botones flecha) ─────────────────────────────────────────────────
  moverArriba(idx: number): void {
    if (idx > 0) {
      const arr = this.formularioActual.preguntas;
      [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    }
  }
  moverAbajo(idx: number): void {
    const arr = this.formularioActual.preguntas;
    if (idx < arr.length - 1) [arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]];
  }

  // ── Drag & Drop ────────────────────────────────────────────────────────────
  onDragStart(idx: number): void { this.dragIndex = idx; }
  onDragOver(e: DragEvent, idx: number): void { e.preventDefault(); this.dragOverIndex = idx; }
  onDrop(targetIdx: number): void {
    if (this.dragIndex === null || this.dragIndex === targetIdx) { this.dragIndex = null; this.dragOverIndex = null; return; }
    const arr = this.formularioActual.preguntas;
    const moved = arr.splice(this.dragIndex, 1)[0];
    arr.splice(targetIdx, 0, moved);
    this.dragIndex = null;
    this.dragOverIndex = null;
  }
  onDragEnd(): void { this.dragIndex = null; this.dragOverIndex = null; }

  // ── Orden aleatorio ────────────────────────────────────────────────────────
  mezclarOrden(): void {
    const arr = this.formularioActual.preguntas;
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    this.mostrarAlerta('exito', 'Orden de preguntas mezclado aleatoriamente.');
  }

  // ── Imagen adjunta a pregunta ──────────────────────────────────────────────
  abrirModalImagen(p: Pregunta): void {
    this.preguntaContexto = p;
    this.imagenUrlTmp = p.imagenUrl ?? '';
    this.imagenTabModal = 'url';
    this.modalImagenVisible = true;
  }
  confirmarImagen(): void {
    if (this.preguntaContexto) this.preguntaContexto.imagenUrl = this.imagenUrlTmp.trim() || undefined;
    this.modalImagenVisible = false;
    this.preguntaContexto = null;
  }
  onImagenFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { this.imagenUrlTmp = reader.result as string; };
    reader.readAsDataURL(file);
  }
  quitarImagen(p: Pregunta): void { p.imagenUrl = undefined; }

  // ── Video ─────────────────────────────────────────────────────────────────
  abrirModalVideo(): void { this.videoUrlTmp = ''; this.videoNombreTmp = ''; this.modalVideoVisible = true; }
  confirmarVideo(): void {
    const p = nuevaPregunta('video');
    p.videoUrl = this.videoUrlTmp.trim();
    p.videoNombre = this.videoNombreTmp.trim() || 'Video';
    const idx = this.preguntaSeleccionada
      ? this.formularioActual.preguntas.indexOf(this.preguntaSeleccionada) + 1
      : this.formularioActual.preguntas.length;
    this.formularioActual.preguntas.splice(idx, 0, p);
    this.preguntaSeleccionada = p;
    this.modalVideoVisible = false;
  }

  // ── Imagen encabezado ──────────────────────────────────────────────────────
  imagenEncabezadoTmp = '';
  encabezadoTabModal: 'url' | 'archivo' = 'url';
  modalEncabezadoVisible = false;
  abrirModalEncabezado(): void {
    this.imagenEncabezadoTmp = this.formularioActual.tema.imagenEncabezado ?? '';
    this.encabezadoTabModal = 'url';
    this.modalEncabezadoVisible = true;
  }
  confirmarEncabezado(): void {
    this.formularioActual.tema.imagenEncabezado = this.imagenEncabezadoTmp.trim() || undefined;
    this.modalEncabezadoVisible = false;
  }
  onEncabezadoFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { this.imagenEncabezadoTmp = reader.result as string; };
    reader.readAsDataURL(file);
  }

  // ── Tema / Paleta ─────────────────────────────────────────────────────────
  aplicarPaleta(p: typeof PALETA_COLORES[0]): void {
    this.formularioActual.tema.colorFondo = p.fondo;
    this.formularioActual.tema.colorFormulario = p.form;
    this.formularioActual.tema.colorAcento = p.acento;
  }

  // ── Guardar / Publicar ─────────────────────────────────────────────────────
  guardarBorrador(): void {
    if (!this.formularioActual.titulo.trim()) { this.mostrarAlerta('error', 'El formulario debe tener un título.'); return; }
    const copia = { ...JSON.parse(JSON.stringify(this.formularioActual)), estado: 'borrador' as const };
    const idx = this.formularios.findIndex(f => f.id === this.formularioActual.id);
    if (idx >= 0) this.formularios[idx] = copia; else this.formularios.unshift(copia);
    this.mostrarAlerta('exito', 'Borrador guardado correctamente.');
  }

  publicar(): void {
    if (!this.formularioActual.titulo.trim()) { this.mostrarAlerta('error', 'El formulario debe tener un título.'); return; }
    if (this.formularioActual.preguntas.filter(p => p.tipo !== 'seccion').length === 0) {
      this.mostrarAlerta('error', 'Agrega al menos una pregunta.'); return;
    }
    const slug = this.formularioActual.titulo.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    this.linkGenerado = `https://assac.app/f/${slug}-${uid()}`;
    const copia: Formulario = { ...JSON.parse(JSON.stringify(this.formularioActual)), estado: 'publicado', link: this.linkGenerado };
    const idx = this.formularios.findIndex(f => f.id === this.formularioActual.id);
    if (idx >= 0) this.formularios[idx] = copia; else this.formularios.unshift(copia);
    this.formularioActual = copia;
    this.modalPublicadoVisible = true;
  }

  copiarLink(): void {
    navigator.clipboard?.writeText(this.linkGenerado).catch(() => {});
    this.mostrarAlerta('exito', '¡Enlace copiado al portapapeles!');
  }

  cerrarModalPublicado(): void { this.modalPublicadoVisible = false; this.volverLista(); }

  eliminarFormulario(f: Formulario): void {
    this.formularios = this.formularios.filter(x => x.id !== f.id);
    this.mostrarAlerta('exito', 'Formulario eliminado.');
  }

  // ── Tema helpers ──────────────────────────────────────────────────────────
  setTamanoEncabezado(v: string): void {
    this.formularioActual.tema.tamanoEncabezado = v as 'sm' | 'md' | 'lg' | 'xl';
  }
  setTamanoPregunta(v: string): void {
    this.formularioActual.tema.tamanoPregunta = v as 'xs' | 'sm' | 'md';
  }

  // ── Alerta ─────────────────────────────────────────────────────────────────
  private mostrarAlerta(tipo: 'exito' | 'error', mensaje: string): void {
    this.alertaTipo = tipo; this.alertaMensaje = mensaje; this.alertaVisible = true;
    setTimeout(() => this.alertaVisible = false, 3500);
  }
}
