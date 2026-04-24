import { Component } from "../base/Component";
import { ICartCount } from "../../types";
import {
    ERROR_NO_HEADER_CART_BUTTON,
    ERROR_NO_HEADER_CART_COUNT,
} from "../../utils/constants";
import { findElement } from "../../utils/utils";
import { IEvents } from "../base/Events";


export class Header extends Component<ICartCount> {
    protected _cartButton: HTMLButtonElement;
    protected _countElement: HTMLElement;

    constructor(container: HTMLElement, private events:IEvents) {
        super(container);
        this._cartButton = findElement<HTMLButtonElement>(
            this._container,
            '.header__basket',
            ERROR_NO_HEADER_CART_BUTTON
        );
        this._countElement = findElement<HTMLElement>(
            this._container,
            '.header__basket-counter',
            ERROR_NO_HEADER_CART_COUNT
        );
        this._cartButton.addEventListener('click', () => {
            this.events.emit('cart:opened');
        })
    }

    set count(value: number) {
        this._countElement.textContent = String(value);
    }
}
    