import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluacionComponent } from './pages/evaluacion/evaluacion.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';

const routes: Routes = [
  { path: 'evaluacion', component: EvaluacionComponent },
  { path: 'configuracion', component: ConfiguracionComponent },
  { path: '', redirectTo: 'evaluacion', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
