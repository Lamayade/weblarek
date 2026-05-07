# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TypeScript, Vite

## Установка и запуск

```bash
npm install
npm run dev
```

Перейти по адресу http://localhost:5173/ (или по выведенному в консоль адресу) в браузере.

## Сборка

```bash
npm run build
```

# Интернет-магазин «Web-Larёk»

«Web-Larёk» — интернет-магазин с товарами для веб-разработчиков. Пользователи могут просматривать каталог, добавлять товары в корзину и оформлять заказы.

## Скриншоты
![Главная страница](screenshots/main.png)
![Окно товара с описанием](screenshots/detailed.png)
![Окно корзины](screenshots/cart.png)
![Окно формы](screenshots/form.png)
![Окно подтверждения заказа](screenshots/success.png)

---

## Архитектура приложения

Приложение построено на **событийно-ориентированной архитектуре** с использованием **EventEmitter** (паттерн Observer).

- **Model** — слой данных. Отвечает за хранение и изменение данных приложения (каталог товаров, корзина, данные покупателя).
- **View** — слой представления. Отвечает за отображение данных и получение пользовательского ввода. Хранит только DOM-элементы. Использует интерфейсы как generic-ограничения для типизации сеттеров.
- **main.ts** — точка входа, выступает связующим звеном. Создает экземпляры моделей и представлений, настраивает подписки на события.

Взаимодействие между компонентами реализовано через события:
1. View сообщает о действии пользователя через `events.emit()`
2. main.ts обрабатывает событие, обновляет Model
3. Model уведомляет об изменении через `events.emit()`
4. main.ts обновляет View

---

## Структура проекта

```
src/
├── components/
│   ├── base/                 # Базовые классы
│   │   ├── Api.ts                  # HTTP-запросы (класс Api)
│   │   ├── Component.ts            # Базовый компонент View (abstract Component<T>)
│   │   └── Events.ts               # Брокер событий (EventEmitter implements IEvents)
│   ├── models/               # Model слой
│   │   ├── Catalog.ts              # Каталог товаров (класс Catalog)
│   │   ├── Cart.ts                 # Корзина (класс Cart)
│   │   ├── User.ts                 # Данные покупателя (класс User)
│   │   └── UserApi.ts              # API для сервера (класс UserApi)
│   ├── views/                # View слой
│   │   ├── Card.ts                 # Базовый класс карточки (abstract CardView<T>)
│   │   ├── CardCatalog.ts          # Карточка в каталоге (CardCatalogView)
│   │   ├── CardCart.ts             # Карточка в корзине (CardCartView)
│   │   ├── CardDetailed.ts         # Открытая карточка (CardDetailedView)
│   │   ├── Cart.ts                 # Корзина - отображение (CartView)
│   │   ├── Form.ts                 # Базовый класс формы (abstract FormView<T>)
│   │   ├── FormEmailPhone.ts       # Форма email/телефона (FormEmailPhoneView)
│   │   ├── FormPaymentAddress.ts   # Форма оплаты/адреса (FormPaymentAddressView)
│   │   ├── Gallery.ts              # Галерея (GalleryView)
│   │   ├── Header.ts               # Шапка сайта (HeaderView)
│   │   ├── Modal.ts                # Модальное окно (ModalView)
│   │   └── Success.ts              # Окно об успехе (SuccessView)
├── types/
│   └── index.ts                    # Типы данных и интерфейсы
├── utils/
│   ├── constants.ts                # Константы
│   ├── utils.ts                    # Утилиты
│   └── data.ts                     # Данные утилит
├── pages/
│   └── index.html                  # HTML-страница
├── tests/                          # Тесты
│   ├── TestCart.ts
│   ├── TestCatalog.ts
│   ├── TestUser.ts
│   └── TestUserApi.ts
├── scss/                           # Стили
│   ├── styles.scss
│   ├── _variables.scss
│   └── mixins/
│       ├── _index.scss
│       ├── _background.scss
│       ├── _container.scss
│       ├── _fix.scss
│       ├── _icon.scss
│       └── _interactive.scss
├── common.blocks/                  # БЭМ-блоки стилей
├── images/                         # Изображения
├── public/                         # Публичные файлы
├── vendor/                         # Вендорные шрифты и CSS
├── main.ts                         # Точка входа
└── vite-env.d.ts                   # Типы Vite
```

