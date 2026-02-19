import { 
    IApi, 
    IOrderRequest,
    IOrderResponse, 
    IProducts,
} from "../../types";
import {
    routeOrder, 
    routeProduct,
} from "../../utils/constants";


export class UserApi {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }


    public async get(): Promise<IProducts> {
        return this.api.get<IProducts>(routeProduct);
    }

    public async post(data: IOrderRequest): Promise<IOrderResponse> {
        return this.api.post(routeOrder, data);
    }
}


