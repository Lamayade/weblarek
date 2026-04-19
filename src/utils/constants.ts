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

export const textPriceAppendix = ' синапсов';
export const textPriceUnavailable = 'Бесценно';
export const textButtonAddToCart = 'Купить';
export const textButtonRemoveFromCart = 'Удалить из корзины';
export const textButtonUnavailable = 'Недоступно';

export const routeProduct = '/product/';
export const routeOrder = '/order/';

export const testPayment = 'card';
export const testEmail = 'new@user.com';
export const testPhone = '88005553535';
export const testAddress = '3-я улица Строителей, дом 25, квартира 12';


