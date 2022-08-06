import { createReducer, on } from '@ngrx/store';
import { ProductModel, ProductsState } from '../../models/product.model';
import * as actions from '../actions/products.actions';

export const initialState: {
  success: boolean;
  data: ReadonlyArray<ProductModel>;
} = {
  success: false,
  data: [],
};

export const productsReducer = createReducer(
  initialState,
  on(actions.loadedProducts, (state, action) => {
    return {
      ...state,
      success: true,
      data: action.data,
    };
  }),

  on(actions.createProducts, (state, action: any) => {
    return {
      ...state,
      success: true,
      data: [...state.data, action],
    };
  }),
  on(actions.updateProducts, (state, action) => {
    const tmpIndex = state.data.findIndex((resp) => resp.id == action.id);
    var tmpState: any = state.data;
    tmpState[tmpIndex] = action.data;
    return {
      ...state,
      data: tmpState,
    };
  }),

  on(actions.deleteProducts, (state, action) => {
    const tmpState = state.data.filter((resp) => resp.id != action.id);
    return {
      ...state,
      data: tmpState,
    };
  })
);
