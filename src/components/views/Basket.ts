import { Component } from "../base/Component";
import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
import { CardCart } from "./CardCart";
import { cloneTemplate } from "../../utils/utils";

export class Basket extends Component<IProduct[]> {
    private _listElement!: HTMLElement;
    private _totalElement!: HTMLElement;
    private _buttonElement!: HTMLButtonElement;

    constructor(container: HTMLElement, private events: IEvents) {
        super(container);

        this._listElement = container.querySelector('.basket__list') as HTMLElement;
        this._totalElement = container.querySelector('.basket__price') as HTMLElement;
        this._buttonElement = container.querySelector('.basket__button') as HTMLButtonElement;

        this._buttonElement.addEventListener('click', () => {
            this.events.emit('order:open');
        });
    }

    set items(products: IProduct[]) {
        this._listElement.replaceChildren();
        products.forEach((product, index) => {
            const itemElement = cloneTemplate('#card-basket') as HTMLElement;
            const cardCart = new CardCart(itemElement, this.events);
            cardCart.product = product;
            itemElement.querySelector('.basket__item-index')!.textContent = String(index + 1);
            this._listElement.appendChild(itemElement);
        });
    }

    set total(value: number) {
        this._totalElement.textContent = `${value} синапсов`;
    }
}