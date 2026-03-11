import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

interface FormularioActivo {
  nombre: string;
  ultimaActividad: string;
  envios: number;
  porcentaje: number;
}

interface ChartBar {
  valor: number;
  label: string;
  activo: boolean;
  heightPct: number;
}

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './panel.html',
})
export class Panel implements OnInit {

  totalFormularios = 1284;
  totalPersonas = 347;
  variacionFormularios = 12;
  variacionPersonas = 8;

  periodoActivo = 'mensual';
  periodos = [
    { label: 'Semanal',    valor: 'semanal' },
    { label: 'Mensual',    valor: 'mensual' },
    { label: 'Trimestral', valor: 'trimestral' },
  ];

  chartBars: ChartBar[] = [];
  guiasY: number[] = [];

  private datosPorPeriodo: Record<string, { valor: number; label: string; activo?: boolean }[]> = {
    semanal: [
      { valor: 48,  label: 'Lun' },
      { valor: 72,  label: 'Mar' },
      { valor: 61,  label: 'Mié' },
      { valor: 95,  label: 'Jue', activo: true },
      { valor: 38,  label: 'Vie' },
      { valor: 22,  label: 'Sáb' },
      { valor: 15,  label: 'Dom' },
    ],
    mensual: [
      { valor: 210, label: 'S1' },
      { valor: 285, label: 'S2' },
      { valor: 320, label: 'S3' },
      { valor: 469, label: 'S4', activo: true },
      { valor: 390, label: 'S5' },
    ],
    trimestral: [
      { valor: 820,  label: 'Ene' },
      { valor: 1050, label: 'Feb' },
      { valor: 1284, label: 'Mar', activo: true },
    ],
  };

  formulariosMasActivos: FormularioActivo[] = [
    { nombre: 'Reporte de Seguridad Industrial', ultimaActividad: 'Hace 2 horas', envios: 452, porcentaje: 100 },
    { nombre: 'Control de Inventario Semanal',   ultimaActividad: 'Hace 5 horas', envios: 312, porcentaje: 69  },
    { nombre: 'Checklist de Mantenimiento',      ultimaActividad: 'Ayer',         envios: 285, porcentaje: 63  },
  ];

  ngOnInit(): void {
    this.buildChart();
  }

  cambiarPeriodo(valor: string): void {
    this.periodoActivo = valor;
    this.buildChart();
  }

  buildChart(): void {
    const datos = this.datosPorPeriodo[this.periodoActivo];
    const maxVal = Math.max(...datos.map(d => d.valor));

    // Calcular step legible para el eje Y
    const rawStep = maxVal / 4;
    const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
    const step = Math.ceil(rawStep / magnitude) * magnitude;
    const chartMax = step * 4;

    this.guiasY = [chartMax, step * 3, step * 2, step, 0];

    // Altura como % del área de barras (el contenedor flex-1)
    this.chartBars = datos.map(d => ({
      valor:     d.valor,
      label:     d.label,
      activo:    !!d.activo,
      heightPct: Math.max(3, Math.round((d.valor / chartMax) * 100)),
    }));
  }
}