### Корневые файлы проекта:
```
/
├── index.html                      # Корневая HTML-страница
├── vite.config.ts                  # Конфигурация Vite
├── tsconfig.json                   # Конфигурация TypeScript
├── package.json                    # Зависимости проекта
├── .env                            # Переменные окружения
├── .gitignore                      # Git ignore
└── README.md                       # Документация
```

---

## Базовые классы

### Component<T> (abstract)

Базовый класс для всех компонентов View.

```ts
protected constructor(_container: HTMLElement)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `_container` | `HTMLElement` | Корневой DOM-элемент компонента (protected, readonly) |

| Метод | Описание |
|-------|---------|
| `render(data?: Partial<T>): HTMLElement` | Обновляет DOM через Object.assign и возвращает элемент |
| `setImage(element: HTMLImageElement, src: string, alt?: string): void` | Устанавливает изображение |
| `get container: HTMLElement` | Геттер DOM-элемента |

---

### Api

Базовый класс для HTTP-запросов.

```ts
constructor(baseUrl: string, options: RequestInit = {})
```

| Поле | Тип | Описание |
|------|-----|---------|
| `baseUrl` | `string` | Базовый URL сервера (readonly) |
| `options` | `RequestInit` | Опции запроса (protected) |

| Метод | Описание |
|-------|---------|
| `get<T extends object>(uri): Promise<T>` | GET-запрос |
| `post<T extends object>(uri, data, method?): Promise<T>` | POST-запрос |
| `handleResponse<T>(response): Promise<T>` | Обработка ответа (protected) |

---

### EventEmitter (implements IEvents)

Брокер событий (паттерн Observer). Единственный класс в проекте, использующий `implements`.

```ts
constructor()
```

| Поле | Тип | Описание |
|------|-----|---------|
| `_events` | `Map<EventName, Set<Subscriber>>` | Карта событий и подписчиков |

| Метод | Описание |
|-------|---------|
| `on<T>(event, callback): void` | Подписка на событие |
| `off(event, callback): void` | Отписка от события |
| `emit<T>(event, data?): void` | Генерация события |
| `onAll(callback): void` | Подписка на все события |
| `offAll(): void` | Отписка от всех событий |
| `trigger<T>(event, context?): (data: T) => void` | Создание триггера |

---

## Типы данных

### IProduct — Товар

```ts
interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
```

### IUser — Покупатель

```ts
interface IUser {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}

type TPayment = 'card' | 'cash' | null;
```

### IUserError — Ошибки валидации

```ts
type IUserError = Partial<Record<keyof IUser, string>>;
```

### IProducts — Список товаров с сервера

```ts
interface IProducts {
  total: number;
  items: IProduct[];
}
```

### IOrderRequest — Запрос на оформление заказа

```ts
interface IOrderRequest extends IUser {
  total: number;
  items: string[];
}
```

### IOrderResponse — Ответ сервера на заказ

```ts
interface IOrderResponse {
  id: string;
  total: number;
}
```

### TBuyButtonState — Состояние кнопки покупки

```ts
type TBuyButtonState = {
  isDisabled: boolean;
  mode: 'add' | 'remove' | 'unavailable';
}
```

---

## Интерфейсы View-слоя

Интерфейсы используются как **generic-ограничения** в `Component<T>`, а не через `implements`.

| Интерфейс | Где используется | Описание |
|-----------|------------------|----------|
| `ICardView` | `CardView<T extends ICardView>` | title: string, price: number \| null, id: string |
| `ICardActions` | Параметр в конструкторах CardCatalogView/CardCartView | onClick?: () => void |
| `ICardCatalogView` | `CardCatalogView extends CardView<ICardCatalogView>` | extends ICardView + image: string, category: string |
| `ICardDetailedView` | **Не используется** как generic-параметр | extends ICardCatalogView + text: string, button: TBuyButtonState |
| `ICardCartView` | `CardCartView extends CardView<ICardCartView>` | extends ICardView + index: string |
| `IGalleryView` | `GalleryView extends Component<IGalleryView>` | catalog: HTMLElement[] |
| `IModalView` | `ModalView extends Component<IModalView>` | open(content: HTMLElement): void, close(): void |
| `IFormView` | `FormView<T extends IFormView>` | valid: boolean, errors: string |
| `IFormPaymentAddressView` | `FormPaymentAddressView extends FormView<IFormPaymentAddressView>` | extends IFormView + payment: TPayment, address: string |
| `IFormEmailPhoneView` | `FormEmailPhoneView extends FormView<IFormEmailPhoneView>` | extends IFormView + email: string, phone: string |
| `ICartView` | `CartView extends Component<ICartView>` | list: HTMLElement[], total: number, disabled: boolean |
| `ISuccessView` | `SuccessView extends Component<ISuccessView>` | total: number |
| `IHeaderView` | `HeaderView extends Component<IHeaderView>` | count: number |

---

## Model слой

### Catalog

Хранит каталог товаров. Использует `IProduct` для типизации данных.

```ts
constructor(private events: IEvents)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `products` | `IProduct[]` | Массив товаров (private) |
| `detailed` | `IProduct \| null` | Текущий подробный товар (private) |

