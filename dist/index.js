"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const questionRoutes_1 = __importDefault(require("./routes/questionRoutes"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
(0, db_1.connectDB)();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
}));
app.use('/api/users', userRoutes_1.default);
app.use('/api/questions', questionRoutes_1.default);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.use(errorMiddleware_1.errorHandler);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
process.once('SIGUSR2', function () {
    process.kill(process.pid, 'SIGUSR2');
});
process.on('SIGINT', function () {
    // this is only called on ctrl+c, not restart
    process.kill(process.pid, 'SIGINT');
});
