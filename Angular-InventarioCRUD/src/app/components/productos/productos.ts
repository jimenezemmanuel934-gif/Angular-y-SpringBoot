import { Component, OnInit, inject } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productos',
  imports: [],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos implements OnInit {

  private productoService = inject(ProductoService);

  productos: Producto[] = [];

  ngOnInit(): void {
    console.log('ProductosComponent iniciado');
    this.cargarProductos();
  }

  cargarProductos(): void {

    console.log('Consultando productos...');

    this.productoService.listar().subscribe({

      next: (datos) => {
        console.log('Productos recibidos:', datos);
        this.productos = datos;
      },

      error: (error) => {
        console.error('ERROR consultando productos:', error);
      }

    });
  }
}
