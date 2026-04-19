import { User } from '../components/models/User';
import { IUser } from '../types';
import {
    TEST_ADDRESS,
    TEST_EMAIL,
    TEST_PAYMENT,
    TEST_PHONE
} from '../utils/constants';

export function testUser(): void {
    const userModel = new User();
    const newUser: IUser = {
        payment: TEST_PAYMENT,
        email: TEST_EMAIL,
        phone: TEST_PHONE,
        address: TEST_ADDRESS,
    }

    userModel.set(newUser);

    console.info(
        'Данные покупателя: ', 
        userModel.get(),
    );
    console.info(
        'Проверка данных покупателя: ', 
        userModel.validate(),
    );

    userModel.clear();

    console.info(
        'Данные покупателя: ', 
        userModel.get(),
    );
    console.info(
        'Проверка данных покупателя: ', 
        userModel.validate(),
    );

}