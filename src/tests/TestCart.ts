import { Cart } from '../components/models/Cart';
import { apiProducts } from '../utils/data';


export function testCart(): void {
    const cartModel = new Cart();

    cartModel.addProduct(apiProducts.items[0]);
    cartModel.addProduct(apiProducts.items[1]);
    cartModel.addProduct(apiProducts.items[3]);

    console.info(
        'Массив товаров в корзине: ', 
        [...cartModel.getProducts()],
    );

    console.info(
        'Количество товаров в корзине: ', 
        cartModel.getCount(),
    );

    console.info(
        'Цена товаров в корзине: ', 
        cartModel.getTotalPrice(),
    );

    cartModel.removeProduct(apiProducts.items[3]);

    console.info(
        'Массив товаров в корзине: ', 
        [...cartModel.getProducts()],
    );

    console.info(
        'Количество товаров в корзине: ', 
        cartModel.getCount(),
    );

    console.info(
        'Цена товаров в корзине: ', 
        cartModel.getTotalPrice(),
    );

    console.info(
        'Проверка наличия товара в корзине: ', 
        cartModel.contains(apiProducts.items[0].id),
    );

    console.info(
        'Проверка наличия удаленного товара в корзине: ', 
        cartModel.contains(apiProducts.items[3].id),
    );
    cartModel.clear();

    console.info(
        'Массив товаров в корзине после очистки корзины: ', 
        [...cartModel.getProducts()],
    );

}