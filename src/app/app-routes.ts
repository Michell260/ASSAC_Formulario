import { Routes } from '@angular/router';
//import { NotFound404 } from './pages/not-found-404/not-found-404';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pagesRoutes').then(m => m.rutasPages),
  },

  {
      path: 'resume',
      loadChildren: () => import('./pages/resume/resume.routes').then(m => m.resume_routes),
  }

  //{
    //path: 'not-found-404',
    //component: NotFound404
  //},

  //  SOLO UNA RUTA '**' Y AL FINAL
  //{
    //path: '**',
    //redirectTo: 'not-found'
  //}
];

