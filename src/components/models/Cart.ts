import { IProduct } from "../../types";
import { EventEmitter } from "../base/Events";


export class Cart extends EventEmitter {
    private products: IProduct[] = [];


    public getProducts(): IProduct[] {
        return this.products;
    }

    public addProduct(product: IProduct): void {
        this.products.push(product);
        this.emit('cart:productAdded', { product });
    }

    public removeProduct(product: IProduct): void {
        const idx = this.products.findIndex(
            curr => curr.id === product.id
        );
        if (idx !== -1) {
            this.products.splice(idx, 1);
            this.emit('cart:productRemoved', { product });
        }
    }

    public clear(): void {
        this.products = [];
        this.emit('cart:cleared');
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