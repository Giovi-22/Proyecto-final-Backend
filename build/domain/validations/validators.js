"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartValidation = exports.idValidation = exports.loginValidation = exports.userZodSchema = exports.productUpdateSchema = exports.productZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.productZodSchema = zod_1.default.object({
    code: zod_1.default.string({ required_error: 'code is required', invalid_type_error: 'code must be a string' }),
    title: zod_1.default.string({ required_error: 'title is required', invalid_type_error: 'title must be a string' }),
    description: zod_1.default.string({ required_error: 'description is required', invalid_type_error: 'description must be a string' }),
    price: zod_1.default.number({ required_error: 'price is required', invalid_type_error: 'price must be a number' }),
    thumbnail: zod_1.default.array(zod_1.default.string({ required_error: 'thumnail is required', invalid_type_error: 'thumbail must be a string' })),
    stock: zod_1.default.number({ required_error: 'stock is required', invalid_type_error: 'stock must be a number' }),
    status: zod_1.default.boolean({ required_error: 'status is required', invalid_type_error: 'status must be a boolean' }),
    category: zod_1.default.string({ required_error: 'category is required', invalid_type_error: 'category must be a string' })
});
exports.productUpdateSchema = exports.productZodSchema.partial();
exports.userZodSchema = zod_1.default.object({
    firstName: zod_1.default.string({ required_error: 'firstName is required', invalid_type_error: 'firstName must be a string' }),
    lastName: zod_1.default.string({ required_error: 'lastName is required', invalid_type_error: 'lastName must be a string' }),
    email: zod_1.default.string({ required_error: 'email is required' }).email({ message: 'email must be like email@email.com' }),
    password: zod_1.default.string({ required_error: 'password is required', invalid_type_error: 'password must be a string' }),
    age: zod_1.default.number({ required_error: 'age is required', invalid_type_error: 'age must be a number' }),
});
exports.loginValidation = zod_1.default.object({
    email: zod_1.default.string({ required_error: 'email is required' }).email({ message: 'email must be like email@email.com' }),
    password: zod_1.default.string({ required_error: 'password is required', invalid_type_error: 'password must be a string' }),
});
exports.idValidation = zod_1.default.string().length(24);
exports.updateCartValidation = zod_1.default.array(zod_1.default.object({
    pid: zod_1.default.string().length(24),
    quantity: zod_1.default.number()
}));
