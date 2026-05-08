
import { ensureElement } from "../../utils/utils";
import { IEvents } from '../base/Events';
import { FormView, IFormView } from './Form';


export interface IFormEmailPhoneView extends IFormView {
    email: string;
    phone: string;
}

export class FormEmailPhoneView extends FormView<IFormEmailPhoneView> {
    private emailInput: HTMLInputElement;
    private phoneInput: HTMLInputElement;

    public constructor(
        container: HTMLElement, 
        private events: IEvents,
    ) {
        super(container);

        this.emailInput = ensureElement<HTMLInputElement>(
            '.order__field input[name="email"]',
            this.container,
        );
        this.phoneInput = ensureElement<HTMLInputElement>(
            '.order__field input[name="phone"]',
            this.container,
        );
        this.emailInput.addEventListener('input', () => {
            this.events.emit(
                'email:changed',
                {email: this.emailInput.value},
            );
        });
        this.phoneInput.addEventListener('input', () => {
            this.events.emit(
                'phone:changed',
                {phone: this.phoneInput.value},
            );
        });
        this.container.addEventListener('submit', (e) => {
            e.preventDefault();
            this.events.emit(
                'order:submitted'
            );
        });
    }

    protected set email(value: string) {
        this.emailInput.value = value;
    }

    protected set phone(value: string) {
        this.phoneInput.value = value;
    }
}
