export interface Pedido {
  id?: number;
  cliente: string;
  productoID: number;
  cantidad: number;
  prioridad: string;
  estado: string;
}
