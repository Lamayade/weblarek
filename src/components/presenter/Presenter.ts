import {
    IEvents,
} from "../base/Events";
import {
    IUserApi,
    ICatalogModel,
    ICartModel,
    IUserModel,
    TPayment,
    IOrderResponse,
    IUserError,
    IProduct
} from "../../types";
import { IGallery } from "../views/Gallery";
import { IModal } from "../views/Modal";
import { IHeader } from "../views/Header";
import { ISuccessView } from "../views/Success";
import { ICartView } from "../views/Cart";
import { 
    CardCatalog,
 } from "../views/CardCatalog";
import {
    CardDetailed,
    ICardDetailedData,
} from "../views/CardDetailed";
import { CardCart } from "../views/CardCart";
import { FormPaymentAddress, IFormPaymentAddress } from "../views/FormPaymentAddress";
import { FormEmailPhone, IFormEmailPhone } from "../views/FormEmailPhone";
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
        private formPaymentAddress: IFormPaymentAddress,
        private formEmailPhone: IFormEmailPhone,
        private cardCatalogTemplate: HTMLElement,
        private cardCartTemplate: HTMLElement,
        private cardDetailed: CardDetailed<ICardDetailedData>,
    ) {
        // const cardDetailed = new CardDetailed
        this.loadCatalog();
        this.events.on('catalog:changed', () => {
            const products = this.catalog.getProducts();
            const elements = products.map(product => {
                const card = new CardCatalog(
                    this.cardCatalogTemplate.cloneNode(true) as HTMLElement,
                    { onClick: () => this.events.emit('card:select', product) }
                );
                const price = this.priceAsText(product.price);

                return card.render({
                    ...product,
                    price
                });
            });
            this.gallery.catalog = elements;
        });

        // this.events.on('card:select', (product: IProduct) => {
        //     // const product = this.catalog.getProductById(id);
        //     if (!product) return;

        //     const price = this.priceAsText(product.price);

        //     const element = this.cardDetailed.render({
        //         ...product,
        //         price,
        //     });
        //     this.cardDetailed.button = {
        //         isDisabled: product.price === null,
        //         mode:
        //             product.price === null
        //                 ? 'unavailable'
        //                 : this.cart.contains(product.id)
        //                 ? 'remove'
        //                 : 'add',
        //     };
        //     this.cardDetailed.text = product.description;
        //     this.cardDetailed.onClick = () => {
        //         this.events.emit('card:detailed-click', product);
        //     }; 
        //     this.modal.open(element);
        // });


        this.events.on('card:select', (product: IProduct) => {
            if (!product) return;
            this.catalog.setDetailedProduct(product);
        });

        this.events.on('catalog:detailedChanged', () => {
            const product = this.catalog.getDetailedProduct();
            if (!product) return;
            // const card = new CardDetailed(
            //         this.cardDetailedTemplate,
            //         { onClick: () => this.events.emit('card:detailed-click', product) }
            //     );
            
            // const price = this.priceAsText(product.price);
            // card.button = {
            //     isDisabled: product.price === null,
            //     mode:
            //         product.price === null
            //             ? 'unavailable'
            //             : this.cart.contains(product.id)
            //             ? 'remove'
            //             : 'add',
            // };
            // card.text = product.description;

            // const product = this.catalog.getProductById(id);

            const price = this.priceAsText(product.price);
            
            const element = this.cardDetailed.render({
                ...product,
                price,
            });
            this.updateDetailedButton(product);
            this.cardDetailed.text = product.description;
            this.modal.open(element);
        });


        this.events.on('card:detailed-click', () => {
            const product = this.catalog.getDetailedProduct();
            if (!product) return;
            this.cart.contains(product.id)
                ? this.cart.removeProduct(product)
                : this.cart.addProduct(product)
        });

        this.events.on('cart:open-click', () => {
            this.modal.open(this.cartView.container);
        });
        this.events.on('cart:card-delete-click', (product: IProduct) => {
            if (!product) return;
            this.cart.removeProduct(product);
        });

        this.events.on('cart:changed', () => {
            const detailedProduct = this.catalog.getDetailedProduct();
            if (detailedProduct) {
                this.updateDetailedButton(detailedProduct);
            }
            const items = this.cart.getProducts().map((product, index) => {
                const item = new CardCart(
                    this.cardCartTemplate.cloneNode(true) as HTMLElement,
                    { onClick: () => this.events.emit('cart:card-delete-click', product) }
                );

                // item.id = product.id;
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

    private updateDetailedButton(product: IProduct): void {
    this.cardDetailed.button = {
        isDisabled: product.price === null,
        mode: product.price === null
            ? 'unavailable'
            : this.cart.contains(product.id)
            ? 'remove'
            : 'add',
    };
}
}