| Метод | Описание |
|-------|---------|
| `setProducts(products: IProduct[]): void` | Установить массив товаров |
| `getProducts(): IProduct[]` | Получить массив товаров |
| `getProductById(id: string): IProduct \| undefined` | Найти товар по id |
| `setDetailedProduct(product: IProduct): void` | Установить подробный товар |
| `getDetailedProduct(): IProduct \| null` | Получить подробный товар |

**События:** `catalog:changed`, `catalog:detailedChanged`

---

### Cart

Управляет товарами в корзине. Использует `IProduct` для типизации данных.

```ts
constructor(private events: IEvents)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `products` | `IProduct[]` | Массив товаров в корзине (private) |

| Метод | Описание |
|-------|---------|
| `getProducts(): IProduct[]` | Получить товары корзины |
| `addProduct(product: IProduct): void` | Добавить товар |
| `removeProduct(product: IProduct): void` | Удалить товар |
| `clear(): void` | Очистить корзину |
| `getTotalPrice(): number` | Получить общую стоимость |
| `getCount(): number` | Получить количество товаров |
| `contains(id: string): boolean` | Проверить наличие товара |

**События:** `cart:changed`

---

### User

Хранит данные покупателя. Работает с интерфейсом `IUser`. Валидация данных производится только в модели.

```ts
constructor(private events: IEvents)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `payment` | `TPayment` | Способ оплаты (private, init: null) |
| `email` | `string` | Email (private, init: '') |
| `phone` | `string` | Телефон (private, init: '') |
| `address` | `string` | Адрес (private, init: '') |

| Метод | Описание |
|-------|---------|
| `setUser(user: Partial<IUser>): void` | Сохранить данные |
| `clearUser(): void` | Очистить данные |
| `getUser(): IUser` | Получить все данные |
| `validateUser(): IUserError` | Валидировать данные |

**События:** `user:changed`

---

### UserApi

Взаимодействие с сервером. Использует `IApi` для HTTP-запросов.

```ts
constructor(private api: IApi)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `api` | `IApi` | Экземпляр Api (private) |

| Метод | Описание |
|-------|---------|
| `get(): Promise<IProducts>` | Получить каталог |
| `post(data: IOrderRequest): Promise<IOrderResponse>` | Отправить заказ |

**Примечание:** Интерфейс `IUserApi` определен в файле, но класс его не использует.

---

## View слой

### CardView<T extends ICardView> (abstract)

Базовый класс карточки товара. Хранит только DOM-элементы.

```ts
protected constructor(container: HTMLElement)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `_titleElement` | `HTMLElement` | Название товара (protected) |
| `_priceElement` | `HTMLElement` | Цена товара (protected) |

| Сеттер | Описание |
|--------|---------|
| `set title(value: string)` | Установить название |
| `set price(value: number \| null)` | Установить цену |
| `set id(value: string)` | Сохранить ID в dataset |

