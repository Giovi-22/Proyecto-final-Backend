"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
function authorization(permission) {
    return (req, _res, next) => {
        var _a, _b;
        try {
            const user = req.user;
            const permiso = (_b = (_a = user === null || user === void 0 ? void 0 : user.role) === null || _a === void 0 ? void 0 : _a.permissions) === null || _b === void 0 ? void 0 : _b.includes(permission);
            if (!user.isAdmin && !permiso) {
                throw new Error(`Unauthorized, User does not have permissions to access`);
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
}
exports.authorization = authorization;
