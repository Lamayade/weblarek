import { Component } from "../base/Component";
import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export interface ICartView {
    list: HTMLElement[];
    total: string;
    disabled: boolean;
    container: HTMLElement;
}

export interface ICartData {
    items: IProduct[];
    total: number;
}

export class CartView extends Component<ICartData> implements ICartView {
    private _listElement: HTMLElement;
    private _totalElement: HTMLElement;
    private _buttonElement: HTMLButtonElement;
    
    constructor(container: HTMLElement, private events: IEvents) {
        super(container);

        this._listElement = ensureElement<HTMLElement>(
            '.basket__list',
            this._container,
        );
        this._totalElement = ensureElement<HTMLElement>(
            '.basket__price',
            this._container,
        );
        this._buttonElement = ensureElement<HTMLButtonElement>(
            '.basket__button',
            this._container,
        );
        this._buttonElement.disabled = true;

        this._buttonElement.addEventListener('click', () => {
            this.events.emit('cart:confirm-click');
        });
    }

    set list(value: HTMLElement[]) {
        this._listElement.replaceChildren(...value);
    }

    set total(value: string) {
        this._totalElement.textContent = value;
    }

    set disabled(value: boolean) {
        this._buttonElement.disabled = value;
    }
}