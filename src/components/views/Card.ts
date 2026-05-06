import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

export interface ICard {
    id: string;
    title: string;
    price: string;
}

export interface ICardActions {
    onClick?: () => void;
}

export abstract class Card<T extends ICard> extends Component<T> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;

    protected constructor(
        container: HTMLElement
    ) {
        super(container);

        this._title = ensureElement<HTMLElement>(
            '.card__title',
            this._container, 
        );

        this._price = ensureElement<HTMLElement>(
            '.card__price',
            this._container,
        );
    }


    public set title(value: string) {
        this._title.textContent = value;
    }

    public set price(value: string) {
        this._price.textContent = value;
    }
}