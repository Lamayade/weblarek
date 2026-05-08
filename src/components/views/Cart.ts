import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { TEXT_PRICE_POSTFIX } from "../../utils/constants";

export interface ICartView {
    list: HTMLElement[];
    total: number;
    disabled: boolean;
}

export class CartView extends Component<ICartView> {
    private listElement: HTMLElement;
    private totalElement: HTMLElement;
    private buttonElement: HTMLButtonElement;
    
    public constructor(container: HTMLElement, private events: IEvents) {
        super(container);

        this.listElement = ensureElement<HTMLElement>(
            '.basket__list',
            this.container,
        );
        this.totalElement = ensureElement<HTMLElement>(
            '.basket__price',
            this.container,
        );
        this.buttonElement = ensureElement<HTMLButtonElement>(
            '.basket__button',
            this.container,
        );
        this.buttonElement.disabled = true;
        this.buttonElement.addEventListener('click', () => {
            this.events.emit('cart:confirm-click');
        });
    }

    protected set list(value: HTMLElement[]) {
        this.listElement.replaceChildren(...value);
    }

    protected set total(value: number) {
        this.totalElement.textContent =  `${value} ${TEXT_PRICE_POSTFIX}`;
    }

    protected set disabled(value: boolean) {
        this.buttonElement.disabled = value;
    }
}