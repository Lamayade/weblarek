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
};

export const settings = {

};

export const errorNoPayment = 'Не указан вид оплаты';
export const errorNoEmail = 'Не указана почта';
export const errorNoPhone = 'Не указан номер телефона';
export const errorNoAddress = 'Не указан адрес';
export const errorNotFound = 'NotFound';
export const errorProductNotFound = 'Товар с id c101ab44-ed99-4a54-990d-47aa2bb4e7d не найден';
export const errorWrongTotal = 'Неверная сумма заказа';
export const routeProduct = '/product/';
export const routeOrder = '/order/';
export const testPayment = 'card';
export const testEmail = 'new@user.com';
export const testPhone = '88005553535';
export const testAddress = '3-я улица Строителей, дом 25, квартира 12';


