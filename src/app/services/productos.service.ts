import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private http: HttpClient) {}

  getProducs(url, localId) {
    return this.http
      .get(`${url}/${localId}/productos.json`)
      .pipe(map(this.createArray));
  }

  private createArray(productsObj) {
    const productos: any = [];

    if (productsObj === null) {
      return [];
    }

    Object.keys(productsObj).forEach((key) => {
      const producto = productsObj[key];
      producto.id = key;
      productos.push(producto);
    });
    return productos;
  }
}
