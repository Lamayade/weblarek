import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { findElement } from "../../utils/utils";
import {
    ERROR_NO_SUCCESS_DESCRIPTION,
    ERROR_NO_SUCCESS_CLOSE_BUTTON,
    TEXT_PRICE_APPENDIX,
} from "../../utils/constants";

export interface ISuccess {
    total: number;
}

export class Success extends Component<ISuccess> {
    private _successDescriptionElement: HTMLElement;
    private _successCloseButton: HTMLButtonElement;

    constructor(container: HTMLElement, private events: IEvents) {
        super(container);

        this._successDescriptionElement = findElement<HTMLElement>(
            container,
            '.order-success__description',
            ERROR_NO_SUCCESS_DESCRIPTION
        );

        this._successCloseButton = findElement<HTMLButtonElement>(
            container,
            '.order-success__close',
            ERROR_NO_SUCCESS_CLOSE_BUTTON
        );

        this._successCloseButton.addEventListener('click', () => {
            this.events.emit('success:close');
        });
    }

    set total(value: number) {
        this._successDescriptionElement.textContent = `Списано ${value}` + TEXT_PRICE_APPENDIX;
    }
}