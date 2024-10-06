"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoConnect_1 = __importDefault(require("./database/mongoConnect"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const app = (0, express_1.default)();
const port = 2323;
app.use('/api', usersRoutes_1.default);
(0, mongoConnect_1.default)();
app.listen(port, () => {
    console.log(`konek ke ${port}`);
});
