import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Formulario {
  titulo: string;
  fecha: string;
  puntaje: number;
  estado: 'APROBADO' | 'REPROBADO';
}

export interface Trabajador {
  id: string;
  nombre: string;
  cargo: string;
  ultimaCap: string;
  formularios: number;
  historial: Formulario[];
}

@Component({
  selector: 'app-trabajadores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trabajadores.component.html',
  styleUrls: ['./trabajadores.component.css']
})
export class TrabajadoresComponent {
  busqueda: string = '';
  trabajadorSeleccionado: Trabajador | null = null;

  trabajadores: Trabajador[] = [
    {
      id: 'ID-8821',
      nombre: 'Juan Pérez',
      cargo: 'Operaciones Mineras',
      ultimaCap: '12/10/2023',
      formularios: 15,
      historial: [
        { titulo: 'Inspección de EPP', fecha: '25 Oct 2023', puntaje: 95, estado: 'APROBADO' },
        { titulo: 'Checklist de Maquinaria', fecha: '18 Oct 2023', puntaje: 88, estado: 'APROBADO' },
        { titulo: 'Protocolo de Emergencia', fecha: '12 Oct 2023', puntaje: 55, estado: 'REPROBADO' },
        { titulo: 'Riesgos Eléctricos', fecha: '05 Oct 2023', puntaje: 100, estado: 'APROBADO' },
      ]
    },
    {
      id: 'ID-4532',
      nombre: 'María García',
      cargo: 'Seguridad Industrial',
      ultimaCap: '15/10/2023',
      formularios: 22,
      historial: [
        { titulo: 'Protocolo de Emergencia', fecha: '15 Oct 2023', puntaje: 92, estado: 'APROBADO' },
        { titulo: 'Riesgos Eléctricos', fecha: '10 Oct 2023', puntaje: 78, estado: 'APROBADO' },
        { titulo: 'Inspección de EPP', fecha: '01 Oct 2023', puntaje: 45, estado: 'REPROBADO' },
      ]
    },
    {
      id: 'ID-9910',
      nombre: 'Carlos Ruiz',
      cargo: 'Logística',
      ultimaCap: '08/10/2023',
      formularios: 10,
      historial: [
        { titulo: 'Checklist de Maquinaria', fecha: '08 Oct 2023', puntaje: 70, estado: 'APROBADO' },
        { titulo: 'Inspección de EPP', fecha: '02 Oct 2023', puntaje: 60, estado: 'APROBADO' },
      ]
    },
    {
      id: 'ID-7723',
      nombre: 'Ana Beltrán',
      cargo: 'Recursos Humanos',
      ultimaCap: '20/10/2023',
      formularios: 5,
      historial: [
        { titulo: 'Protocolo de Emergencia', fecha: '20 Oct 2023', puntaje: 98, estado: 'APROBADO' },
        { titulo: 'Riesgos Eléctricos', fecha: '14 Oct 2023', puntaje: 40, estado: 'REPROBADO' },
      ]
    }
  ];

  get trabajadoresFiltrados(): Trabajador[] {
    const q = this.busqueda.toLowerCase().trim();
    if (!q) return this.trabajadores;
    return this.trabajadores.filter(t =>
      t.nombre.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q)
    );
  }

  onBusquedaChange(): void {
    // Si el trabajador seleccionado ya no está en los resultados filtrados, deseleccionar
    if (this.trabajadorSeleccionado) {
      const sigue = this.trabajadoresFiltrados.find(t => t.id === this.trabajadorSeleccionado?.id);
      if (!sigue) this.trabajadorSeleccionado = null;
    }
  }

  limpiarBusqueda(): void {
    this.busqueda = '';
  }

  seleccionarTrabajador(t: Trabajador): void {
    // Toggle: click al mismo trabajador cierra el historial
    if (this.trabajadorSeleccionado?.id === t.id) {
      this.trabajadorSeleccionado = null;
    } else {
      this.trabajadorSeleccionado = t;
    }
  }

  cerrarHistorial(): void {
    this.trabajadorSeleccionado = null;
  }

  exportarPDF(formulario: Formulario, event: Event): void {
    event.stopPropagation();
    alert(`Exportando PDF: ${formulario.titulo}`);
  }

  exportarReporte(): void {
    if (this.trabajadorSeleccionado) {
      alert(`Exportando reporte completo de ${this.trabajadorSeleccionado.nombre}`);
    }
  }
}
