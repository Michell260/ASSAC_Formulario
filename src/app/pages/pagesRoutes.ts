import { Routes } from '@angular/router';

export const rutasPages: Routes = [
  {
    path: 'login',
    title: 'login',
    loadComponent: () => import('./login/login').then(m => m.Login)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }
  //{
  //  path: '**',
  //  redirectTo: ''  // Cualquier ruta desconocida va al inicio
  //}
];

