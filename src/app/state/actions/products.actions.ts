import { Action, createAction, props } from "@ngrx/store";
import { ProductModel } from "../../models/product.model";

export enum ProductActionTypes {
  LOAD_PRODUCT = "[Products] Load success",
  LOADED_PRODUCT = "[Products] Loaded success",
  CREATE_PRODUCT = "[Products] Create success",
  CREATED_PRODUCT = "[Products] Created success",
  DELETE_PRODUCT = "[Products] Delete success",
  DELETED_PRODUCT = "[Products] Deleted success",
  UPDATE_PRODUCT = "[Products] Update success",
  UPDATED_PRODUCT = "[Products] Updated success",
}

export const loadProducts = createAction(ProductActionTypes.LOAD_PRODUCT);

export const loadedProducts = createAction(
  ProductActionTypes.LOADED_PRODUCT,
  props<{ data: ProductModel[] }>()
);

export const createProducts = createAction(
  ProductActionTypes.CREATE_PRODUCT,
  props<{ data: ProductModel }>()

);
export const createdProducts = createAction(
  ProductActionTypes.CREATED_PRODUCT,
  props<{ data: ProductModel }>()
);

export const updateProducts = createAction(
  ProductActionTypes.UPDATE_PRODUCT,
  props<{ id: string; data: ProductModel }>()
);

export const updatedProducts = createAction(ProductActionTypes.UPDATED_PRODUCT);

export const deleteProducts = createAction(
  ProductActionTypes.DELETE_PRODUCT,
  props<{ id: string }>()
);

export const deletedProducts = createAction(ProductActionTypes.DELETED_PRODUCT);
