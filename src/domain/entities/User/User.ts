import { IUser } from "./IUser";

class User{
        id:string;
        firstName:string;
        lastName: string;
        email: string;
        age: number;
        password: string;
        role: string;
        cart: string;
        isAdmin: boolean;

    constructor(user:IUser){
        this.id=user.id,
        this.firstName=user.firstName,
        this.lastName=user.lastName,
        this.email=user.email,
        this.age=user.age,
        this.password = user?.password,
        this.role = user?.role,
        this.cart = user?.cart,
        this.isAdmin = user.isAdmin
    }
}

export default User;