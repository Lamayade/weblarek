import {
    IEvents,
} from "../base/Events";
import { IProduct } from "../../types";
import { Catalog } from "../models/Catalog";
import { Cart } from "../models/Cart";
import { User } from "../models/User";
import { UserApi } from "../models/UserApi";
import { Gallery } from "../views/Gallery";
import { Modal } from "../views/Modal";
import { FormPaymentAddress } from "../views/FormPaymentAddress";
import { FormEmailPhone } from "../views/FormEmailPhone";
import { CardDetailed } from "../views/CardDetailed";
import { Basket } from "../views/Basket";
import { CDN_URL, TEXT_PRICE_APPENDIX, TEXT_PRICE_UNAVAILABLE, TCategory } from "../../utils/constants";
import { cloneTemplate } from "../../utils/utils";


export class Presenter {
    constructor(
        private events: IEvents,
        private catalog: Catalog,
        private cart: Cart,
        private user: User,
        private userApi: UserApi,
        private gallery: Gallery,
        private modal: Modal,
        private basket: Basket,
        private formPayment: FormPaymentAddress,
        private formContacts: FormEmailPhone
    ) {
        this.bindCatalogEvents();
        this.bindCartEvents();
        this.bindUserEvents();
        this.loadCatalog();
    }

    private async loadCatalog(): Promise<void> {
        const data = await this.userApi.get();
        this.catalog.setProducts(data.items);
        this.events.emit('catalog:loaded', data.items);
    }

    private bindCatalogEvents(): void {
        let cardDetailed: CardDetailed | null = null;
        let currentProduct: IProduct | null = null;

        this.events.on('catalog:loaded', (products: IProduct[]) => {
            const elements = products.map(product => {
                const element = document.createElement('button');
                element.className = 'gallery__item card';
                element.innerHTML = `
                    <span class="card__category">${product.category}</span>
                    <h2 class="card__title">${product.title}</h2>
                    <img class="card__image" src="${CDN_URL}${product.image}" alt="" />
                    <span class="card__price">${product.price !== null ? product.price + TEXT_PRICE_APPENDIX : TEXT_PRICE_UNAVAILABLE}</span>
                `;
                element.addEventListener('click', () => {
                    currentProduct = product;
                    this.events.emit('card:selected', product);
                    this.catalog.setDetailedProduct(product);
                    const preview = cloneTemplate('#card-preview') as HTMLElement;
                    cardDetailed = new CardDetailed(preview, this.events);
                    cardDetailed.product = product;
                    cardDetailed.title = product.title;
                    cardDetailed.price = product.price;
                    cardDetailed.image = `${CDN_URL}${product.image}`;
                    cardDetailed.category = product.category as TCategory;
                    cardDetailed.text = product.description;
                    cardDetailed.isInCart = this.cart.contains(product.id);
                    this.modal.open(preview);
                });
                return element;
            });
            this.gallery.catalog = elements;
        });

        this.events.on('cart:changed', () => {
            if (cardDetailed && currentProduct) {
                cardDetailed.isInCart = this.cart.contains(currentProduct.id);
            }
        });
    }

    private bindCartEvents(): void {
        this.events.on<{ product: IProduct }>('card:added', ({ product }) => {
            this.cart.addProduct(product);
            this.events.emit('cart:changed', this.cart.getProducts());
        });

        this.events.on<{ product: IProduct }>('card:removed', ({ product }) => {
            this.cart.removeProduct(product);
            this.events.emit('cart:changed', this.cart.getProducts());
        });
    }

    private bindUserEvents(): void {
        this.events.on<{ payment: string }>('payment:changed', (data) => {
            this.user.set({ payment: data.payment as 'card' | 'cash' });
        });

        this.events.on<{ address: string }>('address:changed', (data) => {
            this.user.set({ address: data.address });
        });

        this.events.on<{ email: string }>('email:changed', (data) => {
            this.user.set({ email: data.email });
        });

        this.events.on<{ phone: string }>('phone:changed', (data) => {
            this.user.set({ phone: data.phone });
        });

        this.events.on('order:submitted', async () => {
            const errors = this.user.validate();
            if (Object.keys(errors).length === 0) {
                const order = {
                    ...this.user.get(),
                    items: this.cart.getProducts().map(p => p.id),
                    total: this.cart.getTotalPrice(),
                };
                await this.userApi.post(order);
                this.cart.clear();
                this.user.clear();
            }
        });
    }
}