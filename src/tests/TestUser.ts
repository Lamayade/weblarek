import { User } from '../components/models/User';
import { IUser } from '../types';

export function testUser(): void {
    const UserModel = new User();
    const newUser: IUser = {
        payment: 'card',
        email: 'new@user.com',
        phone: '88005553535',
        address: '3-я улица Строителей, дом 25, квартира 12',
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