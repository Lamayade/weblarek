import { IProduct } from "../../types";


export class Cart {
    private products: IProduct[] = [];


    public getProducts(): IProduct[] {
        return this.products;
    }

    public addProduct(product: IProduct): void {
        this.products.push(product);
    }

    public removeProduct(product: IProduct): void {
        const idx = this.products.findIndex(
            curr => curr.id === product.id
        );
        if (idx !== -1) {
            this.products.splice(idx, 1);
        }
    }

    public clear(): void {
        this.products = [];
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