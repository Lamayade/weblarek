import { 
    IOrderRequest,
    IOrderResponse, 
    IProducts,
} from "../../types";
import {
    ROUTE_ORDER,
    ROUTE_PRODUCT,
} from "../../utils/constants";
import { IApi } from "../base/Api";

export interface IUserApi {
  get(): Promise<IProducts>;
  post(data: IOrderRequest): Promise<IOrderResponse>;
}


export class UserApi {
    constructor(private api: IApi) {}


    public async get(): Promise<IProducts> {
        const data = await this.api.get<IProducts>(ROUTE_PRODUCT);
        return data;
    }

    public async post(data: IOrderRequest): Promise<IOrderResponse> {
        const response = await this.api.post<IOrderResponse>(ROUTE_ORDER, data);
        return response;
    }
}