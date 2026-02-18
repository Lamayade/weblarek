import { IProduct } from "../../types";


export class Cart {
    private products: IProduct[] = [];
    private totalPrice: number = 0;
    private count: number = 0;


    public getProducts(): IProduct[] {
        return this.products;
    }

    public addProduct(product: IProduct): void {
        this.products.push(product);
        this.totalPrice += product.price ?? 0;
        this.count += 1;
    }

    public removeProduct(product: IProduct): void {
        const idx = this.products.findIndex(
            curr => curr.id === product.id
        );
        if (idx !== -1) {
            this.products.splice(idx, 1);
            this.totalPrice -= product.price ?? 0;
            this.count -= 1;
        }
    }

    public clear(): void {
        this.products = [];
        this.totalPrice = 0;
        this.count = 0;
    }

    public getTotalPrice(): number {
        return this.totalPrice;
    }

    public getCount(): number {
        return this.count;
    }

    public contains(id: string): boolean {
        return this.products.some(
            product => product.id === id
        );
    }
}