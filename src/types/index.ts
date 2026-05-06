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

export interface ICardData {
  id: string;
  title: string;
  price: string;
}

export interface ICatalogModel {
  setProducts(items: IProduct[]): void;
  getProducts(): IProduct[];
  getProductById(id: string): IProduct | undefined;
  setDetailedProduct(product: IProduct): void;
  getDetailedProduct(): IProduct | null;
}

export interface ICartModel {
  getProducts(): IProduct[];
  addProduct(product: IProduct): void;
  removeProduct(product: IProduct): void;
  clear(): void;
  getTotalPrice(): number;
  getCount(): number;
  contains(id: string): boolean;
}

export interface IUserModel {
  setUser(user: Partial<IUser>): void;
  clearUser(): void;
  getUser(): IUser;
  validateUser() : IUserError;
}

export interface ICardCatalogData extends ICardData {
  image: string;
  category: string;
}

export interface ICardDetailedData extends ICardCatalogData {
  text: string;
}

export interface IFormData {
  isValid: boolean;
  errors: IUserError;
}

export interface ICartCount {
  count: number;
}

export interface IGalleryData {
    catalog: HTMLElement[];
}

export interface ICartData {
    items: IProduct[];
    total: number;
}

export interface ISuccessViewData {
    total: string;
}

export interface ICart {
  items: IProduct[];
  total: number;
}

export interface IUserApi {
  get(): Promise<IProducts>;
  post(data: IOrderRequest): Promise<IOrderResponse>;
}