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
    private textElement: HTMLElement;
    private buttonElement: HTMLButtonElement;

    public constructor(
        container: HTMLElement,
        private events: IEvents,
    ) {
        super(container);

        this.textElement = ensureElement<HTMLElement>(
            '.card__text',
            this.container,
        );

        this.buttonElement = ensureElement<HTMLButtonElement>(
            '.card__button',
            this.container,
        );

        this.buttonElement.addEventListener('click', () => {
            this.events.emit('card:detailed-click');
        });
    }

    public set button(value: TBuyButtonState) {
        this.buttonElement.disabled = value.isDisabled;
        this.buttonElement.textContent = MAP_TEXT_BUTTON[value.mode];
    }

    protected set text(value: string) {
        this.textElement.textContent = value;
    }
}