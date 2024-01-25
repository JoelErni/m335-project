import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'task1',
    loadComponent: () => import('./task1/task1.page').then( m => m.Task1Page)
  },
];
