import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';
import { PedidoResumen } from './pedido-resumen';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/pedidos';

  listar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  buscar(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  crear(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }

  actualizar(id: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(
      `${this.apiUrl}/${id}`,
      pedido
    );
  }

  confirmar(id: number): Observable<Pedido> {
    return this.http.put<Pedido>(
      `${this.apiUrl}/${id}/confirmar`,
      {}
    );
  }

  cancelar(id: number): Observable<Pedido> {
    return this.http.put<Pedido>(
      `${this.apiUrl}/${id}/cancelar`,
      {}
    );
  }

  despachar(id: number): Observable<Pedido> {
    return this.http.put<Pedido>(
      `${this.apiUrl}/${id}/despachar`,
      {}
    );
  }

  pendientes(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(
      `${this.apiUrl}/pendientes`
    );
  }

  urgentes(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(
      `${this.apiUrl}/urgentes`
    );
  }

  porEstado(estado: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(
      `${this.apiUrl}/estado`,
      {
        params: { estado }
      }
    );
  }

  enRiesgo(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(
      `${this.apiUrl}/en-riesgo`
    );
  }

  resumen(): Observable<PedidoResumen> {
  return this.http.get<PedidoResumen>(
    `${this.apiUrl}/resumen`
  );
}
}
