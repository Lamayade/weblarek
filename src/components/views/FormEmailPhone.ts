import {
    Form,
} from './Form';
import {
    IForm,
} from '../../types';
import {
    ERROR_NO_FORM_EMAIL_INPUT,
    ERROR_NO_FORM_PHONE_INPUT,
} from "../../utils/constants";
import {
    findElement
} from "../../utils/utils";
import {
    IEvents
} from '../base/Events';


export class FormEmailPhone extends Form<IForm> {
    private _emailInput: HTMLInputElement;
    private _phoneInput: HTMLInputElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        this._initSubmitButton(
            'button[type="submit"]'
        );
        this._initErrorsElement(
            '.form__errors'
        );

        this._emailInput = findElement<HTMLInputElement>(
            this._container,
            '.order__field input[name="email"]',
            ERROR_NO_FORM_EMAIL_INPUT
        );
        this._phoneInput = findElement<HTMLInputElement>(
            this._container,
            '.order__field input[name="phone"]',
            ERROR_NO_FORM_PHONE_INPUT
        );

        this._emailInput.addEventListener('input', () => {
            this.events.emit(
                'email:changed',
                {email: this._emailInput.value},
            );
        });
        this._phoneInput.addEventListener('input', () => {
            this.events.emit(
                'phone:changed',
                {phone: this._phoneInput.value},
            );
        });
        this.bindSubmit('order:submitted');
    }

    protected set email(value: string) {
        this._emailInput.value = value;
    }

    protected set phone(value: string) {
        this._phoneInput.value = value;
    }
}
