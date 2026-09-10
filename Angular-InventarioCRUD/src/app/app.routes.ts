import { Routes } from '@angular/router';
import { Productos } from './components/productos/productos';

export const routes: Routes = [

  {
  path: 'productos',
  component: Productos
  },

  {
  path: '',
  redirectTo: 'productos',
  pathMatch: 'full'
  }
];
