import {
    Form,
} from './Form';
import {
    IForm,
    TPayment,
} from '../../types';
import {
    ERROR_NO_FORM_CARD_BUTTON,
    ERROR_NO_FORM_CASH_BUTTON,
    ERROR_NO_FORM_ADDRESS_INPUT,
} from "../../utils/constants";
import { findElement } from "../../utils/utils";
import { IEvents } from '../base/Events';


export class FormPaymentAddress extends Form<IForm> {
    private _cardButton: HTMLButtonElement;
    private _cashButton: HTMLButtonElement;
    private _addressInput: HTMLInputElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        this._initSubmitButton('button[type="submit"]');
        this._initErrorsElement('.form__errors');

        this._cardButton = findElement<HTMLButtonElement>(
            this._container,
            '.order__buttons button[name="card"]',
            ERROR_NO_FORM_CARD_BUTTON
        );

        this._cashButton = findElement<HTMLButtonElement>(
            this._container,
            '.order__buttons button[name="cash"]',
            ERROR_NO_FORM_CASH_BUTTON
        );

        this._addressInput = findElement<HTMLInputElement>(
            this._container,
            '.order__field input[name="address"]',
            ERROR_NO_FORM_ADDRESS_INPUT
        );

        this._cardButton.addEventListener('click', () => {
            this._cashButton.classList.remove('button_alt-active');
            this._cardButton.classList.add('button_alt-active');
            this.events.emit(
                'payment:changed',
                { payment: 'card' }
            );
            this.updateValidation();
        });

        this._cashButton.addEventListener('click', () => {
            this._cardButton.classList.remove('button_alt-active');
            this._cashButton.classList.add('button_alt-active');
            this.events.emit(
                'payment:changed',
                { payment: 'cash' }
            );
            this.updateValidation();
        });

        this._addressInput.addEventListener('input', () => {
            this.events.emit(
                'address:changed',
                { address: this._addressInput.value }
            );
            this.updateValidation();
        });

        this.events.on('payment:changed', () => this.updateValidation());
        this.events.on('address:changed', () => this.updateValidation());

        this.bindSubmit('order:next');
    }

    private updateValidation(): void {
        const paymentSelected = this._cardButton.classList.contains('button_alt-active') ||
                               this._cashButton.classList.contains('button_alt-active');
        const addressFilled = this._addressInput.value.trim().length > 0;
        this.disableFormSubmit(!(paymentSelected && addressFilled));
    }

    set payment(value: TPayment) {
        this._cardButton.classList.toggle('button_alt-active', value === 'card');
        this._cashButton.classList.toggle('button_alt-active', value === 'cash');
    }

    set address(value: string) {
        this._addressInput.value = value;
    }
}