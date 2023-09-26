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
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("../../shared/jsonwebtoken");
const auth = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const authHeader = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization;
        if (!authHeader) {
            throw new Error('Bad Request, authorization has not been sent');
        }
        const token = authHeader.split(' ')[1];
        const credential = yield (0, jsonwebtoken_1.jwtVerificator)(token);
        console.log("Las credenciales: ", credential);
        //req.user = credential.user;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.default = auth;
