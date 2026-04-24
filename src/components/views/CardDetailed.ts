import {
    IEvents,
} from "../base/Events";
import {
    ICardDetailed,
} from "../../types";
import { IProduct } from "../../types";
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
    private _product: IProduct | null = null;

    constructor(container: HTMLElement, private events: IEvents) {
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
            if (this._product) {
                if (this._isInCart) {
                    this.events.emit('card:removed', { product: this._product });
                } else {
                    this.events.emit('card:added', { product: this._product });
                }
            }
        });
    }

    set product(product: IProduct) {
        this._product = product;
    }

    public set text(value: string) {
        this._text.textContent = value;
    }

    public get text(): string {
        return this._text.textContent ?? '';
    }

    public set isInCart(value: boolean) {
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

    public get isInCart(): boolean {
        return this._isInCart;
    }
}