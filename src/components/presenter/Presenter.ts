import {
    IEvents,
} from "../base/Events";
import {
    TViews,
} from "../../types";
import { Catalog } from "../models/Catalog";
import { Cart } from "../models/Cart";
import { User } from "../models/User";
import { UserApi } from "../models/UserApi";


export class Presenter {
    constructor(
        private events: IEvents,
        private catalog: Catalog,
        private cart: Cart,
        private user: User,
        private userApi: UserApi,
        private views: TViews
    ) {
        this.loadCatalog();
        this.bindViewEvents();
    }

    private async loadCatalog(): Promise<void> {
        const data = await this.userApi.get();
        this.catalog.setProducts(data.items);
        this.events.emit(
            'catalog:loaded',
            this.catalog.getProducts()
        )
    }

    private bindViewEvents(): void {
        // events.on('cart:open', () => {
        //     modal.open(cartView);
        // });

    }
}