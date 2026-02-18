import { Catalog } from '../components/models/Catalog';
import { apiProducts } from '../utils/data';


export function testCatalog(): void {
    const productsModel = new Catalog();

    productsModel.setProducts(apiProducts.items);
    console.info(
        'Массив товаров из каталога: ', 
        productsModel.getProducts(),
    );
    const chosenProduct = productsModel.getProduct(apiProducts.items[0].id);
    console.info(
        'Избранный продукт: ',
        productsModel.getDetailedProduct(),
    );
    console.info(
        'Один товар из каталога: ',
        chosenProduct,
    );
    if (chosenProduct) {
        productsModel.setDetailedProduct(chosenProduct);
        console.info('Продукт добавлен в избранное');
    } else {
        console.error("Товар не найден!");
    }
    
    console.info(
        'Избранный продукт: ',
        productsModel.getDetailedProduct(),
    );
}