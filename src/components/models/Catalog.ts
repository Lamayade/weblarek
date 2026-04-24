import { IProduct } from "../../types";
import { IEvents } from "../base/Events";


export class Catalog {
    private products: IProduct[] = [];
    private detailed: IProduct | null = null;

    constructor(private events: IEvents) {}

    public setProducts(products: IProduct[]): void {
        this.products = products;
        this.events.emit('catalog:changed', products);
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
        this.events.emit('catalog:previewChanged', product);
    }

    public getDetailedProduct(): IProduct | null {
        return this.detailed;
    }
}
