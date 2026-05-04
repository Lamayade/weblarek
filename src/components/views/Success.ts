import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { ISuccessView } from "../../types";
import { IEvents } from "../base/Events";



export class Success extends Component<ISuccessView> implements ISuccessView {
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

    set total(value: string) {
        this._successDescriptionElement.textContent = value;
    }
}