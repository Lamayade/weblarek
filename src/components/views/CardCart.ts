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
    private indexElement: HTMLElement;
    private deleteButton: HTMLButtonElement;

    public constructor(
        container: HTMLElement,
        actions?: ICardActions,
    ) {
        super(container);

        this.indexElement = ensureElement(
            '.basket__item-index',
            this.container,
        );

        this.deleteButton = ensureElement<HTMLButtonElement>(
            '.card__button',
            this.container,
        );

        if (actions?.onClick) {
            this.deleteButton.addEventListener('click', actions.onClick);
        }
    }

    protected set index(value: string) {
        this.indexElement.textContent = value;
    }
}