import { ActionReducerMap} from "@ngrx/store";
import { ProductsState } from "../models/product.model";
import { productsReducer } from "./reducers/products.reducers";



export interface AppState {
   
    data: ProductsState;
}


export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    data: productsReducer
}