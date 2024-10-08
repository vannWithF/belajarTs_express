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
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const UseAuth_1 = require("../hooks/UseAuth");
const lucide_react_1 = require("lucide-react");
const Login = () => {
    const { login, user, logout } = (0, UseAuth_1.useAuth)();
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleLogin = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield login(email, password);
            alert('Login berhasil');
        }
        catch (error) {
            alert('Login gagal');
        }
    });
    const handleLogout = () => {
        logout();
        alert('Logout berhasil');
    };
    const handleCreateAccountClick = (e) => {
        e.preventDefault();
        navigate('/FormData');
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700", children: (0, jsx_runtime_1.jsx)("div", { className: "bg-white p-6 rounded-xl shadow-2xl w-full max-w-sm transform transition-all duration-300 hover:scale-105", children: user ? ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("h1", { className: "text-2xl font-bold text-gray-800 mb-2 text-center", children: ["Selamat Datang, ", user.username, "!"] }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.User, { size: 48, className: "text-blue-500" }) }), (0, jsx_runtime_1.jsxs)("button", { className: "w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center space-x-2", onClick: handleLogout, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { size: 18 }), (0, jsx_runtime_1.jsx)("span", { children: "Keluar" })] })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold text-gray-800 mb-4 text-center", children: "Selamat Datang!" }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-3", children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-gray-700 text-sm font-semibold mb-1", htmlFor: "email", children: "Email" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("input", { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "Masukkan email Anda", className: "w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-9 text-sm" }), (0, jsx_runtime_1.jsx)(lucide_react_1.Mail, { className: "absolute left-2 top-2.5 text-gray-400", size: 18 })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-4", children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-gray-700 text-sm font-semibold mb-1", htmlFor: "password", children: "Kata Sandi" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("input", { id: "password", type: showPassword ? "text" : "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Masukkan kata sandi Anda", className: "w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-9 pr-10 text-sm" }), (0, jsx_runtime_1.jsx)(lucide_react_1.Lock, { className: "absolute left-2 top-2.5 text-gray-400", size: 18 }), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: togglePasswordVisibility, className: "absolute right-2 top-2.5 text-gray-400 hover:text-gray-600", children: showPassword ? (0, jsx_runtime_1.jsx)(lucide_react_1.EyeOff, { size: 18 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { size: 18 }) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex justify-between items-center text-xs mb-4", children: (0, jsx_runtime_1.jsx)("a", { className: "text-blue-600 hover:text-blue-800 transition duration-300", href: "#", onClick: handleCreateAccountClick, children: "Buat Akun Baru" }) }), (0, jsx_runtime_1.jsxs)("button", { className: "w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center space-x-2", onClick: handleLogin, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.User, { size: 18 }), (0, jsx_runtime_1.jsx)("span", { children: "Masuk" })] })] })) }) }));
};
exports.default = Login;
