import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export interface IHeaderView {
    count: number;
}

export class HeaderView extends Component<IHeaderView> {
    protected cartButton: HTMLButtonElement;
    protected countElement: HTMLElement;

    public constructor(container: HTMLElement, private events:IEvents) {
        super(container);
        this.cartButton = ensureElement<HTMLButtonElement>(
            '.header__basket',
            this.container,
        );
        this.countElement = ensureElement<HTMLElement>(
            '.header__basket-counter',
            this.container,
        );
        this.cartButton.addEventListener('click', () => {
            this.events.emit('cart:open-click');
        })
    }

    protected set count(value: number) {
        this.countElement.textContent = String(value);
    }
}
