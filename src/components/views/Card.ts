import { Component } from "../base/Component";
import { ICard, IProduct } from "../../types";
import {
    ERROR_NO_CARD_TITLE,
    ERROR_NO_CARD_PRICE,
    TEXT_PRICE_APPENDIX,
    TEXT_PRICE_UNAVAILABLE,
} from "../../utils/constants";
import { findElement } from "../../utils/utils";


export abstract class Card<T extends ICard> extends Component<T> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _isAvailable: boolean = true;

    protected constructor(container: HTMLElement) {
        super(container);

        this._title = findElement<HTMLElement>(
            this._container,
            '.card__title',
            ERROR_NO_CARD_TITLE
        );

        this._price = findElement<HTMLElement>(
            this._container,
            '.card__price',
            ERROR_NO_CARD_PRICE
        );
    }

    public setData(product: IProduct): void {
        this.title = product.title;
        this.price = product.price;
    }

    public set title(value: string) {
        this._title.textContent = value;
    }

    public get title(): string {
        return this._title.textContent ?? '';
    }

    public set price(value: number | null) {
        this._isAvailable = value !== null;
        this._price.textContent = this._isAvailable
        ? value + TEXT_PRICE_APPENDIX
        : TEXT_PRICE_UNAVAILABLE;

    }

    public get price(): number | null {
        return this._isAvailable ? parseInt(this._price.textContent ?? '0') : null;
    } 
}