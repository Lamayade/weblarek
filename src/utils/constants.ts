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
export const ERROR_NO_GALLERY_CONTAINER = 'Не найден HTML-элемент контейнера галереи с классом "gallery"';
export const ERROR_NO_API_RESPONSE = 'Нет ответа от API';


export const TEXT_PRICE_APPENDIX = 'синапсов';
export const TEXT_PRICE_UNAVAILABLE = 'Бесценно';
export const TEXT_BUTTON_ADD_TO_CART = 'Купить';
export const TEXT_BUTTON_REMOVE_FROM_CART = 'Удалить из корзины';
export const TEXT_BUTTON_UNAVAILABLE = 'Недоступно';
export const TEXT_SUCCESS_PREFIX = 'Списано';


export const MAP_TEXT_BUTTON = {
  add: TEXT_BUTTON_ADD_TO_CART,
  remove: TEXT_BUTTON_REMOVE_FROM_CART,
  unavailable: TEXT_BUTTON_UNAVAILABLE,
}

export const ROUTE_PRODUCT = '/product/';
export const ROUTE_ORDER = '/order/';

export const TEST_PAYMENT = 'card';
export const TEST_EMAIL = 'new@user.com';
export const TEST_PHONE = '88005553535';
export const TEST_ADDRESS = '3-я улица Строителей, дом 25, квартира 12';


