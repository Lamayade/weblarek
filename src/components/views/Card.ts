import { Component } from "../base/Component";
import { ICard } from "../../types";
import {
    errorNoCardTitle,
    errorNoCardPrice,
    textPriceAppendix,
    textPriceUnavailable,
} from "../../utils/constants";


export abstract class Card<T extends ICard> extends Component<T> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _isAvailable: boolean = true;

    protected constructor(container: HTMLElement) {
        super(container);

        const titleElement = this.container.querySelector<HTMLElement>(
            '.card__title'
        );
        if (titleElement === null) {
            throw new Error(errorNoCardTitle);
        }
        this._title = titleElement;

        const priceElement = this.container.querySelector<HTMLElement>(
            '.card__price'
        );
        if (priceElement === null) {
            throw new Error(errorNoCardPrice);
        }
        this._price = priceElement;
    }

    protected set title(value: string) {
        this._title.textContent = value;
    }

    protected set price(value: number | null) {
        this._isAvailable = value !== null;
        this._price.textContent = this._isAvailable
        ? value + textPriceAppendix
        : textPriceUnavailable;
        
    } 
}