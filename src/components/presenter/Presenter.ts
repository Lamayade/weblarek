import {
    IEvents,
} from "../base/Events";
import { cloneTemplate } from "../../utils/utils";
import { IProduct, TPayment } from "../../types";

import { Catalog } from "../models/Catalog";
import { Cart } from "../models/Cart";
import { User } from "../models/User";
import { UserApi } from "../models/UserApi";
import { Gallery } from "../views/Gallery";
import { Modal } from "../views/Modal";
import { FormPaymentAddress } from "../views/FormPaymentAddress";
import { FormEmailPhone } from "../views/FormEmailPhone";
import { CardDetailed } from "../views/CardDetailed";
import { CardCatalog } from "../views/CardCatalog";
import { CartView } from "../views/Cart";



export class Presenter {
    private cardDetailed: CardDetailed | null = null;

    constructor(
        private events: IEvents,
        private catalog: Catalog,
        private cart: Cart,
        private user: User,
        private userApi: UserApi,
        private gallery: Gallery,
        private modal: Modal,
        private cartView: CartView,
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
    }

    private bindCatalogEvents(): void {
        this.events.on('catalog:changed', () => {
            const products = this.catalog.getProducts();
            const elements = products.map(product => {
                const card = new CardCatalog(
                    cloneTemplate('#card-catalog') as HTMLElement
                );
                card.data = product;
                card.onClick = (id) => {
                    this.events.emit('card:select', { id });
                };
                return card.render();
            });
            this.gallery.catalog = elements;
        });

        this.events.on('catalog:previewChanged', () => {
            const product = this.catalog.getDetailedProduct();
            if (!product) return;

            const preview = cloneTemplate('#card-preview') as HTMLElement;
            this.cardDetailed = new CardDetailed(preview);
            this.cardDetailed.data = product;
            this.cardDetailed.isInCart = this.cart.contains(product.id);
            this.cardDetailed.onClickAdd = (product) => {
                this.events.emit('card:added', { product });
            };
            this.cardDetailed.onClickRemove = (product) => {
                this.events.emit('card:removed', { product });
            };
            this.modal.open(preview);
        });

        this.events.on<{ id: string }>('card:select', ({ id }) => {
            const product = this.catalog.getProductById(id);
            if (!product) return;
            this.catalog.setDetailedProduct(product);
        });

        this.events.on('cart:changed', () => {
            this.cartView.total = this.cart.getTotalPrice();
            if (this.cardDetailed && this.cardDetailed.product) {
                this.cardDetailed.isInCart = this.cart.contains(this.cardDetailed.product.id);
            }
        });
    }

    private bindCartEvents(): void {
        this.events.on<{ product: IProduct }>('card:added', ({ product }) => {
            this.cart.addProduct(product);
        });

        this.events.on<{ product: IProduct }>('card:removed', ({ product }) => {
            this.cart.removeProduct(product);
        });
    }

    private bindUserEvents(): void {
        this.events.on<{ payment: string }>('payment:changed', (data) => {
            this.user.set({ payment: data.payment as TPayment });
            this.updateFormValidation();
        });

        this.events.on<{ address: string }>('address:changed', (data) => {
            this.user.set({ address: data.address });
            this.updateFormValidation();
        });

        this.events.on<{ email: string }>('email:changed', (data) => {
            this.user.set({ email: data.email });
            this.updateFormValidation();
        });

        this.events.on<{ phone: string }>('phone:changed', (data) => {
            this.user.set({ phone: data.phone });
            this.updateFormValidation();
        });

        this.events.on('order:submitted', async () => {
            const errors = this.user.validate();
            this.formPayment.errors = errors;
            this.formContacts.errors = errors;
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

        this.events.on('order:next', () => {
            const errors = this.user.validate();
            if (Object.keys(errors).length === 0) {
                this.modal.open(this.formContacts.container);
            } else {
                this.formPayment.errors = errors;
            }
        });
    }

    private updateFormValidation(): void {
        const errors = this.user.validate();
        this.formPayment.errors = errors;
        this.formContacts.errors = errors;

        const paymentValid = this.user.get().payment !== null;
        const addressValid = this.user.get().address.trim() !== '';
        this.formPayment.isValid = paymentValid && addressValid;

        const emailValid = this.user.get().email.trim() !== '';
        const phoneValid = this.user.get().phone.trim() !== '';
        this.formContacts.isValid = emailValid && phoneValid;
    }
}