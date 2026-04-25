# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TypeScript, Vite

## Установка и запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

# Интернет-магазин «Web-Larёk»

«Web-Larёk» — интернет-магазин с товарами для веб-разработчиков. Пользователи могут просматривать каталог, добавлять товары в корзину и оформлять заказы.

---

## Архитектура приложения

Приложение построено на архитектурном паттерне **MVP (Model-View-Presenter)**:

- **Model** — слой данных. Отвечает за хранение и изменение данных приложения (каталог товаров, корзина, данные покупателя).
- **View** — слой представления. Отвечает за отображение данных и получение пользовательского ввода. Не содержит бизнес-логики.
- **Presenter** — связующее звено. Содержит основную логику приложения, обрабатывает события от View и взаимодействует с Model.

Взаимодействие между компонентами реализовано через **EventEmitter** (событийно-ориентированный подход).

---

## Структура проекта

```
src/
├── components/
│   ├── base/                 # Базовые классы
│   │   ├── Api.ts                  # HTTP-запросы
│   │   ├── Component.ts            # Базовый компонент View
│   │   └── Events.ts               # Брокер событий
│   ├── models/               # Model слой
│   │   ├── Cart.ts                 # Корзина
│   │   ├── Catalog.ts              # Каталог товаров
│   │   ├── User.ts                 # Данные покупателя
│   │   └── UserApi.ts              # API для сервера
│   ├── views/                # View слой
│   │   ├── Card.ts                 # Базовый класс карточки
│   │   ├── CardCatalog.ts          # Карточка в каталоге
│   │   ├── CardCart.ts             # Карточка в корзине
│   │   ├── CardDetailed.ts         # Открытая карточка
│   │   ├── Cart.ts                 # Корзина
│   │   ├── Form.ts                 # Базовый класс формы
│   │   ├── FormEmailPhone.ts       # Форма email/телефона
│   │   ├── FormPaymentAddress.ts   # Форма оплаты/адреса
│   │   ├── Gallery.ts              # Галерея
│   │   ├── Header.ts               # Шапка сайта
│   │   ├── Modal.ts                # Модальное окно
│   │   └── Success.ts              # Окно об успехе
│   └── presenter/
│       └── Presenter.ts            # Главный презентер
├── types/
│   └── index.ts                    # Типы данных
├── utils/
│   ├── constants.ts                # Константы
│   └── utils.ts                    # Утилиты
├── pages/
│   └── index.html                  # HTML-страница
├── tests/                          # Тесты
├── scss/
│   └── styles.scss                 # Стили
├── common.blocks/                  # Блоки стилей
├── images/                         # Изображения
├── public/                         # Публичные файлы
├── vendor/                         # Вендорные библиотеки
├── main.ts                         # Точка входа
└── vite-env.d.ts                   # Типы Vite
```

---

## Базовые классы

### Component<T>

Базовый класс для всех компонентов View.

```ts
constructor(container: HTMLElement)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `_container` | `HTMLElement` | Корневой DOM-элемент компонента |

| Метод | Описание |
|-------|---------|
| `render(data?: Partial<T>): HTMLElement` | Возвращает DOM-элемент |
| `setImage(element, src, alt?)` | Устанавливает изображение |
| `get container: HTMLElement` | Геттер DOM-элемента |

---

### Api

Базовый класс для HTTP-запросов.

```ts
constructor(baseUrl: string, options?: RequestInit)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `baseUrl` | `string` | Базовый URL сервера |
| `options` | `RequestInit` | Настройки запросов |

| Метод | Описание |
|-------|---------|
| `get<T>(uri): Promise<T>` | GET-запрос |
| `post<T>(uri, data, method?): Promise<T>` | POST-запрос (по умолчанию) |

---

### EventEmitter

Брокер событий (паттерн Observer).

```ts
on<T>(event: string, callback: (data: T) => void): void
emit<T>(event: string, data?: T): void
trigger<T>(event, context?): (data: T) => void
```

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

### ICartView — Данные корзины

```ts
interface ICartView {
  items: IProduct[];
  total: number;
  disabled: boolean;
}
```

---

## Model слой

### Catalog

Хранит каталог товаров и выбранный товар.

```ts
constructor(events: IEvents)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `products` | `IProduct[]` | Массив товаров |
| `detailed` | `IProduct \| null` | Выбранный товар |

| Метод | Описание |
|-------|---------|
| `setProducts(products)` | Установить массив товаров |
| `getProducts(): IProduct[]` | Получить массив товаров |
| `getProductById(id): IProduct \| undefined` | Найти товар по id |
| `setDetailedProduct(product)` | Сохранить выбранный товар |
| `getDetailedProduct(): IProduct \| null` | Получить выбранный товар |

---

### Cart

Управляет товарами в корзине.

```ts
constructor(events: IEvents)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `products` | `IProduct[]` | Массив товаров в корзине |

| Метод | Описание |
|-------|---------|
| `getProducts(): IProduct[]` | Получить товары корзины |
| `addProduct(product)` | Добавить товар |
| `removeProduct(product)` | Удалить товар |
| `clear()` | Очистить корзину |
| `getTotalPrice(): number` | Получить общую стоимость |
| `getCount(): number` | Получить количество товаров |
| `contains(id): boolean` | Проверить наличие товара |

---

### User

Хранит данные покупателя.

```ts
constructor()
```

| Поле | Тип | Описание |
|------|-----|---------|
| `payment` | `TPayment` | Способ оплаты |
| `email` | `string` | Email |
| `phone` | `string` | Телефон |
| `address` | `string` | Адрес |

