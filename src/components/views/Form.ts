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
    protected _errorsElement: HTMLElement;

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
        this._errorsElement = errorsElement;
    }

    set errors(value: IUserError) {
        if (value) {
            const errorsToShow = Object.values(value).filter(Boolean);
            this._errorsElement.textContent = errorsToShow.join(', ');
        }
    }

    set isValid(value: boolean) {
        this._submitButton.disabled = !value;
    }
}
