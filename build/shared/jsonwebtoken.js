"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerificator = exports.jwtGenerator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const jwtGenerator = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign({ user: Object.assign(Object.assign({}, user), { password: undefined }) }, config_1.config.jwtKey, { expiresIn: '10m' });
});
exports.jwtGenerator = jwtGenerator;
const jwtVerificator = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const result = jsonwebtoken_1.default.verify(token, config_1.config.jwtKey, (err, credential) => {
        if (err) {
            throw new Error("Bad Request Authentication error, invalid o expired jwt");
        }
        return credential;
    });
    return result;
});
exports.jwtVerificator = jwtVerificator;
