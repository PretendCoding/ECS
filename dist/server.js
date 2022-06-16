"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
const PORT = process.env.PORT || 3000;
const indexRouter = require('./routes/index');
app.use('/', indexRouter);
app.use(express_1.default.static('./dist/public'));
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
//# sourceMappingURL=server.js.map