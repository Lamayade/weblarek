import { 
    Card,
} from "./Card";
import { ensureElement } from "../../utils/utils";
import { ICard } from "../../types";
import { IEvents } from "../base/Events";


export class CardCart<T extends ICard> extends Card<T>{
    private _deleteButton: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        private events: IEvents,
    ) {
        super(container);

        this._deleteButton = ensureElement<HTMLButtonElement>(
            '.card__button',
            this._container,
        );

        this._deleteButton.addEventListener('click', () => {
            this.events.emit('card:cart-delete-click');
        });

    }

    // set product(value: IProduct) {
    //     this._title.textContent = value.title;
    //     this._price.textContent = value.price !== null
    //         ? String(value.price) + TEXT_PRICE_APPENDIX
    //         : TEXT_PRICE_UNAVAILABLE;
    // }
}