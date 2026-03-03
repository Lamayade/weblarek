import {
    Component,
} from "../base/Component";
import {
    IForm,
    IUserError
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

    set errors(value: IUserError) {
        this._errors.textContent = Object.values(value).filter(
            (v): v is string => !!v
        ).join('\n');
    }

    set isValid(value: boolean) {
        this._submitButton.disabled = !value;
    }
}
