/* Константа для получения полного пути для сервера. Для выполнения запроса 
необходимо к API_URL добавить только ендпоинт. */
export const API_URL = `${import.meta.env.VITE_API_ORIGIN}/api/weblarek`; 

/* Константа для формирования полного пути к изображениям карточек. 
Для получения полной ссылки на картинку необходимо к CDN_URL добавить только название файла изображения,
которое хранится в объекте товара. */
export const CDN_URL = `${import.meta.env.VITE_API_ORIGIN}/content/weblarek`;

/* Константа соответствий категорий товара модификаторам, используемым для отображения фона категории. */
export const categoryMap = {
  'софт-скил': 'card__category_soft',
  'хард-скил': 'card__category_hard',
  'кнопка': 'card__category_button',
  'дополнительное': 'card__category_additional',
  'другое': 'card__category_other',
} as const;

export type TCategory = keyof typeof categoryMap;

export const settings = {

};

export const ERROR_NO_PAYMENT = 'Не указан вид оплаты';
export const ERROR_NO_EMAIL = 'Не указана почта';
export const ERROR_NO_PHONE = 'Не указан номер телефона';
export const ERROR_NO_ADDRESS = 'Не указан адрес';
export const ERROR_NO_CARD_TITLE = 'Не найден HTML-элемент заголовка карточки с классом "card__title"';
export const ERROR_NO_CARD_PRICE = 'Не найден HTML-элемент цены карточки с классом "card__price"';
export const ERROR_NO_CARD_IMAGE = 'Не найден HTML-элемент изображения карточки с классом "card__image"';
export const ERROR_NO_CARD_CATEGORY = 'Не найден HTML-элемент категории карточки с классом "card__category"';
export const ERROR_NO_CARD_TEXT = 'Не найден HTML-элемент текста карточки с классом "card__text"';
export const ERROR_NO_CARD_BUTTON = 'Не найден HTML-элемент кнопки карточки с классом "card__button"';
export const ERROR_NO_FORM_SUBMIT_BUTTON = 'Не найден HTML-элемент кнопки формы с классом "button"';
export const ERROR_NO_FORM_ERRORS_CONTAINER = 'Не найден HTML-элемент контейнера ошибок формы с классом "form__errors"';
export const ERROR_NO_FORM_CASH_BUTTON = 'Не найден HTML-элемент кнопки выбора типа оплаты с селектором ".order__buttons [name="cash"]"';
export const ERROR_NO_FORM_CARD_BUTTON = 'Не найден HTML-элемент кнопки выбора типа оплаты с селектором ".order__buttons [name="card"]"';
export const ERROR_NO_FORM_ADDRESS_INPUT = 'Не найден HTML-элемент поля ввода адреса с классом "order__field"';
export const ERROR_NO_FORM_EMAIL_INPUT = 'Не найден HTML-элемент поля ввода электронной почты с классом "order__field"';
export const ERROR_NO_FORM_PHONE_INPUT = 'Не найден HTML-элемент поля ввода телефона с классом "order__field"';
export const ERROR_NO_HEADER_CART_BUTTON = 'Не найден HTML-элемент кнопки корзины с классом "header__basket"';
export const ERROR_NO_HEADER_CART_COUNT = 'Не найден HTML-элемент счётчика корзины с классом "header__basket-counter"';
export const ERROR_NO_SUCCESS_DESCRIPTION = 'Не найден HTML-элемент описания успешного заказа с классом "order-success__description"';
export const ERROR_NO_SUCCESS_CLOSE_BUTTON = 'Не найден HTML-элемент кнопки закрытия с классом "order-success__close"';
export const ERROR_NO_GALLERY_CONTAINER = 'Не найден HTML-элемент контейнера галереи с классом "gallery"';
export const ERROR_NO_BASKET_LIST = 'Не найден HTML-элемент списка корзины с классом "basket__list"';
export const ERROR_NO_BASKET_PRICE = 'Не найден HTML-элемент цены корзины с классом "basket__price"';
export const ERROR_NO_BASKET_BUTTON = 'Не найден HTML-элемент кнопки корзины с классом "basket__button"';
export const ERROR_NO_MODAL_CONTENT = 'Не найден HTML-элемент контента модального окна с классом "modal__content"';
export const ERROR_NO_MODAL_CLOSE = 'Не найден HTML-элемент кнопки закрытия модального окна с классом "modal__close"';
export const ERROR_NO_CARD_DELETE_BUTTON = 'Не найден HTML-элемент кнопки удаления карточки с классом "card__button"';

export const TEXT_PRICE_APPENDIX = ' синапсов';
export const TEXT_PRICE_UNAVAILABLE = 'Бесценно';
export const TEXT_BUTTON_ADD_TO_CART = 'Купить';
export const TEXT_BUTTON_REMOVE_FROM_CART = 'Удалить из корзины';
export const TEXT_BUTTON_UNAVAILABLE = 'Недоступно';

export const ROUTE_PRODUCT = '/product/';
export const ROUTE_ORDER = '/order/';

export const TEST_PAYMENT = 'card';
export const TEST_EMAIL = 'new@user.com';
export const TEST_PHONE = '88005553535';
export const TEST_ADDRESS = '3-я улица Строителей, дом 25, квартира 12';


