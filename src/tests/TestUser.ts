import { User } from '../components/models/User';
import { IUser } from '../types';
import { EventEmitter } from '../components/base/Events';
import {
    TEST_ADDRESS,
    TEST_EMAIL,
    TEST_PAYMENT,
    TEST_PHONE
} from '../utils/constants';

export function testUser(): void {
    const events = new EventEmitter();
    const userModel = new User(events);
    const newUser: IUser = {
        payment: TEST_PAYMENT,
        email: TEST_EMAIL,
        phone: TEST_PHONE,
        address: TEST_ADDRESS,
    }

    userModel.setUser(newUser);

    console.info(
        'Данные покупателя: ', 
        userModel.getUser(),
    );
    console.info(
        'Проверка данных покупателя: ', 
        userModel.validateUser(),
    );

    userModel.clearUser();

    console.info(
        'Данные покупателя: ', 
        userModel.getUser(),
    );
    console.info(
        'Проверка данных покупателя: ', 
        userModel.validateUser(),
    );

}