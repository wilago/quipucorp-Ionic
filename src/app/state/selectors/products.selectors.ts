import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";


export const selectProductsFeature = (state: AppState) => state.data


export const selectLoading = createSelector(
  selectProductsFeature,
  (state) => state.success
);


export const selectListProduct = createSelector(
  selectProductsFeature,
  (state) => state.data
);
