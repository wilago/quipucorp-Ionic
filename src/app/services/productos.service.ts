import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private http: HttpClient) {}

  getProducts(url, localId) {
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
    return { success: true, data: productos };
  }

  createProduct(url, localId, product) {
    return this.http.post(`${url}/${localId}/productos.json`, product);
  }

  updateProduct(url, localId, token, product) {
    return this.http.put(`${url}/${localId}/productos.json`, product);
  }

  deleteProduct(url, localId, token, productid) {
    return this.http.delete(`${url}/${localId}/productos.json`, productid);
  }
}
