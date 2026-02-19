import { 
    IUser,
    IUserError,
    TPayment,
} from "../../types";

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

    public set(user: Partial<IUser>): void {
        Object.assign(this, user);
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

    public validate() : IUserError {
        const errors: IUserError = {};

        if (this.payment === null) {
            errors.payment = errorNoPayment;
        }
        if (this.email === '') {
            errors.email = errorNoEmail;
        }
        if (this.phone === '') {
            errors.phone = errorNoPhone;
        }
        if (this.address === '') {
            errors.address = errorNoAddress;
        }

        return errors;
    }

    
}
