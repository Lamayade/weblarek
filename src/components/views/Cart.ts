import { Component } from "../base/Component";
import { IProduct, ICartView } from "../../types";
import { IEvents } from "../base/Events";
import { cloneTemplate, findElement } from "../../utils/utils";
import {
    ERROR_NO_BASKET_LIST,
    ERROR_NO_BASKET_PRICE,
    ERROR_NO_BASKET_BUTTON,
    TEXT_PRICE_APPENDIX,
} from "../../utils/constants";

export class CartView extends Component<ICartView> {
    private _listElement!: HTMLElement;
    private _totalElement!: HTMLElement;
    private _buttonElement!: HTMLButtonElement;
    onCardRemove: (id: string) => void = () => {};

    constructor(container: HTMLElement, private events: IEvents) {
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

        this._buttonElement.addEventListener('click', () => {
            this.events.emit('order:open');
        });
    }

    set data(value: ICartView) {
        this.items = value.items;
        this.total = value.total;
        this.disabled = value.disabled;
    }

    set items(products: IProduct[]) {
        this._listElement.replaceChildren();
        products.forEach((product, index) => {
            const itemElement = cloneTemplate('#card-basket') as HTMLElement;
            const title = itemElement.querySelector('.card__title')!;
            const price = itemElement.querySelector('.card__price')!;
            const deleteButton = itemElement.querySelector('.card__button') as HTMLButtonElement;
            
            title.textContent = product.title;
            price.textContent = product.price !== null
                ? String(product.price) + TEXT_PRICE_APPENDIX
                : 'Бесплатно';

            deleteButton.addEventListener('click', () => {
                this.onCardRemove(product.id);
            });

            const indexElement = itemElement.querySelector('.basket__item-index')!;
            indexElement.textContent = String(index + 1);
            this._listElement.appendChild(itemElement);
        });
    }

    set total(value: number) {
        this._totalElement.textContent = String(value) + TEXT_PRICE_APPENDIX;
    }

    set disabled(value: boolean) {
        this._buttonElement.disabled = value;
    }
}