import { User } from '../components/models/User';
import { IUser } from '../types';
import { 
    testAddress, 
    testEmail, 
    testPayment, 
    testPhone 
} from '../utils/constants';

export function testUser(): void {
    const UserModel = new User();
    const newUser: IUser = {
        payment: testPayment,
        email: testEmail,
        phone: testPhone,
        address: testAddress,
    }

    UserModel.set(newUser);

    console.info(
        'Данные покупателя: ', 
        UserModel.get(),
    );
    console.info(
        'Проверка данных покупателя: ', 
        UserModel.validate(),
    );

    UserModel.clear();

    console.info(
        'Данные покупателя: ', 
        UserModel.get(),
    );
    console.info(
        'Проверка данных покупателя: ', 
        UserModel.validate(),
    );

}