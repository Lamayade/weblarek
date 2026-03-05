import {
    Form,
} from './Form';
import {
    IForm,
    TPayment,
} from '../../types';
import {
    errorNoFormCardButton,
    errorNoFormCashButton,
    errorNoFormAddressInput,
} from "../../utils/constants";


export class FormPaymentAddress extends Form<IForm> {
    private _cardButton: HTMLButtonElement;
    private _cashButton: HTMLButtonElement;
    private _addressInput: HTMLInputElement;

    constructor(container: HTMLElement) {
        super(container);

        const cardButton = this.container.querySelector<HTMLButtonElement>(
            '.order__buttons button[name="card"]'
        );
        if (cardButton === null) {
            throw new Error(errorNoFormCardButton);
        }
        this._cardButton = cardButton;
        this._cardButton.addEventListener('click', () =>{
            this.payment = 'card';
        });

        const cashButton = this.container.querySelector<HTMLButtonElement>(
            '.order__buttons button[name="cash"]'
        );
        if (cashButton === null) {
            throw new Error(errorNoFormCashButton);
        }
        this._cashButton = cashButton;
        this._cashButton.addEventListener('click', () =>{
            this.payment = 'cash';
        });

        const addressInput = this.container.querySelector<HTMLInputElement>(
            '.order__field input[name="address"]'
        );
        if (addressInput === null) {
            throw new Error(errorNoFormAddressInput);
        }
        this._addressInput = addressInput;


        
    }

    set payment(value: TPayment) {
        this._cardButton.classList.toggle('button_alt-active', value === 'card');
        this._cashButton.classList.toggle('button_alt-active', value === 'cash');
    }

    set address(value: string) {
        this._addressInput.value = value;
    }

    // get data(): Partial<IUser> {
    //     const formData = new FormData(this.container);
    //     return {
    //         payment: formData.get('payment') as TPayment,
    //         address: formData.get('address') as string,
    //     }
    // }
}