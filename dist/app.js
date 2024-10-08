"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoConnect_1 = __importDefault(require("./database/mongoConnect"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 2323;
app.use((0, cors_1.default)({
    origin: 'localhost:5173',
    credentials: true
}));
app.use('/api', usersRoutes_1.default);
(0, mongoConnect_1.default)();
app.listen(port, () => {
    console.log(`konek ke ${port}`);
});
