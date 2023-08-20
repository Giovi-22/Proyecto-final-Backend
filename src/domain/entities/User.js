
class User{

    constructor(props){
        this.id=props.id,
        this.firstName=props.firstName,
        this.lastName=props.lastName,
        this.email=props.email,
        this.age=props.age,
        this.password = props?.password,
        this.role = props?.role,
        this.cart = props?.cart,
        this.documents = props.documents,
        this.isAdmin = props.isAdmin
    }
}

export default User;