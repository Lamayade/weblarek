import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

export interface IFormView {
    valid: boolean;
    errors: string;
}
export abstract class FormView<T extends IFormView> extends Component<T> {
    protected _submitButton: HTMLButtonElement;
    protected _errorsElement: HTMLElement | null;

    protected constructor(
        container: HTMLElement,
    ) {
        super(container);
        this._submitButton = ensureElement<HTMLButtonElement>(
            'button[type="submit"]',
            this._container,
        );
        this._errorsElement = ensureElement<HTMLButtonElement>(
            '.form__errors',
            this._container,
        );
    }

    set valid(value: boolean) {
        this._submitButton.disabled = !value;
    }

    set errors(value: string) {
        if (this._errorsElement) {
            this._errorsElement.textContent = value;
        }
    }
}
