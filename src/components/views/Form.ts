import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

export interface IFormView {
    valid: boolean;
    errors: string;
}
export abstract class FormView<T extends IFormView> extends Component<T> {
    protected submitButton: HTMLButtonElement;
    protected errorsElement: HTMLElement | null;

    protected constructor(
        container: HTMLElement,
    ) {
        super(container);
        this.submitButton = ensureElement<HTMLButtonElement>(
            'button[type="submit"]',
            this.container,
        );
        this.errorsElement = ensureElement<HTMLButtonElement>(
            '.form__errors',
            this.container,
        );
    }

    protected set valid(value: boolean) {
        this.submitButton.disabled = !value;
    }

    protected set errors(value: string) {
        if (this.errorsElement) {
            this.errorsElement.textContent = value;
        }
    }
}
