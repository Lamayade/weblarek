import { 
    IApi, 
    IOrderRequest,
    IOrderResponse, 
    IProducts,
} from "../../types";
import { EventEmitter } from "../base/Events";
import {
    ROUTE_ORDER,
    ROUTE_PRODUCT,
} from "../../utils/constants";


export class UserApi extends EventEmitter {
    private api: IApi;

    constructor(api: IApi) {
        super();
        this.api = api;
    }


    public async get(): Promise<IProducts> {
        const data = await this.api.get<IProducts>(ROUTE_PRODUCT);
        this.emit('api:getSuccess', data);
        return data;
    }

    public async post(data: IOrderRequest): Promise<IOrderResponse> {
        this.emit('api:postStart');
        const response = await this.api.post<IOrderResponse>(ROUTE_ORDER, data);
        this.emit('api:postSuccess', response);
        return response;
    }
}


