import {
    Form,
} from './Form';
import {
    IForm,
    IUser,
} from '../../types';
import {
    ERROR_NO_FORM_CARD_BUTTON,

} from "../../utils/constants";
import { findElement } from "../../utils/utils";


export class FormEmailTelephone extends Form<IForm> {
    private _emailInput: HTMLInputElement;
    private _phoneInput: HTMLInputElement;

    constructor(container: HTMLElement) {
        super(container);

        this._emailInput = findElement<HTMLInputElement>(
            this.container,
            '.order__field input[name="email"]',
            ERROR_NO_FORM_EMAIL_INPUT
        );
        this._phoneInput = findElement<HTMLInputElement>(
            this.container,
            '.order__field input[name="phone"]',
            ERROR_NO_FORM_PHONE_INPUT
        );
    }



        this._submitButton = findElement<HTMLButtonElement>(
            this.container,
            'modal__actions button[type="submit"]',
            ERROR_NO_FORM_SUBMIT_BUTTON
        );

        this._errorsElement = findElement<HTMLElement>(
            this.container,
            '.form__errors',
            ERROR_NO_FORM_ERRORS_CONTAINER
        );

        this._cardButton = findElement<HTMLButtonElement>(
            this.container,
            '.order__buttons button[name="card"]',
            ERROR_NO_FORM_CARD_BUTTON
        );
        this._cardButton.addEventListener('click', () =>{
            this.payment = 'card';
        });

        this._cashButton = findElement<HTMLButtonElement>(
            this.container,
            '.order__buttons button[name="cash"]',
            ERROR_NO_FORM_CASH_BUTTON
        );
        this._cashButton.addEventListener('click', () =>{
            this.payment = 'cash';
        });

        this._addressInput = findElement<HTMLInputElement>(
            this.container,
            '.order__field input[name="address"]',
            ERROR_NO_FORM_ADDRESS_INPUT
        );
    }

    set payment(value: TPayment) {
        this._cardButton.classList.toggle('button_alt-active', value === 'card');
        this._cashButton.classList.toggle('button_alt-active', value === 'cash');
    }

    set address(value: string) {
        this._addressInput.value = value;
    }

    get data(): Partial<IUser> {
        const form = this.container as HTMLFormElement;
        const formData = new FormData(form);
        return {
            payment: formData.get('payment') as TPayment,
            address: formData.get('address') as string,
        }
    }
}
