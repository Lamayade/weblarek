import { Component } from "../base/Component";
import { IProduct } from "../../types";
import { findElement } from "../../utils/utils";
import { IEvents } from "../base/Events";


export class CardCart extends Component<IProduct> {
    private _deleteButton!: HTMLButtonElement;
    private _title!: HTMLElement;
    private _price!: HTMLElement;
    private _product!: IProduct;

    constructor(container: HTMLElement, private events: IEvents) {
        super(container);

        this._title = findElement(container, '.card__title', 'Название не найдено');
        this._price = findElement(container, '.card__price', 'Цена не найдена');
        this._deleteButton = container.querySelector('.card__button') as HTMLButtonElement;

        this._deleteButton.addEventListener('click', () => {
            this.events.emit('cart:productRemoved', { product: this._product });
        });
    }

    set product(value: IProduct) {
        this._product = value;
        this._title.textContent = value.title;
        this._price.textContent = value.price ? String(value.price) + ' ₽' : 'Бесплатно';
    }
}