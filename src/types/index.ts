export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

export interface IUser {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

export type IUserError = Partial<
  Record<keyof IUser, string>
>;


export type TPayment = 'card' | 'cash' | null;

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

export interface ICard {
  title: string;
  price: number | null;
  isAvailable: boolean;
}

export interface ICardCatalog extends ICard {
  image: string;
  category: string;
}

export interface ICardDetailed extends ICardCatalog {
    text: string;
}

export interface IForm {
    isValid: boolean;
    errors: IUserError;
}

export interface ICartCount {
    count: number;
}

export interface IGallery {
    catalog: HTMLElement[];
}

export interface ICartView {
    items: IProduct[];
    total: number;
    disabled: boolean;
}