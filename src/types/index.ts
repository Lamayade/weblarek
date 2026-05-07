export interface IUser {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export type IUserError = Partial<
  Record<keyof IUser, string>
>;

export interface IUserApi {
  get(): Promise<IProducts>;
  post(data: IOrderRequest): Promise<IOrderResponse>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IProducts {
  total: number;
  items: IProduct[];
}

export interface IOrderRequest extends IUser {
  total: number;
  items: string[];
}

export interface IOrderResponse {
  id: string;
  total: number;
}

export type TPayment = 
'card' |
'cash' |
null;


export type TBuyButtonState = {
  isDisabled: boolean;
  mode: 'add' |
        'remove' |
        'unavailable';
}