| Метод | Описание |
|-------|---------|
| `set(user: Partial<IUser>)` | Сохранить данные |
| `get(): IUser` | Получить все данные |
| `clear()` | Очистить данные |
| `validate(): IUserError` | Валидировать данные |

---

### UserApi

Взаимодействие с сервером.

```ts
constructor(api: Api)
```

| Метод | Описание |
|-------|---------|
| `get(): Promise<IProducts>` | Получить каталог |
| `post(order): Promise<IOrderResponse>` | Отправить заказ |

---

## View слой

### Card

Абстрактный базовый класс карточки товара.

```ts
constructor(container: HTMLElement)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `_title` | `HTMLElement` | Название товара |
| `_price` | `HTMLElement` | Цена товара |
| `_isAvailable` | `boolean` | Доступность |
| `_id` | `string` | ID товара |

| Метод | Описание |
|-------|---------|
| `set data(product: IProduct)` | Установить данные товара |
| `set title(value: string)` | Установить название |
| `set price(value: number \| null)` | Установить цену |
| `get id(): string` | Получить ID |

---

### CardCatalog

Карточка товара в каталоге.

```ts
constructor(container: HTMLElement)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `_image` | `HTMLImageElement` | Изображение |
| `_category` | `HTMLElement` | Категория |

| Метод | Описание |
|-------|---------|
| `set image(value: string)` | Установить изображение |
| `set category(value: TCategory)` | Установить категорию |

---

### CardDetailed

Карточка с подробной информацией.

```ts
constructor(container: HTMLElement)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `_text` | `HTMLElement` | Описание товара |
| `_button` | `HTMLButtonElement` | Кнопка взаимодействия с корзиной |
| `_isInCart` | `boolean` | В корзине |
| `onClickAdd: (id: string) => void` | Callback добавления |
| `onClickRemove: (id: string) => void` | Callback удаления |

| Метод | Описание |
|-------|---------|
| `set text(value: string)` | Установить описание товара |
| `set isInCart(value: boolean)` | Установить статус корзины |

---

### CartView

Отображение корзины.

```ts
constructor(container: HTMLElement, events: IEvents)
```

| Поле | Тип | Описание |
|------|-----|---------|
| `onCardRemove: (id: string) => void` | Callback удаления товара |

| Сеттер | Описание |
|--------|---------|
| `set data(value: ICartView)` | Установить все данные |
| `set items(products: IProduct[])` | Установить товары |
| `set total(value: number)` | Установить сумму |
| `set disabled(value: boolean)` | Заблокировать/разблокировать кнопку оформления заказа|

---

### Form

Абстракный класс формы.

```ts
constructor(container: HTMLElement, events: IEvents)
```

| Сеттер | Описание |
|--------|---------|
| `set errors(value: IUserError)` | Задать ошибки |
| `set isValid(value: boolean)` | Валидность формы |

| Метод | Описание |
|-------|---------|
| `bindSubmit(event)` | Привязать отправку к событию |
| `disableFormSubmit(disabled)` | Заблокировать кнопку отправки |

---

### FormPaymentAddress

Форма выбора оплаты и адреса (1 этап формы).

```ts
constructor(container: HTMLElement, events: IEvents)
```

| Сеттер | Описание |
|--------|---------|
| `set payment(value: TPayment)` | Выбрать способ оплаты |
| `set address(value: string)` | Установить адрес |

---

### FormEmailPhone

Форма ввода контактных данных (2 этап формы).

```ts
constructor(container: HTMLElement, events: IEvents)
```

| Сеттер | Описание |
|--------|---------|
| `set email(value: string)` | Установить email |
| `set phone(value: string)` | Установить телефон |

---

### Modal

Модальное окно.

```ts
constructor(container: HTMLElement, events: IEvents)
```

| Метод | Описание |
|-------|---------|
| `open(content)` | Открыть окно |
| `close()` | Закрыть окно |

---

### Header

Шапка сайта.

```ts
constructor(container: HTMLElement, events: IEvents)
```

| Сеттер | Описание |
|--------|---------|
| `set count(value: number)` | Количество товаров в корзине |

---

### Gallery

Каталог товаров.

```ts
constructor(container: HTMLElement, events: IEvents)
```

| Сеттер | Описание |
|--------|---------|
| `set catalog(elements: HTMLElement[])` | Установить карточки |

---

## Presenter

### Presenter

Главный презентер, связывающий все компоненты.

```ts
constructor(
  events: IEvents,
  catalog: Catalog,
  cart: Cart,
  user: User,
  userApi: UserApi,
  gallery: Gallery,
  modal: Modal,
  cartView: CartView,
  formPayment: FormPaymentAddress,
  formContacts: FormEmailPhone
)
```

| Метод | Описание |
|-------|---------|
| `loadCatalog()` | Загрузить каталог с сервера |
| `bindCatalogEvents()` | Обработка событий каталога |
| `bindCartEvents()` | Обработка событий корзины |
| `bindUserEvents()` | Обработка событий форм |
| `updateFormValidation()` | Обновление валидации форм |

---

## Поток данных при оформлении заказа

1. Пользователь открывает корзину → `Presenter` получает событие → открывает `CartView`
2. Пользователь нажимает «Оформить» → `Presenter` открывает `FormPaymentAddress`
3. Пользователь заполняет данные → `Presenter` валидирует через `User.validate()`
4. Нажимает «Далее» → `Presenter` открывает `FormEmailPhone`
5. Заполняет контакты → валидация
6. Нажимает «Оплатить» → `Presenter` отправляет заказ через `UserApi.post()`
7. При успехе → очистка `Cart` и `User` → открытие `Success`