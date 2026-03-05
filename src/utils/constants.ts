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

export const errorNoPayment = 'Не указан вид оплаты';
export const errorNoEmail = 'Не указана почта';
export const errorNoPhone = 'Не указан номер телефона';
export const errorNoAddress = 'Не указан адрес';
export const errorNoCardTitle = 'Не найден HTML-элемент заголовка карточки с классом "card__title"';
export const errorNoCardPrice = 'Не найден HTML-элемент цены карточки с классом "card__price"';
export const errorNoCardImage = 'Не найден HTML-элемент изображения карточки с классом "card__image"';
export const errorNoCardCategory = 'Не найден HTML-элемент категории карточки с классом "card__category"';
export const errorNoCardText = 'Не найден HTML-элемент текста карточки с классом "card__text"';
export const errorNoCardButton = 'Не найден HTML-элемент кнопки карточки с классом "card__button"';
export const errorNoFormSubmitButton = 'Не найден HTML-элемент кнопки формы с классом "button"';
export const errorNoFormErrorsContainer = 'Не найден HTML-элемент контейнера ошибок формы с классом "form__errors"';
export const errorNoFormCashButton = 'Не найден HTML-элемент кнопки выбора типа оплаты с селектором ".order__buttons [name="cash"]"'; 
export const errorNoFormCardButton = 'Не найден HTML-элемент кнопки выбора типа оплаты с селектором ".order__buttons [name="card"]"';
export const errorNoFormAddressInput = 'Не найден HTML-элемент поля ввода адреса с классом "order__field"';

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


