import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export interface IHeaderView {
    count: number;
}

export class HeaderView extends Component<IHeaderView> {
    protected _cartButton: HTMLButtonElement;
    protected _countElement: HTMLElement;

    constructor(container: HTMLElement, private events:IEvents) {
        super(container);
        this._cartButton = ensureElement<HTMLButtonElement>(
            '.header__basket',
            this._container,
        );
        this._countElement = ensureElement<HTMLElement>(
            '.header__basket-counter',
            this._container,
        );
        this._cartButton.addEventListener('click', () => {
            this.events.emit('cart:open-click');
        })
    }

    set count(value: number) {
        this._countElement.textContent = String(value);
    }
}
