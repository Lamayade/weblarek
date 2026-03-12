import { 
    errorNoCardText,
    errorNoCardButton,
    textButtonAddToCart,
    textButtonRemoveFromCart,
    textButtonUnavailable
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
            errorNoCardText
        );

        this._button = findElement<HTMLButtonElement>(
            this.container,
            '.card__button',
            errorNoCardButton
        );
    }

    protected set text(value: string) {
        this._text.textContent = value;
    }

    protected set isInCart(value: boolean) {
        this._isInCart = value;
        if (!this._isAvailable) {
            this._button.disabled = true;
            this._button.textContent = textButtonUnavailable;
        } else if (this._isInCart) {
            this._button.textContent = textButtonRemoveFromCart;
        } else {
            this._button.textContent = textButtonAddToCart;
        }
    }
}
