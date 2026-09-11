import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productos',
  imports: [FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos implements OnInit {

  private productoService = inject(ProductoService);
  private cdr = inject(ChangeDetectorRef);


  productos: Producto[] = [];

 nuevoProducto: Producto = {
  nombre: '',
  precio: null as any,
  cantidad: null as any,
  categoria: ''
};

  editando: boolean = false;

  productoEditandoId: number | null = null;

  ngOnInit(): void {
    console.log('ProductosComponent iniciado');
    this.cargarProductos();
  }

  cargarProductos(): void {

    console.log('Consultando productos...');

    this.productoService.listar().subscribe({

     next: (datos) => {

  console.log('Productos recibidos:', datos);

  this.productos = [...datos];

  this.cdr.detectChanges();
},


      error: (error) => {
        console.error('ERROR consultando productos:', error);
      }

    });
  }

  crearProducto(): void {

    console.log('Enviando producto:', this.nuevoProducto);

    this.productoService.crear(this.nuevoProducto).subscribe({

      next: (productoCreado) => {

        console.log('Producto creado:', productoCreado);

        alert('Producto creado correctamente');

        this.limpiarFormulario();

        this.cargarProductos();
      },

      error: (error) => {

        console.error('ERROR creando producto:', error);

        alert('Error al crear el producto');
      }

    });
  }

  editarProducto(producto: Producto): void {

    console.log('Editando producto:', producto);

    this.editando = true;

    this.productoEditandoId = producto.id ?? null;

    this.nuevoProducto = {
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: producto.cantidad,
      categoria: producto.categoria
    };
  }

  actualizarProducto(): void {

    if (this.productoEditandoId === null) {
      alert('No hay un producto seleccionado para editar');
      return;
    }

    console.log(
      'Actualizando producto:',
      this.productoEditandoId,
      this.nuevoProducto
    );

    this.productoService
      .actualizar(this.productoEditandoId, this.nuevoProducto)
      .subscribe({

        next: (productoActualizado) => {

  console.log(
    'Producto actualizado:',
    productoActualizado
  );

  this.productos = this.productos.map(producto =>
    producto.id === productoActualizado.id
      ? productoActualizado
      : producto
  );

  this.cdr.detectChanges();

  alert('Producto actualizado correctamente');

  this.limpiarFormulario();
},


      });
  }

borrarProducto(id: number): void {

  console.log('Eliminando producto con ID:', id);

  const confirmar = confirm(
    '¿Está seguro de que desea eliminar este producto?'
  );

  if (!confirmar) {
    return;
  }

  this.productoService.eliminar(id).subscribe({

    next: (respuesta) => {

      console.log('Respuesta del servidor:', respuesta);

      this.productos = this.productos.filter(
        producto => producto.id !== id
      );

      this.cdr.detectChanges();

      alert('Producto eliminado correctamente');
    },

    error: (error) => {

      console.error('ERROR eliminando producto:', error);

      alert('Error al eliminar el producto');
    }

  });

}
  cancelarEdicion(): void {

    this.limpiarFormulario();

  }

  limpiarFormulario(): void {

  this.nuevoProducto = {
    nombre: '',
    precio: null as any,
    cantidad: null as any,
    categoria: ''
  };

  this.editando = false;

  this.productoEditandoId = null;
}

}
