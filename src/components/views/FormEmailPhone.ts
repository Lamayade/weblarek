import {
    Form,
} from './Form';
import {
    IForm,
    IUser,
} from '../../types';
import {
    ERROR_NO_FORM_EMAIL_INPUT,
    ERROR_NO_FORM_PHONE_INPUT,
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

    set email(value: string) {
        this._emailInput.value = value;
    }

    set phone(value: string) {
        this._phoneInput.value = value;
    }

    get data(): Partial<IUser> {
        const form = this.container as HTMLFormElement;
        const formData = new FormData(form);
        return {
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
        }
    }
}
