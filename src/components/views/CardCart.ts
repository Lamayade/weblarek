import { Component } from "../base/Component";
import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
import { findElement } from "../../utils/utils";
import {
    TEXT_PRICE_APPENDIX,
    TEXT_PRICE_UNAVAILABLE,
    ERROR_NO_CARD_DELETE_BUTTON,
    ERROR_NO_CARD_TITLE,
    ERROR_NO_CARD_PRICE,
} from "../../utils/constants";


export class CardCart extends Component<IProduct> {
    private _deleteButton: HTMLButtonElement;
    private _title: HTMLElement;
    private _price: HTMLElement;
    private _product!: IProduct;

    constructor(container: HTMLElement, private events: IEvents) {
        super(container);

        this._title = findElement(
            this._container,
            '.card__title',
            ERROR_NO_CARD_TITLE
        );
        this._price = findElement(
            this._container,
            '.card__price',
            ERROR_NO_CARD_PRICE
        );
        this._deleteButton = findElement<HTMLButtonElement>(
            this._container,
            '.card__button',
            ERROR_NO_CARD_DELETE_BUTTON
        );

        this._deleteButton.addEventListener('click', () => {
            this.events.emit(
                'card:removed',
                { product: this._product }
            );
        });
    }

    set product(value: IProduct) {
        this._product = value;
        this._title.textContent = value.title;
        this._price.textContent = value.price !== null
            ? String(value.price) + TEXT_PRICE_APPENDIX
            : TEXT_PRICE_UNAVAILABLE;
    }
}