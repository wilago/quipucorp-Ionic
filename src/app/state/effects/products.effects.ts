import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductosService } from 'src/app/services/productos.service';
import * as actions from '../actions/products.actions';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { ProductsState } from 'src/app/models/product.model';

@Injectable()
export class ProductsEffects {
  localId: string;
  constructor(
    private actions$: Actions,
    private productosService: ProductosService,
    private storage: Storage
  ) {
    this.getStorage();
  }

  async getStorage() {
    this.localId = await this.storage.get('localId');
  }

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.ProductActionTypes.LOAD_PRODUCT),
      mergeMap(() =>
        this.productosService
          .getProducts(environment.urlFirebase, this.localId)
          .pipe(
            map((productos: any) => actions.loadedProducts(productos)),
            catchError(() =>
              of({ type: '[Products API] Products Loaded Error' })
            )
          )
      )
    )
  );

  // pendiente de creacion
  // updateProducts$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(actions.updateProducts),
  //     mergeMap((products) =>
  //       this.productsService.updateProduct(products.id, products.data).pipe(
  //         map(
  //           (products) => actions.updatedProducts(),
  //           catchError(() => EMPTY)
  //         )
  //       )
  //     )
  //   )
  // );

  createProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.ProductActionTypes.CREATE_PRODUCT),
      mergeMap((products) =>
        this.productosService
          .createProduct(environment.urlFirebase, this.localId, products)
          .pipe(
            map(
              (products: any) => actions.createdProducts(products),
              catchError(() =>
                of({ type: '[Products API] Products Loaded Error' })
              )
            )
          )
      )
    )
  );

  /* pendiente creacion
  deleteProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.ProductActionTypes.DELETE_PRODUCT),
      mergeMap(({ id }) =>
        this.productsService.deleteProduct(id).pipe(
          map(
            (products) => actions.deletedProducts(),
            catchError(() => EMPTY)
          )
        )
      )
    )
  );

  */
}
