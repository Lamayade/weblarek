import {
    ICardDetailed,
    TBuyButtonState,
} from "../../types";
import {
    MAP_TEXT_BUTTON,
} from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Card } from "./Card";


export class CardDetailed<T extends ICardDetailed> extends Card<T> {
    private _text: HTMLElement;
    private _button: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        private events: IEvents,
    ) {
        super(container);

        this._text = ensureElement<HTMLElement>(
            '.card__text',
            this._container,
        );

        this._button = ensureElement<HTMLButtonElement>(
            '.card__button',
            this._container,
        );

        this._button.addEventListener('click', () => {
            this.events.emit('card:detailed-click');
        });
    }

    public set button(value: TBuyButtonState) {
        // if (!isAvailable) {
        //     this._button.disabled = true;
        //     this._button.textContent = TEXT_BUTTON_UNAVAILABLE;
        // } else if (isInCart) {
        //     this._button.textContent = TEXT_BUTTON_REMOVE_FROM_CART;
        // } else {
        //     this._button.textContent = TEXT_BUTTON_ADD_TO_CART;
        // }

        this._button.disabled = value.isDisabled;
        this._button.textContent = MAP_TEXT_BUTTON[value.mode];
    }

    public set text(value: string) {
        this._text.textContent = value;
    }
}