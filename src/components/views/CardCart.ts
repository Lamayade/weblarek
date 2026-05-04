import { Card } from "./Card";
import { ensureElement } from "../../utils/utils";
import { ICard } from "../../types";
import { IEvents } from "../base/Events";


export class CardCart<T extends ICard> extends Card<T>{
    private _index: HTMLElement;
    private _deleteButton: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        private events: IEvents,
    ) {
        super(container);

        this._index = ensureElement(
            '.basket__item-index',
            this._container,
        );

        this._deleteButton = ensureElement<HTMLButtonElement>(
            '.card__button',
            this._container,
        );

        this._deleteButton.addEventListener('click', () => {
            this.events.emit(
                'cart:card-delete-click', 
                {id: this.cardId},
            );
        });

    }

    set index(value: number) {
        this._index.textContent = String(value);
    }
}