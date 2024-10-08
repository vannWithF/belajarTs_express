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
exports.loginAuth = void 0;
const userModels_1 = __importDefault(require("../models/userModels"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';
const loginAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const userLogin = yield userModels_1.default.findOne({ email });
        if (!userLogin) {
            return res.status(404).json({ message: 'not found email' });
        }
        const isMatch = yield bcrypt_1.default.compare(password, userLogin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'your password invalid' });
        }
        const token = jsonwebtoken_1.default.sign({ id: userLogin._id, email: userLogin.email }, // Data yang akan di-encode dalam token
        SECRET_KEY, // Secret key
        { expiresIn: '1h' } // Masa berlaku token (1 jam)
        );
        // Set token ke dalam session cookie
        res.cookie('token', token, {
            httpOnly: true, // Membatasi akses cookie melalui JavaScript (keamanan)
            secure: process.env.NODE_ENV === 'production', // Aktifkan hanya di HTTPS jika di produksi
            maxAge: 60 * 60 * 1000, // Cookie berlaku selama 1 jam
            sameSite: 'strict' // Melindungi dari CSRF
        });
        // Jika login berhasil, kirim respon sukses
        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: userLogin._id,
                email: userLogin.email,
                // Data lain yang ingin dikembalikan
            }
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'server error', error });
    }
});
exports.loginAuth = loginAuth;
