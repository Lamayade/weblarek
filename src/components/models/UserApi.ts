import { 
    IApi, 
    IOrderRequest,
    IOrderResponse, 
    IProducts,
} from "../../types";
import {
    ROUTE_ORDER,
    ROUTE_PRODUCT,
} from "../../utils/constants";


export class UserApi {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }


    public async get(): Promise<IProducts> {
        return this.api.get<IProducts>(ROUTE_PRODUCT);
    }

    public async post(data: IOrderRequest): Promise<IOrderResponse> {
        return this.api.post(ROUTE_ORDER, data);
    }
}


