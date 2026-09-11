import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Productos } from './components/productos/productos';
import { Pedidos } from './components/pedidos/pedidos';
import { Dashboard } from './components/Dashboard/dashboard';

export const routes: Routes = [

   {
    path: '',
component: Inicio

  },
  {
  path: 'productos',
  component: Productos
  },


  {
  path: 'pedidos',
  component: Pedidos
},

{
  path: 'dashboard',
  component: Dashboard
},
];
