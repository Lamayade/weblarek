import {
    ERROR_NO_CARD_TEXT,
    ERROR_NO_CARD_BUTTON,
    TEXT_BUTTON_ADD_TO_CART,
    TEXT_BUTTON_REMOVE_FROM_CART,
    TEXT_BUTTON_UNAVAILABLE
} from "../../utils/constants";
import {
    ICardDetailed,
} from "../../types";
import { CardCatalog } from "./CardCatalog";
import { findElement } from "../../utils/utils";


export class CardDetailed extends CardCatalog<ICardDetailed> {
    private _text: HTMLElement;
    private _button: HTMLButtonElement;
    private _isInCart: boolean = false;

    constructor(container: HTMLElement) {
        super(container);

        this._text = findElement<HTMLElement>(
            this.container,
            '.card__text',
            ERROR_NO_CARD_TEXT
        );

        this._button = findElement<HTMLButtonElement>(
            this.container,
            '.card__button',
            ERROR_NO_CARD_BUTTON
        );
    }

    protected set text(value: string) {
        this._text.textContent = value;
    }

    protected set isInCart(value: boolean) {
        this._isInCart = value;
        if (!this._isAvailable) {
            this._button.disabled = true;
            this._button.textContent = TEXT_BUTTON_UNAVAILABLE;
        } else if (this._isInCart) {
            this._button.textContent = TEXT_BUTTON_REMOVE_FROM_CART;
        } else {
            this._button.textContent = TEXT_BUTTON_ADD_TO_CART;
        }
    }
}
