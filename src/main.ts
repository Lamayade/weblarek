import { EventEmitter } from './components/base/Events';
import { Api } from './components/base/Api';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Catalog } from './components/models/Catalog';
import { Cart } from './components/models/Cart';
import { User } from './components/models/User';
import { UserApi } from './components/models/UserApi';
import { HeaderView } from './components/views/Header';
import { GalleryView } from './components/views/Gallery';
import { ModalView } from './components/views/Modal';
import { SuccessView } from './components/views/Success';
import { FormPaymentAddressView } from './components/views/FormPaymentAddress';
import { FormEmailPhoneView } from './components/views/FormEmailPhone';
import { CartView } from './components/views/Cart';
import { CardCatalogView } from './components/views/CardCatalog';
import { CardDetailedView } from './components/views/CardDetailed';
import { CardCartView } from './components/views/CardCart';
import {
    TPayment,
    IProduct,
    IUserError,
} from "./types";
import { 
    API_URL,
    ERROR_NO_API_RESPONSE,
 } from './utils/constants';
import './scss/styles.scss';


const events = new EventEmitter();
const api = new Api(API_URL);

const catalog = new Catalog(events);
const cart = new Cart(events);
const user = new User(events);
const userApi = new UserApi(api);

const modal = new ModalView(
    ensureElement<HTMLElement>('#modal-container'),
);

const header = new HeaderView(
    ensureElement<HTMLElement>('.header'),
    events,
);

const gallery = new GalleryView(
    ensureElement<HTMLElement>('.gallery'),
);

const success = new SuccessView(
    cloneTemplate('#success') as HTMLElement,
    events,
)

const formPaymentAddress = new FormPaymentAddressView(
    cloneTemplate('#order') as HTMLFormElement,
    events,
);

const formEmailPhone = new FormEmailPhoneView(
    cloneTemplate('#contacts') as HTMLFormElement,
    events,
);

const cartView = new CartView(
    cloneTemplate('#basket') as HTMLElement,
    events,
);

const cardDetailed = new CardDetailedView(
    cloneTemplate('#card-preview') as HTMLElement,
    events,
);

const cardCatalogTemplate = cloneTemplate('#card-catalog') as HTMLElement;
const cardCartTemplate = cloneTemplate('#card-basket') as HTMLElement;


function formatUserErrors(errors: Partial<Record<keyof IUserError, string>>): string {
    const errorsToShow = Object.values(errors).filter(Boolean) as string[];
    if (errorsToShow.length === 0) return '';
    const first = errorsToShow[0];
    const rest = errorsToShow.slice(1).map(msg => 
        msg.charAt(0).toLowerCase() + msg.slice(1)
    );
    return [first, ...rest].join(', ');
}

function updateFormValidation(): void {
    const errors = user.validateUser();
    formPaymentAddress.render({
        errors: formatUserErrors({
            payment: errors.payment,
            address: errors.address,
        }),
        valid: !errors.payment && !errors.address,
    })
    formEmailPhone.render({
        errors: formatUserErrors({
            email: errors.email,
            phone: errors.phone,
        }),
        valid: !errors.email && !errors.phone,
    })
}


function updateDetailedButton(product: IProduct): void {
    cardDetailed.button = {
        isDisabled: product.price === null,
        mode: product.price === null
            ? 'unavailable'
            : cart.contains(product.id)
                ? 'remove'
                : 'add',
    }
}

events.on('catalog:changed', () => {
    const products = catalog.getProducts();
    const elements = products.map(product => {
        const card = new CardCatalogView(
            cardCatalogTemplate.cloneNode(true) as HTMLElement,
            { onClick: () => events.emit('card:select', product) }
        );
        return card.render({
            ...product,
        });
    });
    gallery.render({catalog: elements});
});

events.on('card:select', (product: IProduct) => {
    if (!product) return;
    catalog.setDetailedProduct(product);
});

events.on('catalog:detailedChanged', () => {
    const product = catalog.getDetailedProduct();
    if (!product) return;
    cardDetailed.render({
        ...product,
    });
    updateDetailedButton(product);
    modal.open(cardDetailed.container);
});

events.on('card:detailed-click', () => {
    const product = catalog.getDetailedProduct();
    if (!product) return;
    cart.contains(product.id)
        ? cart.removeProduct(product)
        : cart.addProduct(product)
    modal.close();
});

events.on('cart:open-click', () => {
    modal.open(cartView.container);
});

events.on('cart:card-delete-click', (product: IProduct) => {
    if (!product) return;
    cart.removeProduct(product);
});

events.on('cart:changed', () => {
    const detailedProduct = catalog.getDetailedProduct();
    if (detailedProduct) {
        updateDetailedButton(detailedProduct);
    }
    const items = cart.getProducts().map((product, index) => {
        const item = new CardCartView(
            cardCartTemplate.cloneNode(true) as HTMLElement,
            { onClick: () => events.emit('cart:card-delete-click', product) }
        );
        item.render({
            index: String(++index),
            title: product.title,
            price: product.price,
        });
        return item.container;
    });
    header.render({
        count: cart.getCount(),
    })
    cartView.render({
        list: items,
        total: cart.getTotalPrice(),
        disabled: cart.getCount() === 0,
    });
});

events.on('cart:confirm-click', () => {
    modal.open(formPaymentAddress.container);
});

events.on<{ payment: TPayment }>('payment:changed', (data) => {
    user.setUser({ payment: data.payment });
});

events.on<{ address: string }>('address:changed', (data) => {
    user.setUser({ address: data.address });
});

events.on<{ email: string }>('email:changed', (data) => {
    user.setUser({ email: data.email });
});
events.on<{ phone: string }>('phone:changed', (data) => {
    user.setUser({ phone: data.phone });
});

events.on('user:changed', () => {
    const userChanged = user.getUser();
    formPaymentAddress.render({
        payment: userChanged.payment,
        address: userChanged.address,
    });
    formEmailPhone.render({
        email: userChanged.email,
        phone: userChanged.phone,
    });
    updateFormValidation();
});

events.on('order:next', () => {
    modal.open(formEmailPhone.container);
});

events.on('order:submitted', async () => {
    const order = {
        ...user.getUser(),
        items: cart.getProducts().map(p => p.id),
        total: cart.getTotalPrice(),
    };
    try {
        const response = await userApi.post(order);
        cart.clear();
        user.clearUser();
        success.render({
            total: response.total,
        });
        modal.open(success.container);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(ERROR_NO_API_RESPONSE, error.message);
        } else {
            console.error(ERROR_NO_API_RESPONSE, error);
        }
    }
});

events.on('success:close', () => {
    modal.close();
});

async function load() {
    try {
        const data = await userApi.get();
        catalog.setProducts(data.items);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(ERROR_NO_API_RESPONSE, error.message);
        } else {
            console.error(ERROR_NO_API_RESPONSE, error);
        }
    }
}

load();




