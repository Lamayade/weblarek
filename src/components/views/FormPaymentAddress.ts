import { ensureElement } from "../../utils/utils";
import { IEvents } from '../base/Events';
import { TPayment } from '../../types';
import { FormView, IFormView } from './Form';


export interface IFormPaymentAddressView extends IFormView {
    payment: TPayment;
    address: string;
}

export class FormPaymentAddressView extends FormView<IFormPaymentAddressView> {
    private _cardButton: HTMLButtonElement;
    private _cashButton: HTMLButtonElement;
    private _addressInput: HTMLInputElement;

    constructor(
        container:HTMLElement,
        private events: IEvents
    ) {
        super(container);


        this._cardButton = ensureElement<HTMLButtonElement>(
            '.order__buttons button[name="card"]',
            this._container,
        );

        this._cashButton = ensureElement<HTMLButtonElement>(
            '.order__buttons button[name="cash"]',
            this._container,
        );

        this._addressInput = ensureElement<HTMLInputElement>(
            '.order__field input[name="address"]',
            this._container,
        );

        this._cardButton.addEventListener('click', () => {
            this.events.emit(
                'payment:changed',
                {payment: 'card' as TPayment},
            );
        });

        this._cashButton.addEventListener('click', () => {
            this.events.emit(
                'payment:changed',
                {payment: 'cash' as TPayment},
            );
        });

        this._addressInput.addEventListener('input', () => {
            this.events.emit(
                'address:changed',
                {address: this._addressInput.value}
            );
        });

        this._container.addEventListener('submit', (e) => {
            e.preventDefault();
            this.events.emit(
                'order:next',
            );
        });
    }

    set payment(value: TPayment) {
        this._cardButton.classList.toggle('button_alt-active', value === 'card');
        this._cashButton.classList.toggle('button_alt-active', value === 'cash');
    }

    set address(value: string) {
        this._addressInput.value = value;
    }
}