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
import { cloneTemplate, ensureElement } from './utils/utils';
import { IProduct } from './types';
import './scss/styles.scss';

const events = new EventEmitter();
const api = new Api(API_URL);

const catalog = new Catalog(events);
const cart = new Cart(events);
const user = new User();
const userApi = new UserApi(api);

const modal = new Modal(
    ensureElement<HTMLElement>('#modal-container'),
    events
);
const header = new Header(
    ensureElement<HTMLElement>('.header'),
    events
);
const gallery = new Gallery(
    ensureElement<HTMLElement>('.gallery'),
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

events.on('cart:changed', () => {
    header.count = cart.getCount();
    cartView.items = cart.getProducts();
    cartView.total = cart.getTotalPrice();
});

new Presenter(
    events,
    catalog,
    cart,
    user,
    userApi,
    gallery,
    modal,
    cartView,
    formPaymentAddress,
    formEmailPhone,
);

(async () => {
    const data = await userApi.get();
    catalog.setProducts(data.items);
})();

events.on('cart:opened', () => {
    modal.open(cartView.container);
});

events.on('order:open', () => {
    formPaymentAddress.errors = {};
    formPaymentAddress.payment = null;
    formPaymentAddress.address = '';
    formPaymentAddress.isValid = false;
    modal.open(formPaymentAddress.container);
});

events.on('order:next', () => {
    formEmailPhone.errors = {};
    formEmailPhone.email = '';
    formEmailPhone.phone = '';
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