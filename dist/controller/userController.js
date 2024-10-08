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
exports.deleteUser = exports.getUserByUsername = exports.getAllUsers = exports.createUser = void 0;
const userModels_1 = __importDefault(require("../models/userModels")); // Pastikan nama model sesuai
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInstance = new userModels_1.default(req.body);
        yield userInstance.save();
        res.status(201).json({ message: 'User has been created', user: userInstance });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: 'Error retrieving user', error: err.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModels_1.default.find();
        res.status(200).json(users); // 200 OK lebih sesuai
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: 'Error retrieving users', error: err.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});
exports.getAllUsers = getAllUsers;
const getUserByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInstance = yield userModels_1.default.findOne({ username: req.params.id });
        if (userInstance) {
            res.status(200).json(userInstance);
        }
        else {
            res.status(404).json({ message: 'User not found' }); // 404 Not Found
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: 'Error retrieving user', error: err.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});
exports.getUserByUsername = getUserByUsername;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteUserResponse = yield userModels_1.default.deleteOne({ username: req.params.id });
        if (deleteUserResponse.deletedCount > 0) {
            res.status(200).json({ message: 'User successfully deleted from the database' }); // 200 OK
        }
        else {
            res.status(404).json({ message: 'User not found' }); // 404 Not Found
        }
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ message: 'Error deleting user', error: err.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});
exports.deleteUser = deleteUser;
