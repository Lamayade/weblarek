import {
    ICardDetailed,
    IProduct,
} from "../../types";
import {
    ERROR_NO_CARD_TEXT,
    ERROR_NO_CARD_BUTTON,
    TEXT_BUTTON_ADD_TO_CART,
    TEXT_BUTTON_REMOVE_FROM_CART,
    TEXT_BUTTON_UNAVAILABLE,
} from "../../utils/constants";
import { CardCatalog } from "./CardCatalog";
import { findElement } from "../../utils/utils";


export class CardDetailed extends CardCatalog<ICardDetailed> {
    private _text: HTMLElement;
    private _button: HTMLButtonElement;
    private _isInCart: boolean = false;
    onClickAdd: (id: string) => void = () => {};
    onClickRemove: (id: string) => void = () => {};

    constructor(container: HTMLElement) {
        super(container);

        this._text = findElement<HTMLElement>(
            this._container,
            '.card__text',
            ERROR_NO_CARD_TEXT
        );

        this._button = findElement<HTMLButtonElement>(
            this._container,
            '.card__button',
            ERROR_NO_CARD_BUTTON
        );

        this._button.addEventListener('click', () => {
            if (this._id) {
                if (this._isInCart) {
                    this.onClickRemove(this._id);
                } else {
                    this.onClickAdd(this._id);
                }
            }
        });
    }

    private updateButton(): void {
        if (!this._isAvailable) {
            this._button.disabled = true;
            this._button.textContent = TEXT_BUTTON_UNAVAILABLE;
        } else if (this._isInCart) {
            this._button.textContent = TEXT_BUTTON_REMOVE_FROM_CART;
        } else {
            this._button.textContent = TEXT_BUTTON_ADD_TO_CART;
        }
    }

    public set data(product: IProduct) {
        super.data = product;
        this.text = product.description;
    }

    public set isInCart(value: boolean) {
        this._isInCart = value;
        this.updateButton();
    }

    public set text(value: string) {
        this._text.textContent = value;
    }
}