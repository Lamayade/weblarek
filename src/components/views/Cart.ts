import { Component } from "../base/Component";
import { IProduct } from "../../types";
import { Cart } from "../models/Cart";
import { IEvents } from "../base/Events";
import { CardCart } from "./CardCart";
import { cloneTemplate, findElement } from "../../utils/utils";
import {
    ERROR_NO_BASKET_LIST,
    ERROR_NO_BASKET_PRICE,
    ERROR_NO_BASKET_BUTTON,
    TEXT_PRICE_APPENDIX,
} from "../../utils/constants";

export class CartView extends Component<IProduct[]> {
    private _listElement!: HTMLElement;
    private _totalElement!: HTMLElement;
    private _buttonElement!: HTMLButtonElement;

    constructor(container: HTMLElement, private events: IEvents, private cart: Cart) {
        super(container);

        this._listElement = findElement<HTMLElement>(
            this._container,
            '.basket__list',
            ERROR_NO_BASKET_LIST
        );
        this._totalElement = findElement<HTMLElement>(
            this._container,
            '.basket__price',
            ERROR_NO_BASKET_PRICE
        );
        this._buttonElement = findElement<HTMLButtonElement>(
            this._container,
            '.basket__button',
            ERROR_NO_BASKET_BUTTON
        );

        this._buttonElement.disabled = true;

        this._buttonElement.addEventListener('click', () => {
            this.events.emit('order:open');
        });

        this.events.on('cart:changed', () => {
            this.items = this.cart.getProducts();
            this.total = this.cart.getTotalPrice();
            this._buttonElement.disabled = this.cart.getProducts().length === 0;
        });
    }

    set items(products: IProduct[]) {
        this._listElement.replaceChildren();
        products.forEach((product, index) => {
            const itemElement = cloneTemplate('#card-basket') as HTMLElement;
            const cardCart = new CardCart(itemElement, this.events);
            cardCart.product = product;
            const indexElement = itemElement.querySelector('.basket__item-index');
            if (indexElement) {
                indexElement.textContent = String(index + 1);
            }
            this._listElement.appendChild(itemElement);
        });
    }

    set total(value: number) {
        this._totalElement.textContent = String(value) + TEXT_PRICE_APPENDIX;
    }
}