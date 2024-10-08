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
exports.AuthProvider = exports.useAuth = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
// URL API untuk autentikasi
const API_URL = 'http://localhost:2323';
const API_devtunnel = 'https://fl1s3blz-2233.asse.devtunnels.ms';
// Context untuk autentikasi
const AuthContext = (0, react_1.createContext)(undefined);
// Hook untuk menggunakan autentikasi
const useAuth = () => {
    const context = (0, react_1.useContext)(AuthContext);
    if (!context) {
        throw new Error("useAuth harus digunakan dalam AuthProvider");
    }
    return context;
};
exports.useAuth = useAuth;
// Helper function untuk menyimpan cookie
const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
};
// Helper function untuk mendapatkan cookie
const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
};
// Helper function untuk menghapus cookie
const deleteCookie = (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/SameSite=Lax;`;
};
// Provider untuk menyimpan status autentikasi dan fungsionalitas login/logout
const AuthProvider = ({ children }) => {
    const [user, setUser] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const navigate = (0, react_router_dom_1.useNavigate)(); // Untuk navigasi setelah login/logout
    // Fungsi untuk login
    const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
            console.log("Response from API:", response);
            // Akses data secara langsung jika tidak dibungkus dalam objek "data"
            const userData = response.data.user || response.data;
            console.log("User Data:", userData);
            if (userData) {
                setUser(userData);
                setCookie('authToken', response.data.token, 7);
                navigate('/dashboard');
            }
            else {
                console.error("User data is undefined");
            }
        }
        catch (error) {
            console.error("Login gagal:", error);
            throw error;
        }
    });
    // Fungsi untuk logout
    const logout = () => {
        setUser(null);
        deleteCookie('authToken'); // Hapus token dari cookie
        navigate('/login'); // Arahkan kembali ke halaman login
    };
    // Fungsi untuk memeriksa status login pengguna saat komponen mount
    (0, react_1.useEffect)(() => {
        const checkLoginStatus = () => __awaiter(void 0, void 0, void 0, function* () {
            const token = getCookie('authToken'); // Ambil token dari cookie
            if (token) {
                try {
                    const response = yield axios_1.default.get(`${API_devtunnel}/api/users`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const userData = response === null || response === void 0 ? void 0 : response.data;
                    if (userData) {
                        setUser(userData);
                    }
                }
                catch (error) {
                    console.error("Error fetching user:", error);
                    setUser(null); // Reset user jika terjadi error
                }
            }
            setLoading(false);
        });
        checkLoginStatus();
    }, []);
    return ((0, jsx_runtime_1.jsx)(AuthContext.Provider, { value: { user, login, logout, loading }, children: !loading && children }));
};
exports.AuthProvider = AuthProvider;
