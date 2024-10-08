"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const client_1 = require("react-dom/client"); // Import createRoot
const react_router_dom_1 = require("react-router-dom");
const App_1 = __importDefault(require("./App"));
const UseAuth_1 = require("../hooks/UseAuth");
require("./index.css");
const container = document.getElementById('root');
const root = (0, client_1.createRoot)(container); // Gunakan createRoot dan tambahkan null check (!)
root.render((0, jsx_runtime_1.jsx)(react_1.default.StrictMode, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsx)(UseAuth_1.AuthProvider, { children: (0, jsx_runtime_1.jsx)(App_1.default, {}) }) }) }));
