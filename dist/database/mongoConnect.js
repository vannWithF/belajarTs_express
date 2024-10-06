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
const mongoose_1 = __importDefault(require("mongoose"));
const mongoURI = 'mongodb+srv://avvan:VannDev7@cluster1.j9komvz.mongodb.net/EventTickets';
// Menghubungkan ke MongoDB
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoURI);
        console.log('Koneksi ke MongoDB berhasil!');
    }
    catch (error) {
        // Cek apakah error memiliki message
        const errorMessage = error instanceof Error ? error.message : 'Kesalahan tidak terduga';
        console.error('Koneksi ke MongoDB gagal:', errorMessage);
        process.exit(1); // Keluar dari proses jika gagal terhubung
    }
});
// Menutup koneksi saat aplikasi berhenti
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
    console.log('Koneksi ke MongoDB ditutup');
    process.exit(0);
}));
exports.default = connectDB;
