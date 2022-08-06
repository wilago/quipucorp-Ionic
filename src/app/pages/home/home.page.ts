import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { loadProducts } from 'src/app/state/actions/products.actions';
import {
  selectListProduct,
  selectLoading,
} from 'src/app/state/selectors/products.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  productos;
  localId;
  loading;
  constructor(
    private produtosService: ProductosService,
    private storage: Storage,
    private store: Store<any>
  ) {}

  async ngOnInit() {
    this.store.dispatch(loadProducts());

    this.store.select(selectListProduct).subscribe((resp) => {
      this.productos = resp;
    });
  }
}
