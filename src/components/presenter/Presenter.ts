import {
    IEvents,
} from "../base/Events";
import {
    IProduct,
    IUser,
    IUserError,
    TPayment,
} from "../../types";
import { Catalog } from "../models/Catalog";
import { Cart } from "../models/Cart";
import { User } from "../models/User";
import { UserApi } from "../models/UserApi";


export class Presenter {
    constructor(
        private events: IEvents,
        private catalog: Catalog,
        private cart: Cart,
        private user: User,
        private userApi: UserApi,
        private
    )
}