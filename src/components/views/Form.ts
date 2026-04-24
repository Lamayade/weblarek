import {
    Component,
} from "../base/Component";
import {
    IForm,
    IUserError,
} from "../../types";
import {
    ERROR_NO_FORM_SUBMIT_BUTTON,
    ERROR_NO_FORM_ERRORS_CONTAINER,
} from "../../utils/constants";
import { findElement } from "../../utils/utils";
import { IEvents } from "../base/Events";

export abstract class Form<T extends IForm> extends Component<T> {
    protected _submitButton: HTMLButtonElement | null;
    protected _errorsElement: HTMLElement | null;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
        this._submitButton = null;
        this._errorsElement = null;
    }

    protected _initSubmitButton(selector: string) {
        this._submitButton = findElement<HTMLButtonElement>(
            this._container,
            selector,
            ERROR_NO_FORM_SUBMIT_BUTTON
        );
        this._submitButton.disabled = false;
    }

    protected _initErrorsElement(selector: string) {
        this._errorsElement = findElement<HTMLElement>(
            this._container,
            selector,
            ERROR_NO_FORM_ERRORS_CONTAINER
        );
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

    protected bindSubmit(event: string) {
        this._container.addEventListener('submit', (e) => {
            e.preventDefault();
            this.events.emit(event);
        });
    }

    protected disableFormSubmit(disabled: boolean) {
        if (this._submitButton) {
            this._submitButton.disabled = disabled;
        }
    }
}
