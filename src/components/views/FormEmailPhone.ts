import {
    IForm,
} from '../../types';
import {
    ensureElement
} from "../../utils/utils";
import {
    IEvents
} from '../base/Events';
import { Form } from './Form';


export class FormEmailPhone extends Form<IForm> {
    private _emailInput: HTMLInputElement;
    private _phoneInput: HTMLInputElement;

    constructor(
        container: HTMLElement, 
        private events: IEvents,
    ) {
        super(container);

        this._emailInput = ensureElement<HTMLInputElement>(
            '.order__field input[name="email"]',
            this._container,
        );
        this._phoneInput = ensureElement<HTMLInputElement>(
            '.order__field input[name="phone"]',
            this._container,
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
        this._container.addEventListener('submit', (e) => {
            e.preventDefault();
            this.events.emit(
                'order:submitted'
            );
        });
    }

    public set email(value: string) {
        this._emailInput.value = value;
    }

    public set phone(value: string) {
        this._phoneInput.value = value;
    }
}
