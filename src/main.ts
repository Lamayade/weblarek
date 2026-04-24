import { EventEmitter } from './components/base/Events';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { Catalog } from './components/models/Catalog';
import { Cart } from './components/models/Cart';
import { User } from './components/models/User';
import { UserApi } from './components/models/UserApi';
import { Presenter } from './components/presenter/Presenter';
import { Header } from './components/views/Header';
import { Gallery } from './components/views/Gallery';
import { Modal } from './components/views/Modal';
import { FormPaymentAddress } from './components/views/FormPaymentAddress';
import { FormEmailPhone } from './components/views/FormEmailPhone';
import { Success } from './components/views/Success';
import { CartView } from './components/views/Cart';
import { cloneTemplate } from './utils/utils';
import './scss/styles.scss';

interface IProduct {
    id: string;
    title: string;
    price: number | null;
    category: string;
    image: string;
    description: string;
}

const events = new EventEmitter();
const api = new Api(API_URL);

const catalog = new Catalog();
const cart = new Cart();
const user = new User();
const userApi = new UserApi(api);

const modal = new Modal(
    document.getElementById('modal-container') as HTMLElement,
    events
);
const header = new Header(
    document.querySelector('.header') as HTMLElement,
    events
);
const gallery = new Gallery(
    document.querySelector('.gallery') as HTMLElement,
    events
);

const formPaymentAddress = new FormPaymentAddress(
    cloneTemplate('#order') as HTMLFormElement,
    events
);

const formEmailPhone = new FormEmailPhone(
    cloneTemplate('#contacts') as HTMLFormElement,
    events
);

const success = new Success(
    cloneTemplate('#success') as HTMLElement,
    events
);

const cartView = new CartView(
    cloneTemplate('#basket') as HTMLElement,
    events,
    cart
);

new Presenter(events, catalog, cart, user, userApi, gallery, modal, cartView, formPaymentAddress, formEmailPhone);

events.on<{ product: IProduct }>('card:selected', ({ product }) => {
    catalog.setDetailedProduct(product);
});

events.on('cart:opened', () => {
    cartView.items = cart.getProducts();
    cartView.total = cart.getTotalPrice();
    modal.open(cartView.container);
});

events.on<{ product: IProduct }>('card:added', () => {
    header.count = cart.getCount();
});

events.on<{ product: IProduct }>('card:removed', () => {
    header.count = cart.getCount();
});

events.on('order:open', () => {
    modal.open(formPaymentAddress.container);
});

events.on('order:next', () => {
    modal.open(formEmailPhone.container);
});

events.on('order:submitted', async () => {
    const order = {
        ...user.get(),
        items: cart.getProducts().map((p: IProduct) => p.id),
        total: cart.getTotalPrice(),
    };
    const response = await userApi.post(order);
    cart.clear();
    user.clear();
    success.total = response.total;
    modal.open(success.container);
});

events.on('success:close', () => {
    modal.close();
    header.count = cart.getCount();
});