"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./router/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((req, res, next) => {
    next();
});
// is body parser a middleware?
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use('/api', index_1.default);
const URL = 'mongodb+srv://itcgel:HO2SvVZMossUdMe6@cluster0.mximc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(process.env.MONGO_URL || URL);
mongoose_1.default.connection.on('error', (error) => console.log(error));
app.listen(process.env.PORT || 3001, () => console.log('listening on port 3001'));
//# sourceMappingURL=app.js.map