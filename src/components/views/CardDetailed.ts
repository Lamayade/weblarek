import { TBuyButtonState } from "../../types";
import { MAP_TEXT_BUTTON } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { ICardCatalogView } from "./CardCatalog";
import { IEvents } from "../base/Events";
import { CardCatalogView } from "./CardCatalog";


export interface ICardDetailedView extends ICardCatalogView {
    text: string;
    button: TBuyButtonState;
}

export class CardDetailedView extends CardCatalogView {
    private _textElement: HTMLElement;
    private _buttonElement: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        private events: IEvents,
    ) {
        super(container);

        this._textElement = ensureElement<HTMLElement>(
            '.card__text',
            this._container,
        );

        this._buttonElement = ensureElement<HTMLButtonElement>(
            '.card__button',
            this._container,
        );

        this._buttonElement.addEventListener('click', () => {
            this.events.emit('card:detailed-click');
        });
    }

    public set button(value: TBuyButtonState) {
        this._buttonElement.disabled = value.isDisabled;
        this._buttonElement.textContent = MAP_TEXT_BUTTON[value.mode];
    }

    public set text(value: string) {
        this._textElement.textContent = value;
    }
}