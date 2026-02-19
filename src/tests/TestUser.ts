import { User } from '../components/models/User';
import { IUser } from '../types';
import { 
    testAddress, 
    testEmail, 
    testPayment, 
    testPhone 
} from '../utils/constants';

export function testUser(): void {
    const userModel = new User();
    const newUser: IUser = {
        payment: testPayment,
        email: testEmail,
        phone: testPhone,
        address: testAddress,
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