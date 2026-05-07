import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { 
    TEXT_SUCCESS_PREFIX,
    TEXT_PRICE_POSTFIX
 } from "../../utils/constants";

export interface ISuccessView {
    total: number;
}

export class SuccessView extends Component<ISuccessView> {
    private _successDescriptionElement: HTMLElement;
    private _successCloseButton: HTMLButtonElement;

    constructor(
        container: HTMLElement,
        private events: IEvents,
    ) {
        super(container);

        this._successDescriptionElement = ensureElement<HTMLElement>(
            '.order-success__description',
            container,
        );

        this._successCloseButton = ensureElement<HTMLButtonElement>(
            '.order-success__close',
            container,
        );

        this._successCloseButton.addEventListener('click', () => {
            this.events.emit('success:close')
        });
    }

    set total(value: number) {
        this._successDescriptionElement.textContent = 
        `${TEXT_SUCCESS_PREFIX} ${String(value)} ${TEXT_PRICE_POSTFIX}`;
    }
}