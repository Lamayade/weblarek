import { Component } from "../base/Component";
import { ICard } from "../../types";
import {
    errorNoCardTitle,
    errorNoCardPrice,
    textPriceAppendix,
    textPriceUnavailable,
} from "../../utils/constants";
import { findElement } from "../../utils/utils";


export abstract class Card<T extends ICard> extends Component<T> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;
    protected _isAvailable: boolean = true;

    protected constructor(container: HTMLElement) {
        super(container);

        this._title = findElement<HTMLElement>(
            this.container,
            '.card__title',
            errorNoCardTitle
        );

        this._price = findElement<HTMLElement>(
            this.container,
            '.card__price',
            errorNoCardPrice
        );
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