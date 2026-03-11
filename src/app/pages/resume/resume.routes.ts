import { Routes } from '@angular/router';
import { NavigationAdmin } from './components/navigation/navigation-admin/navigation-admin';
import { EvaluacionComponent } from '../evaluacion/evaluacion.component';
import { ConfiguracionComponent } from '../configuracion/configuracion.component';
import { CreationReportComponent } from '../creation-report/creation-report';
import { Panel } from '../panel/panel';
import { TrabajadoresComponent } from '../trabajadores/trabajadores.component';


export const resume_routes: Routes = [
  {
    path: '',
    component: NavigationAdmin,
    children: [
      { path: 'evaluacion', component: EvaluacionComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
      { path: 'creation-report', component: CreationReportComponent },
      { path: 'panel', component: Panel },
      { path: 'trabajadores', component: TrabajadoresComponent },
      { path: '', redirectTo: 'evaluacion', pathMatch: 'full' },
      { path: '**', redirectTo: 'evaluacion' }
    ]
  }
];
