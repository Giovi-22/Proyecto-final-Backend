"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Role {
    constructor(role) {
        this.id = role.id;
        this.name = role.name;
        this.permissions = [...role.permissions];
    }
}
exports.default = Role;
