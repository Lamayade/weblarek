import {
    IEvents,
} from "../base/Events";
import {
    IUserApi,
    ICatalogModel,
    ICartModel,
    IUserModel,
    IGallery,
    TPayment,
    IOrderResponse,
    IUserError,
    IModal,
    IHeader,
    ISuccessView,
    ICartView
} from "../../types";
import { 
    CardCatalog,
 } from "../views/CardCatalog";
import {
    CardDetailed,
} from "../views/CardDetailed";
import { CardCart } from "../views/CardCart";
import { FormPaymentAddress } from "../views/FormPaymentAddress";
import { FormEmailPhone } from "../views/FormEmailPhone";
import {
    ERROR_NO_API_RESPONSE,
    TEXT_PRICE_APPENDIX,
    TEXT_PRICE_UNAVAILABLE,
    TEXT_SUCCESS_PREFIX,
} from "../../utils/constants";


export class Presenter {
    constructor(
        private events: IEvents,
        private catalog: ICatalogModel,
        private cart: ICartModel,
        private user: IUserModel,
        private userApi: IUserApi,
        private gallery: IGallery,
        private modal: IModal,
        private header: IHeader,
        private success: ISuccessView,
        private cartView: ICartView,
        private formPaymentAddress: FormPaymentAddress,
        private formEmailPhone: FormEmailPhone,
        private cardCatalogTemplate: HTMLElement,
        private cardCartTemplate: HTMLElement,
        private cardDetailed: CardDetailed,
    ) {
        this.loadCatalog();
        this.events.on('catalog:changed', () => {
            const products = this.catalog.getProducts();
            const elements = products.map(product => {
                const card = new CardCatalog(
                    this.cardCatalogTemplate.cloneNode(true) as HTMLElement,
                    this.events,
                );
                const price = this.priceAsText(product.price);

                return card.render({
                    ...product,
                    price
                });
            });
            this.gallery.catalog = elements;
        });

        this.events.on<{ id: string }>('card:select', ({id}) => {
            const product = this.catalog.getProductById(id);
            if (!product) return;

            const price = this.priceAsText(product.price);

            const element = this.cardDetailed.render({
                ...product,
                price,
            });
            this.cardDetailed.button = {
                isDisabled: product.price === null,
                mode:
                    product.price === null
                        ? 'unavailable'
                        : this.cart.contains(product.id)
                        ? 'remove'
                        : 'add',
            };
            this.cardDetailed.text = product.description;        
            this.modal.open(element);
        });

        this.events.on<{ id: string }>('card:detailed-click', ({id}) => {
            const product = this.catalog.getProductById(id);
            if (!product) return;
            this.cart.contains(id)
                ? this.cart.removeProduct(product)
                : this.cart.addProduct(product) 
        });

        this.events.on('cart:open-click', () => {
            this.modal.open(this.cartView.container);
        });
        this.events.on<{ id: string }>('cart:card-delete-click', ({ id }) => {
            const product = this.cart.getProducts().find(p => p.id === id);
            if (!product) return;
            this.cart.removeProduct(product);
            this.events.emit('cart:changed');
        });

        this.events.on('cart:changed', () => {
            const items = this.cart.getProducts().map((product, index) => {
                const item = new CardCart(
                    this.cardCartTemplate.cloneNode(true) as HTMLElement,
                    this.events,
                );

                item.id = product.id;
                item.index = ++index;
                item.title = product.title;
                item.price = this.priceAsText(product.price);

                return item.container;
            });

            this.header.count = this.cart.getCount();
            this.cartView.list = items;
            this.cartView.total = `${this.cart.getTotalPrice()} ${TEXT_PRICE_APPENDIX}`;
            this.cartView.disabled = this.cart.getCount() === 0;
        });

        this.events.on('cart:confirm-click', () => {
            this.modal.open(this.formPaymentAddress.container);
        });

        this.events.on<{ payment: TPayment }>('payment:changed', (data) => {
            this.user.setUser({ payment: data.payment });
        });

        this.events.on<{ address: string }>('address:changed', (data) => {
            this.user.setUser({ address: data.address });
        });

        this.events.on<{ email: string }>('email:changed', (data) => {
            this.user.setUser({ email: data.email });
        });
        this.events.on<{ phone: string }>('phone:changed', (data) => {
            this.user.setUser({ phone: data.phone });
        });

        this.events.on('user:changed', () => {
            const user = this.user.getUser();

            this.formPaymentAddress.payment = user.payment;
            this.formPaymentAddress.address = user.address;

            this.formEmailPhone.email = user.email;
            this.formEmailPhone.phone = user.phone;

            this.updateFormValidation();
        });

        this.events.on('order:next', () => {
            this.modal.open(this.formEmailPhone.container);
        });

        this.events.on('order:submitted', async () => {
            const order = {
                ...this.user.getUser(),
                items: this.cart.getProducts().map(p => p.id),
                total: this.cart.getTotalPrice(),
            };
            try {
                const response = await this.userApi.post(order);
                this.cart.clear();
                this.user.clearUser();
                this.events.emit('order:success', response);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(ERROR_NO_API_RESPONSE, error.message);
                } else {
                    console.error(ERROR_NO_API_RESPONSE, error);
                }
            }
            
        });

        this.events.on<IOrderResponse>('order:success', (response) => {
            this.success.total = `${TEXT_SUCCESS_PREFIX} ${response.total} ${TEXT_PRICE_APPENDIX}`;
            this.modal.open(this.success.container);

        })

        this.events.on('success:close', () => {
            this.modal.close();
        });

        
    }

    private async loadCatalog(): Promise<void> {
        try {
            const data = await this.userApi.get();
            this.catalog.setProducts(data.items);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(ERROR_NO_API_RESPONSE, error.message);
            } else {
                console.error(ERROR_NO_API_RESPONSE, error);
            }
        }
    }

    private formatErrors(errors: Partial<Record<keyof IUserError, string>>): string {
        const errorsToShow = Object.values(errors).filter(Boolean) as string[];
        if (errorsToShow.length === 0) return '';
        const first = errorsToShow[0];
        const rest = errorsToShow.slice(1).map(msg => 
            msg.charAt(0).toLowerCase() + msg.slice(1)
        );
        return [first, ...rest].join(', ');
    }

    private updateFormValidation(): void {
        const errors = this.user.validateUser();
        this.formPaymentAddress.errors = this.formatErrors({
            payment: errors.payment,
            address: errors.address,
        });
        this.formEmailPhone.errors = this.formatErrors({
            email: errors.email,
            phone: errors.phone,
        });
        this.formPaymentAddress.valid = !errors.payment && !errors.address;
        this.formEmailPhone.valid = !errors.email && !errors.phone;
    }

    private priceAsText(value: number | null): string {
        if (value !== null) return `${value} ${TEXT_PRICE_APPENDIX}`;
        return TEXT_PRICE_UNAVAILABLE;
    }
}