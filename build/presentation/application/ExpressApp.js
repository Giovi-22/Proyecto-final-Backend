"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _ExpressApp_viewPath;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const express_handlebars_1 = require("express-handlebars");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const index_1 = require("../../config/index");
const productRouter_1 = __importDefault(require("../routes/productRouter"));
/*
import cartRouter from '../routes/cartRouter.js';
import ticketRouter from '../routes/ticketRouter.js';
import sessionsRouter from '../routes/sessionsRouter.js';
import userRouter from '../routes/userRouter.js';
import roleRouter from '../routes/roleRouter.js';
import { errorHandler } from '../middlewares/errorHandler.js';

*/
class ExpressApp {
    constructor() {
        _ExpressApp_viewPath.set(this, path_1.default.resolve('src/presentation/views'));
        this.app = (0, express_1.default)();
    }
    init() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use(express_1.default.static(path_1.default.resolve('src/public')));
        this.app.engine('handlebars', (0, express_handlebars_1.engine)({
            defaultLayout: `${__classPrivateFieldGet(this, _ExpressApp_viewPath, "f")}/layouts/main.handlebars`,
            layoutsDir: `${__classPrivateFieldGet(this, _ExpressApp_viewPath, "f")}`
        }));
        this.app.set('view engine', 'handlebars');
        this.app.set('views', __classPrivateFieldGet(this, _ExpressApp_viewPath, "f"));
        this.app.use((0, cors_1.default)({
            origin: true,
            credentials: true
        }));
        this.app.use((0, express_session_1.default)({
            store: connect_mongo_1.default.create({
                mongoUrl: index_1.config.dbUri,
                ttl: 60,
            }),
            secret: 'codigoSecreto',
            resave: false,
            saveUninitialized: false
        }));
    }
    build() {
        this.app.use('/api/products/', productRouter_1.default);
        /*
        this.app.use('/api/carts/',cartRouter);
        this.app.use('/api/tickets',ticketRouter);
        this.app.use('/api/sessions',sessionsRouter);
        this.app.use('/api/users',userRouter)
        this.app.use('/api/roles',roleRouter);
        this.app.use(errorHandler);
        */
    }
    listen() {
        this.app.listen(index_1.config.port, () => console.log(`Servidor escuchando en el puerto ${index_1.config.port}`));
    }
}
_ExpressApp_viewPath = new WeakMap();
exports.default = ExpressApp;
