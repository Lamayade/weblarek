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
import { findElement } from "../../utils/utils";

export abstract class Form<T extends IForm> extends Component<T> {
    protected _submitButton: HTMLButtonElement | null;
    protected _errorsElement: HTMLElement | null;

    constructor(container: HTMLElement) {
        super(container);
        this._submitButton = null;
        this._errorsElement = null;
    }

    protected _initSubmitButton(selector: string) {
        this._submitButton = findElement<HTMLButtonElement>(this.container, selector, errorNoFormSubmitButton);
    }

    protected _initErrorsElement(selector: string) {
        this._errorsElement = findElement<HTMLElement>(this.container, selector, errorNoFormErrorsContainer);
    }

    set errors(value: IUserError) {
        if (value && this._errorsElement) {
            const errorsToShow = Object.values(value).filter(Boolean);
            this._errorsElement.textContent = errorsToShow.join(', ');
        }
    }

    set isValid(value: boolean) {
        if (this._submitButton) {
            this._submitButton.disabled = !value;
        }
    }
}
