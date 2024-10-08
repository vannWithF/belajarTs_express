"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeAndSaveToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';
const decodeAndSaveToken = (req, res, next) => {
    const token = req.cookies.token; // Ambil token dari cookie
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }
    try {
        // Verifikasi token untuk memastikan validitas dan dekode payload
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        // Simpan data decoded ke dalam `req.user`
        req.user = decoded; // Sekarang `req.user` akan berisi informasi pengguna dari token
        next(); // Lanjut ke middleware berikutnya
    }
    catch (error) {
        return res.status(400).json({ message: 'Invalid Token', error });
    }
};
exports.decodeAndSaveToken = decodeAndSaveToken;
