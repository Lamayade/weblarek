import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { TEXT_PRICE_POSTFIX,
         TEXT_PRICE_UNAVAILABLE
 } from "../../utils/constants";

export interface ICardView {
    title: string;
    price: number | null;
}

export interface ICardActions {
    onClick?: () => void;
}

export abstract class CardView<T extends ICardView> extends Component<T> {
    protected _titleElement: HTMLElement;
    protected _priceElement: HTMLElement;

    protected constructor(
        container: HTMLElement
    ) {
        super(container);

        this._titleElement = ensureElement<HTMLElement>(
            '.card__title',
            this.container, 
        );

        this._priceElement = ensureElement<HTMLElement>(
            '.card__price',
            this.container,
        );
    }


    protected set title(value: string) {
        this._titleElement.textContent = value;
    }

    protected set price(value: number | null) {
        this._priceElement.textContent =
            value !== null
                ? `${value} ${TEXT_PRICE_POSTFIX}`
                : TEXT_PRICE_UNAVAILABLE;
    }
}