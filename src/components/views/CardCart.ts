import { 
    ICardActions,
    ICardView,
    CardView,
 } from "./Card";
import { ensureElement } from "../../utils/utils";


export interface ICardCartView extends ICardView {
    index: string;
}


export class CardCartView extends CardView<ICardCartView>{
    private _indexElement: HTMLElement;
    private _deleteButton: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        actions?: ICardActions,
    ) {
        super(container);

        this._indexElement = ensureElement(
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
    }

    set index(value: string) {
        this._indexElement.textContent = value;
    }
}