import { IUser, TPayment } from "../../types";

import {
    errorNoPayment,
    errorNoEmail,
    errorNoPhone,
    errorNoAddress,
} from "../../utils/constants";


export class User {
    private payment: TPayment = null;
    private email: string = '';
    private phone: string = '';
    private address: string = '';

    public set(user: IUser): void {
        this.payment = user.payment;
        this.email = user.email;
        this.phone = user.phone;
        this.address = user.address;
    }

    public get(): IUser {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address
        }
    }

    public clear(): void {
        this.payment = null;
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    public validate() : Record<string, string> {
        const not_valid: Record<string, string> = {};

        if (this.payment === null) {
            not_valid.payment = errorNoPayment;
        }
        if (this.email === '') {
            not_valid.email = errorNoEmail;
        }
        if (this.phone === '') {
            not_valid.phone = errorNoPhone;
        }
        if (this.address === '') {
            not_valid.address = errorNoAddress;
        }

        return not_valid;
    }

    
}
