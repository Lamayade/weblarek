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

    set total(value: number) {
        this._totalElement.textContent =  `${value} ${TEXT_PRICE_POSTFIX}`;
    }

    set disabled(value: boolean) {
        this._buttonElement.disabled = value;
    }
}