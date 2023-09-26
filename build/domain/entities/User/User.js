"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(user) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.age = user.age;
        this.password = user === null || user === void 0 ? void 0 : user.password;
        this.role = user === null || user === void 0 ? void 0 : user.role;
        this.cart = user === null || user === void 0 ? void 0 : user.cart;
        this.isAdmin = user.isAdmin;
    }
}
exports.default = User;
