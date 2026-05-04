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
import { Success } from './components/views/Success';
import { FormPaymentAddress } from './components/views/FormPaymentAddress';
import { FormEmailPhone } from './components/views/FormEmailPhone';
import { CartView } from './components/views/Cart';
import { cloneTemplate, ensureElement } from './utils/utils';
import './scss/styles.scss';

const events = new EventEmitter();
const api = new Api(API_URL);

const catalog = new Catalog(events);
const cart = new Cart(events);
const user = new User(events);
const userApi = new UserApi(api);

const modal = new Modal(
    ensureElement<HTMLElement>('#modal-container'),
);
const header = new Header(
    ensureElement<HTMLElement>('.header'),
    events,
);
const gallery = new Gallery(
    ensureElement<HTMLElement>('.gallery'),
);

const success = new Success(
    cloneTemplate('#success') as HTMLElement,
    events,
)

const formPaymentAddress = new FormPaymentAddress(
    cloneTemplate('#order') as HTMLFormElement,
    events
);

const formEmailPhone = new FormEmailPhone(
    cloneTemplate('#contacts') as HTMLFormElement,
    events
);

const cartView = new CartView(
    cloneTemplate('#basket') as HTMLElement,
    events
);

const cardCatalogTemplate = cloneTemplate('#card-catalog') as HTMLElement;
const cardCartTemplate = cloneTemplate('#card-basket') as HTMLElement;
const cardDetailedTemplate = cloneTemplate('#card-preview') as HTMLElement;



const presenter = new Presenter(
    events,
    catalog,
    cart,
    user,
    userApi,
    gallery,
    modal,
    header,
    success,
    cartView,
    formPaymentAddress,
    formEmailPhone,
    cardCatalogTemplate,
    cardCartTemplate,
    cardDetailedTemplate,
);
