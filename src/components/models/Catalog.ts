import { IProduct } from "../../types";


export class Catalog {
    private products: IProduct[] = [];
    private detailed: IProduct | null = null;


    public setProducts(products: IProduct[]): void {
        this.products = products;
    }

    public getProducts(): IProduct[] {
        return this.products;
    }

    public getProduct(id: string): IProduct | undefined {
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
