import { ensureElement } from "../../utils/utils";
import { IEvents } from '../base/Events';
import { TPayment } from '../../types';
import { FormView, IFormView } from './Form';


export interface IFormPaymentAddressView extends IFormView {
    payment: TPayment;
    address: string;
}

export class FormPaymentAddressView extends FormView<IFormPaymentAddressView> {
    private cardButton: HTMLButtonElement;
    private cashButton: HTMLButtonElement;
    private addressInput: HTMLInputElement;

    public constructor(
        container:HTMLElement,
        private events: IEvents
    ) {
        super(container);


        this.cardButton = ensureElement<HTMLButtonElement>(
            '.order__buttons button[name="card"]',
            this.container,
        );

        this.cashButton = ensureElement<HTMLButtonElement>(
            '.order__buttons button[name="cash"]',
            this.container,
        );

        this.addressInput = ensureElement<HTMLInputElement>(
            '.order__field input[name="address"]',
            this.container,
        );

        this.cardButton.addEventListener('click', () => {
            this.events.emit(
                'payment:changed',
                {payment: 'card' as TPayment},
            );
        });

        this.cashButton.addEventListener('click', () => {
            this.events.emit(
                'payment:changed',
                {payment: 'cash' as TPayment},
            );
        });

        this.addressInput.addEventListener('input', () => {
            this.events.emit(
                'address:changed',
                {address: this.addressInput.value}
            );
        });

        this.container.addEventListener('submit', (e) => {
            e.preventDefault();
            this.events.emit(
                'order:next',
            );
        });
    }

    protected set payment(value: TPayment) {
        this.cardButton.classList.toggle('button_alt-active', value === 'card');
        this.cashButton.classList.toggle('button_alt-active', value === 'cash');
    }

    protected set address(value: string) {
        this.addressInput.value = value;
    }
}