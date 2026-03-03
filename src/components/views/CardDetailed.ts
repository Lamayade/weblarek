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


export class CardDetailed extends CardCatalog<ICardDetailed> {
    private _text: HTMLElement;
    private _button: HTMLButtonElement;
    private _isInCart: boolean = false;

    constructor(container: HTMLElement) {
        super(container);

        const textElement = this.container.querySelector<HTMLElement>(
            '.card__text'
        );
        if (textElement === null) {
            throw new Error(errorNoCardText);
        }
        this._text = textElement;

        const cardButton = this.container.querySelector<HTMLButtonElement>(
            '.card__button'
        );
        if (cardButton === null) {
            throw new Error(errorNoCardButton);
        }
        this._button = cardButton;

    }

    protected set text(value: string) {
        this._text.textContent = value;
    }

    protected set isInCart(value: boolean) {
        this._isInCart = value;
        this.updateButtonState();
    }
    
    private updateButtonState() {
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
