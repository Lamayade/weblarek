import { IProduct } from "../../types";
import { EventEmitter } from "../base/Events";


export class Catalog extends EventEmitter {
    private products: IProduct[] = [];
    private detailed: IProduct | null = null;


    public setProducts(products: IProduct[]): void {
        this.products = products;
        this.emit('catalog:loaded')
    }

    public getProducts(): IProduct[] {
        return this.products;
    }

    public getProductById(id: string): IProduct | undefined {
        return this.products.find(
            product => product.id === id
        );
    }

    public setDetailedProduct(product: IProduct): void {
        this.detailed = product;
    }

    public getDetailedProduct(): IProduct | null {
        return this.detailed;
    }
}
