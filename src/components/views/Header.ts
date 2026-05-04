import { Component } from "../base/Component";
import { ICartCount, IHeader } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";


export class Header extends Component<ICartCount> implements IHeader {
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
