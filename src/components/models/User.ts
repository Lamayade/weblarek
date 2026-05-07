import { 
    TPayment,
} from "../../types";
import { IEvents } from "../base/Events";

import {
    ERROR_NO_PAYMENT,
    ERROR_NO_EMAIL,
    ERROR_NO_PHONE,
    ERROR_NO_ADDRESS,
} from "../../utils/constants";
import { 
    IUser,
    IUserError,
} from "../../types";


export class User {
    private payment: TPayment = null;
    private email: string = '';
    private phone: string = '';
    private address: string = '';

    constructor(private events: IEvents) {}

    public setUser(user: Partial<IUser>): void {
        if (user.payment !== undefined) this.payment = user.payment;
        if (user.address !== undefined) this.address = user.address;
        if (user.email !== undefined) this.email = user.email;
        if (user.phone !== undefined) this.phone = user.phone;
        this.events.emit('user:changed');
    }

    public clearUser(): void {
        this.payment = null;
        this.email = '';
        this.phone = '';
        this.address = '';
        this.events.emit('user:changed');
    }

    public getUser(): IUser {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address
        }
    }

    public validateUser() : IUserError {
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
