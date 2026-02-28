import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluacionComponent } from './pages/evaluacion/evaluacion.component';

const routes: Routes = [
  { path: 'evaluacion', component: EvaluacionComponent },
  { path: '', redirectTo: 'evaluacion', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
