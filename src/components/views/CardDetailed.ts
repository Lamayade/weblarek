import {
    ICardDetailed,
    TBuyButtonState,
} from "../../types";
import {
    MAP_TEXT_BUTTON,
} from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { CardCatalog } from "./CardCatalog";


export class CardDetailed<T extends ICardDetailed = ICardDetailed> extends CardCatalog<T> {
    private _text: HTMLElement;
    private _button: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        events: IEvents,
    ) {
        super(container, events);

        this._text = ensureElement<HTMLElement>(
            '.card__text',
            this._container,
        );

        this._button = ensureElement<HTMLButtonElement>(
            '.card__button',
            this._container,
        );

        this._button.addEventListener('click', () => {
            this.events.emit(
                'card:detailed-click',
                {id: this.cardId},
            );
        });
    }

    public set button(value: TBuyButtonState) {
        this._button.disabled = value.isDisabled;
        this._button.textContent = MAP_TEXT_BUTTON[value.mode];
    }

    public set text(value: string) {
        this._text.textContent = value;
    }
}