---

### CardCatalogView extends CardView<ICardCatalogView>

Карточка товара в каталоге.

```ts
constructor(container: HTMLElement, actions?: ICardActions)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `_imageElement` | `HTMLImageElement` | Изображение (protected) |
| `_categoryElement` | `HTMLElement` | Категория (protected) |

| Сеттер | Описание |
|--------|---------|
| `set image(value: string)` | Установить изображение |
| `set category(value: TCategory)` | Установить категорию |

**События:** `card:select`, `card:detailed-click`

---

### CardDetailedView extends CardCatalogView

Карточка с подробной информацией. Экземпляр создается один раз в main.ts.

```ts
constructor(container: HTMLElement, private events: IEvents)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `_textElement` | `HTMLElement` | Описание товара (private) |
| `_buttonElement` | `HTMLButtonElement` | Кнопка взаимодействия (private) |

| Сеттер | Описание |
|--------|---------|
| `set text(value: string)` | Установить описание |
| `set button(value: TBuyButtonState)` | Установить состояние кнопки |

**Примечание:** Интерфейс `ICardDetailedView` не используется как generic-параметр (используется `ICardCatalogView` от родителя).

---

### CardCartView extends CardView<ICardCartView>

Карточка товара в корзине.

```ts
constructor(container: HTMLElement, actions?: ICardActions)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `_indexElement` | `HTMLElement` | Индекс товара (private) |
| `_deleteButton` | `HTMLButtonElement` | Кнопка удаления (private) |

| Сеттер | Описание |
|--------|---------|
| `set index(value: string)` | Установить индекс |

**События:** `cart:card-delete-click`

---

### CartView extends Component<ICartView>

Отображение корзины.

```ts
constructor(container: HTMLElement, private events: IEvents)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `_listElement` | `HTMLElement` | Список товаров (private) |
| `_totalElement` | `HTMLElement` | Сумма (private) |
| `_buttonElement` | `HTMLButtonElement` | Кнопка оформления (private) |

| Сеттер | Описание |
|--------|---------|
| `set list(value: HTMLElement[])` | Установить карточки |
| `set total(value: number)` | Установить сумму |
| `set disabled(value: boolean)` | Заблокировать/разблокировать кнопку |

**События:** `cart:confirm-click`

---

### FormView<T extends IFormView> (abstract)

Базовый класс формы.

```ts
protected constructor(container: HTMLElement)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `_submitButton` | `HTMLButtonElement` | Кнопка отправки (protected) |
| `_errorsElement` | `HTMLElement \| null` | Элемент ошибок (protected) |

| Сеттер | Описание |
|--------|---------|
| `set valid(value: boolean)` | Валидность формы |
| `set errors(value: string)` | Текст ошибок |

---

### FormPaymentAddressView extends FormView<IFormPaymentAddressView>

Форма выбора оплаты и адреса (1 этап формы).

```ts
constructor(container: HTMLElement, private events: IEvents)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `_cardButton` | `HTMLButtonElement` | Кнопка карты (private) |
| `_cashButton` | `HTMLButtonElement` | Кнопка наличных (private) |
| `_addressInput` | `HTMLInputElement` | Поле адреса (private) |

| Сеттер | Описание |
|--------|---------|
| `set payment(value: TPayment)` | Выбрать способ оплаты |
| `set address(value: string)` | Установить адрес |

**События:** `payment:changed`, `address:changed`, `order:next`

---

### FormEmailPhoneView extends FormView<IFormEmailPhoneView>

Форма ввода контактных данных (2 этап формы).

```ts
constructor(container: HTMLElement, private events: IEvents)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `_emailInput` | `HTMLInputElement` | Поле email (private) |
| `_phoneInput` | `HTMLInputElement` | Поле телефона (private) |

| Сеттер | Описание |
|--------|---------|
| `set email(value: string)` | Установить email |
| `set phone(value: string)` | Установить телефон |

**События:** `email:changed`, `phone:changed`, `order:submitted`

---

### GalleryView extends Component<IGalleryView>

Галерея товаров.

```ts
constructor(container: HTMLElement)
```

| Сеттер | Описание |
|--------|---------|
| `set catalog(items: HTMLElement[])` | Установить карточки товаров |

---

### HeaderView extends Component<IHeaderView>

Шапка сайта.

```ts
constructor(container: HTMLElement, private events: IEvents)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `_cartButton` | `HTMLButtonElement` | Кнопка корзины (protected) |
| `_countElement` | `HTMLElement` | Счетчик товаров (protected) |

