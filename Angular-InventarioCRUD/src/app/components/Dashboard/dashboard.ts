import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';

import { PedidoResumen } from '../../services/pedido-resumen';
import { ResumenInventario } from '../../services/resumen-inventario';

import { PedidoService } from '../../services/pedido.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  private pedidoService = inject(PedidoService);
  private productoService = inject(ProductoService);
  private cdr = inject(ChangeDetectorRef);

  resumenPedidos: PedidoResumen | null = null;

  resumenInventario: ResumenInventario | null = null;

  cargando = true;

  error = '';

  ngOnInit(): void {
    console.log('Dashboard iniciado');

    this.cargarResumen();
  }

  cargarResumen(): void {

    this.cargando = true;
    this.error = '';

    this.productoService.resumen().subscribe({

      next: (datos) => {

        console.log('Resumen inventario:', datos);

        this.resumenInventario = datos;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'ERROR obteniendo resumen de inventario:',
          error
        );

        this.error =
          'No fue posible obtener el resumen del inventario.';

        this.cargando = false;

        this.cdr.detectChanges();
      }

    });

    this.pedidoService.resumen().subscribe({

      next: (datos) => {

        console.log('Resumen pedidos:', datos);

        this.resumenPedidos = datos;

        this.cargando = false;

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'ERROR obteniendo resumen de pedidos:',
          error
        );

        this.error =
          'No fue posible obtener el resumen de los pedidos.';

        this.cargando = false;

        this.cdr.detectChanges();
      }

    });
  }
}
