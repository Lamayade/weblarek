import { Cart } from '../components/models/Cart';
import { apiProducts } from '../utils/data';


export function testCart(): void {
    const CartModel = new Cart();

    CartModel.addProduct(apiProducts.items[0]);
    CartModel.addProduct(apiProducts.items[1]);
    CartModel.addProduct(apiProducts.items[3]);

    console.info(
        'Массив товаров в корзине: ', 
        [...CartModel.getProducts()],
    );

    console.info(
        'Количество товаров в корзине: ', 
        CartModel.getCount(),
    );

    console.info(
        'Цена товаров в корзине: ', 
        CartModel.getTotalPrice(),
    );

    CartModel.removeProduct(apiProducts.items[3]);

    console.info(
        'Массив товаров в корзине: ', 
        [...CartModel.getProducts()],
    );

    console.info(
        'Количество товаров в корзине: ', 
        CartModel.getCount(),
    );

    console.info(
        'Цена товаров в корзине: ', 
        CartModel.getTotalPrice(),
    );

    console.info(
        'Проверка наличия товара в корзине: ', 
        CartModel.contains(apiProducts.items[0].id),
    );

    console.info(
        'Проверка наличия товара в корзине: ', 
        CartModel.contains(apiProducts.items[3].id),
    );
}