| Сеттер | Описание |
|--------|---------|
| `set count(value: number)` | Количество товаров в корзине |

**События:** `cart:open-click`

---

### ModalView extends Component<IModalView>

Модальное окно.

```ts
constructor(container: HTMLElement)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `_content` | `HTMLElement \| null` | Текущее содержимое (protected, init: null) |
| `_modalContent` | `HTMLElement` | Контейнер содержимого (private) |

| Метод | Описание |
|-------|---------|
| `open(content: HTMLElement): void` | Открыть окно |
| `close(): void` | Закрыть окно |

---

### SuccessView extends Component<ISuccessView>

Окно успешного заказа.

```ts
constructor(container: HTMLElement, private events: IEvents)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `_successDescriptionElement` | `HTMLElement` | Описание (private) |
| `_successCloseButton` | `HTMLButtonElement` | Кнопка закрытия (private) |

| Сеттер | Описание |
|--------|---------|
| `set total(value: number)` | Установить сумму заказа |

**События:** `success:close`

---

## Поток данных при оформлении заказа

1. Пользователь открывает корзину → main.ts получает событие `cart:open-click` → открывает `CartView`
2. Пользователь нажимает «Оформить» → main.ts открывает `FormPaymentAddressView`
3. Пользователь выбирает оплату/вводит адрес → View эмитит `payment:changed`/`address:changed` → main.ts обновляет `User` → `User` эмитит `user:changed` → main.ts обновляет форму
4. Нажимает «Далее» → main.ts открывает `FormEmailPhoneView`
5. Заполняет контакты → аналогично этапу 3
6. Нажимает «Оплатить» → main.ts отправляет заказ через `UserApi.post()`
7. При успехе → очистка `Cart` и `User` → открытие `SuccessView`

---

## События приложения

### События от View (действия пользователя)

| Событие | Источник | Параметры | Описание |
|---------|----------|-----------|----------|
| `card:select` | `CardCatalogView` | `{id: string}` | Выбор карточки товара в каталоге |
| `card:detailed-click` | `CardDetailedView` | `{id: string}` | Клик по кнопке в превью товара (добавить/удалить из корзины) |
| `cart:open-click` | `HeaderView` | - | Открытие корзины |
| `cart:card-delete-click` | `CardCartView` | `{id: string}` | Удаление товара из корзины |
| `cart:confirm-click` | `CartView` | - | Переход к оформлению заказа |
| `payment:changed` | `FormPaymentAddressView` | `{payment: TPayment}` | Изменение способа оплаты |
| `address:changed` | `FormPaymentAddressView` | `{address: string}` | Ввод адреса доставки |
| `email:changed` | `FormEmailPhoneView` | `{email: string}` | Ввод эмейла |
| `phone:changed` | `FormEmailPhoneView` | `{phone: string}` | Ввод телефона |
| `order:next` | `FormPaymentAddressView` | - | Переход к следующему этапу (контакты) |
| `order:submitted` | `FormEmailPhoneView` | - | Отправка заказа на сервер |
| `success:close` | `SuccessView` | - | Закрытие окна об успешном подтверждении заказа |

### События от Model (изменение данных)

| Событие | Источник | Параметры | Описание |
|---------|----------|-----------|----------|
| `catalog:changed` | `Catalog` | - | Каталог товаров загружен/обновлен |
| `catalog:detailedChanged` | `Catalog` | - | Изменен подробный товар |
| `cart:changed` | `Cart` | - | Изменение состава корзины (добавление/удаление/очистка) |
| `user:changed` | `User` | - | Изменение данных пользователя (оплата/адрес/email/телефон) |
| `order:success` | main.ts | `IOrderResponse` | Успешное оформление заказа |

