import {
    TBuyButtonState,
} from "../../types";
import {
    MAP_TEXT_BUTTON,
} from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { CardCatalog, ICardCatalogData } from "./CardCatalog";
import { IEvents } from "../base/Events";

export interface ICardDetailedData extends ICardCatalogData {
    text: string;
}

export interface ICardDetailed {
    button: TBuyButtonState;
    text: string;
}

export class CardDetailed<T extends ICardDetailedData> extends CardCatalog<T> implements ICardDetailed {
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

        // if (actions?.onClick) {
        //     this._button.addEventListener('click', actions.onClick);
        // }
                // 'card:detailed-click',

    }

    public set button(value: TBuyButtonState) {
        this._button.disabled = value.isDisabled;
        this._button.textContent = MAP_TEXT_BUTTON[value.mode];
    }

    public set text(value: string) {
        this._text.textContent = value;
    }
}