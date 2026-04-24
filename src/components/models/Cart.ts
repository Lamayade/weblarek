import { IProduct } from "../../types";
import { IEvents } from "../base/Events";


export class Cart {
    private products: IProduct[] = [];

    constructor(private events: IEvents) {}

    public getProducts(): IProduct[] {
        return this.products;
    }

    public addProduct(product: IProduct): void {
        this.products.push(product);
        this.events.emit('cart:changed');
    }

    public removeProduct(product: IProduct): void {
        const idx = this.products.findIndex(
            curr => curr.id === product.id
        );
        if (idx !== -1) {
            this.products.splice(idx, 1);
            this.events.emit('cart:changed');
        }
    }

    public clear(): void {
        this.products = [];
        this.events.emit('cart:changed');
    }

    public getTotalPrice(): number {
        const total = this.products.reduce(
            (sum, product) => sum + (product.price ?? 0),
            0
        );
        return total;
    }

    public getCount(): number {
        return this.products.length;
    }

    public contains(id: string): boolean {
        return this.products.some(
            product => product.id === id
        );
    }
}