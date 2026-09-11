import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Pedido } from '../../models/pedido';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-pedidos',
  imports: [FormsModule],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedidos implements OnInit {

  private pedidoService = inject(PedidoService);
  private cdr = inject(ChangeDetectorRef);

  pedidos: Pedido[] = [];

  nuevoPedido: Pedido = {
    cliente: '',
    productoID: null as any,
    cantidad: null as any,
    prioridad: 'MEDIA',
    estado: ''
  };

  ngOnInit(): void {
    console.log('Pedidos iniciado');
    this.cargarPedidos();
  }

  cargarPedidos(): void {

    console.log('Consultando pedidos...');

    this.pedidoService.listar().subscribe({

      next: (datos) => {

        console.log('Pedidos recibidos:', datos);

        this.pedidos = [...datos];

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('ERROR consultando pedidos:', error);

        alert(
          'No fue posible conectar con el servidor. ' +
          'Verifica que Spring Boot esté disponible.'
        );
      }

    });
  }

  crearPedido(): void {

    console.log('Enviando pedido:', this.nuevoPedido);

    const pedidoParaEnviar: Pedido = {
      cliente: this.nuevoPedido.cliente,
      productoID: this.nuevoPedido.productoID,
      cantidad: this.nuevoPedido.cantidad,
      prioridad: this.nuevoPedido.prioridad,
      estado: ''
    };

    this.pedidoService.crear(pedidoParaEnviar).subscribe({

      next: (pedidoCreado) => {

        console.log('Pedido creado:', pedidoCreado);

        alert('Pedido creado correctamente');

        this.pedidos = [
          ...this.pedidos,
          pedidoCreado
        ];

        this.limpiarFormulario();

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('ERROR creando pedido:', error);

        let mensaje = 'Error al crear el pedido';

        if (error.error) {
          mensaje = error.error;
        }

        alert(mensaje);
      }

    });
  }

  confirmarPedido(id: number): void {

    console.log('Confirmando pedido:', id);

    this.pedidoService.confirmar(id).subscribe({

      next: (pedidoActualizado) => {

        console.log('Pedido confirmado:', pedidoActualizado);

        this.actualizarPedidoEnLista(pedidoActualizado);

        alert('Pedido confirmado correctamente');

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('ERROR confirmando pedido:', error);

        let mensaje = 'Error al confirmar el pedido';

        if (error.error) {
          mensaje = error.error;
        }

        alert(mensaje);
      }

    });
  }

  cancelarPedido(id: number): void {

    const confirmar = confirm(
      '¿Está seguro de que desea cancelar este pedido?'
    );

    if (!confirmar) {
      return;
    }

    console.log('Cancelando pedido:', id);

    this.pedidoService.cancelar(id).subscribe({

      next: (pedidoActualizado) => {

        console.log('Pedido cancelado:', pedidoActualizado);

        this.actualizarPedidoEnLista(pedidoActualizado);

        alert('Pedido cancelado correctamente');

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('ERROR cancelando pedido:', error);

        let mensaje = 'Error al cancelar el pedido';

        if (error.error) {
          mensaje = error.error;
        }

        alert(mensaje);
      }

    });
  }

  despacharPedido(id: number): void {

    console.log('Despachando pedido:', id);

    this.pedidoService.despachar(id).subscribe({

      next: (pedidoActualizado) => {

        console.log('Pedido despachado:', pedidoActualizado);

        this.actualizarPedidoEnLista(pedidoActualizado);

        alert('Pedido despachado correctamente');

        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('ERROR despachando pedido:', error);

        let mensaje = 'Error al despachar el pedido';

        if (error.error) {
          mensaje = error.error;
        }

        alert(mensaje);
      }

    });
  }

  private actualizarPedidoEnLista(
    pedidoActualizado: Pedido
  ): void {

    this.pedidos = this.pedidos.map(pedido =>
      pedido.id === pedidoActualizado.id
        ? pedidoActualizado
        : pedido
    );
  }

  limpiarFormulario(): void {

    this.nuevoPedido = {
      cliente: '',
      productoID: null as any,
      cantidad: null as any,
      prioridad: 'MEDIA',
      estado: ''
    };
  }
}
