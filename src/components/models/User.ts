import { 
    IUser,
    IUserError,
    TPayment,
} from "../../types";
import { EventEmitter } from "../base/Events";

import {
    ERROR_NO_PAYMENT,
    ERROR_NO_EMAIL,
    ERROR_NO_PHONE,
    ERROR_NO_ADDRESS,
} from "../../utils/constants";


export class User extends EventEmitter {
    private payment: TPayment = null;
    private email: string = '';
    private phone: string = '';
    private address: string = '';

    public set(user: Partial<IUser>): void {
        Object.assign(this, user);
        this.emit('user:changed', this.get());
    }

    public clear(): void {
        this.payment = null;
        this.email = '';
        this.phone = '';
        this.address = '';
        this.emit('user:changed', this.get());
    }

    public get(): IUser {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address
        }
    }

    public validate() : IUserError {
        const errors: IUserError = {};

        if (this.payment === null) {
            errors.payment = ERROR_NO_PAYMENT;
        }
        if (this.email === '') {
            errors.email = ERROR_NO_EMAIL;
        }
        if (this.phone === '') {
            errors.phone = ERROR_NO_PHONE;
        }
        if (this.address === '') {
            errors.address = ERROR_NO_ADDRESS;
        }

        return errors;
    }

    
}
