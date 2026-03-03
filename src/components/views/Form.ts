import {
    Component,
} from "../base/Component";
import {
    IForm,
} from "../../types";
import {
    errorNoFormSubmitButton,
    errorNoFormErrorsContainer,
} from "../../utils/constants";

export abstract class Form<T extends IForm> extends Component<T> {
    protected _submitButton: HTMLButtonElement;
    protected _errors: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        const buttonElement = this.container.querySelector<HTMLButtonElement>(
            'modal__actions button[type="submit"]'
        );
        if (buttonElement === null) {
            throw new Error(errorNoFormSubmitButton);
        }
        this._submitButton = buttonElement;
        const errorsElement = this.container.querySelector<HTMLElement>(
            '.form__errors'
        );
        if (errorsElement === null) {
            throw new Error(errorNoFormErrorsContainer);
        }
        this._errors = errorsElement;
    }

    set errors(value: string) {
        this._errors.textContent = value;
    }

    set isValid(value: boolean) {
        this._submitButton.disabled = !value;
    }
}
