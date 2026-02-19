import { Api } from "../components/base/Api";
import { UserApi } from "../components/models/UserApi";
import { Catalog } from "../components/models/Catalog";
import {
    API_URL,
    testAddress,
    testEmail,
    testPayment,
    testPhone
} from "../utils/constants";

export async function testUserApi() {
    try {
        const api = new Api(API_URL);
        const userApi = new UserApi(api);
        const catalog = new Catalog();

        //Product List
        const products = await userApi.get();
        catalog.setProducts(products.items);
        console.info(
            'Полученный каталог с сервера: ',
            catalog.getProducts(),
        )

        //Order
        const order = await userApi.post({
            payment: testPayment,
            email: testEmail,
            phone: testPhone,
            address: testAddress,
            total: 
                (products.items[0].price ?? 0) + 
                (products.items[1].price ?? 0),
            items: [
                products.items[0].id,
                products.items[1].id,
            ],
        });
        console.info(
            'Размещённый заказ: ',
            order,
        )
    } catch (err) {
        console.error(
            'Ошибка при тестировании API: ',
            err,
        )
    }
}