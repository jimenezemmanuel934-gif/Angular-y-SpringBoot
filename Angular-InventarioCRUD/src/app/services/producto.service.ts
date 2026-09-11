import { Injectable, inject } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { Producto } from "../models/producto"
import { ResumenInventario } from "./resumen-inventario"

@Injectable({
 providedIn:'root'
})

export class ProductoService {
private http = inject(HttpClient);
private apiUrl = 'http://localhost:8080/productos';
listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  buscar(id: number): Observable<Producto> {
    return this.http.get<Producto>(
      `${this.apiUrl}/${id}`
    );
  }

  crear(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(
      this.apiUrl,
      producto
    );
  }

  actualizar(
    id: number,
    producto: Producto
  ): Observable<Producto> {

    return this.http.put<Producto>(
      `${this.apiUrl}/${id}`,
      producto
    );
  }

eliminar(id: number): Observable<string> {
  return this.http.delete(`${this.apiUrl}/${id}`, {
    responseType: 'text'
  });
}

resumen(): Observable<ResumenInventario> {
  return this.http.get<ResumenInventario>(
    `${this.apiUrl}/resumen`
  );
}
}




