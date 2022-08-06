export interface ProductModel {
    id: string;
    nombre: string;
    stock: string;
    precio: string;
    descripcion: string;
}

export interface ProductsState {
    success: boolean;
    data:ReadonlyArray<ProductModel>
}