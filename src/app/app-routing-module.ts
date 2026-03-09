import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { resume_routes } from './pages/resume/resume.routes';

const routes: Routes = [
  {
    path: '',
    children: resume_routes
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
