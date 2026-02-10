import { Product } from "./products.type";

export interface CartItem extends Product{
    cartId:string,
    quantity:number
}