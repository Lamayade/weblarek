import { Api } from "../base/Api";
import { 
    IApi, 
    IOrderRequest,
    IOrderResponse, 
    IProduct, 
    IProducts 
} from "../../types";
import { 
    routeOrder, 
    routeProduct 
} from "../../utils/constants";

export class UserApi {
    private api: IApi;

    constructor(baseUrl: string, options: RequestInit = {}) {
        this.api = new Api(baseUrl, options);
    }


    public async get(id?: string): Promise<IProducts | IProduct> {
        if (id) {
            return this.api.get<IProduct>(routeProduct + id);
        }
        return this.api.get<IProducts>(routeProduct);
    }

    public async post(data: IOrderRequest): Promise<IOrderResponse> {
        return this.api.post(routeOrder, data);
    }
}


