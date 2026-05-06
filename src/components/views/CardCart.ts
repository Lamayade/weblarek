import { 
    Card,
    ICardActions,
    ICardData,
 } from "./Card";
import { ensureElement } from "../../utils/utils";


// interface ICardCart extends ICardData {
//     index: number;
// }


export class CardCart<T extends ICardData> extends Card<T>{
    private _index: HTMLElement;
    private _deleteButton: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        actions?: ICardActions,
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

        if (actions?.onClick) {
            this._deleteButton.addEventListener('click', actions.onClick);
        }
                //  'cart:card-delete-click', 


    }

    set index(value: number) {
        this._index.textContent = String(value);
    }
}