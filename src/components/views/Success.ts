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
    private successDescriptionElement: HTMLElement;
    private successCloseButton: HTMLButtonElement;

    public constructor(
        container: HTMLElement,
        private events: IEvents,
    ) {
        super(container);

        this.successDescriptionElement = ensureElement<HTMLElement>(
            '.order-success__description',
            container,
        );

        this.successCloseButton = ensureElement<HTMLButtonElement>(
            '.order-success__close',
            container,
        );

        this.successCloseButton.addEventListener('click', () => {
            this.events.emit('success:close')
        });
    }

    protected set total(value: number) {
        this.successDescriptionElement.textContent = 
        `${TEXT_SUCCESS_PREFIX} ${String(value)} ${TEXT_PRICE_POSTFIX}`;
    }
}