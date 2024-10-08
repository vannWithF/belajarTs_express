import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';


// URL API untuk autentikasi
const API_URL = 'http://localhost:2323';
const API_devtunnel = 'https://fl1s3blz-2233.asse.devtunnels.ms'

// Interface untuk User dan AuthContext
interface User {
    id: string;
    username: string;
    email: string;
    token: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

// Context untuk autentikasi
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook untuk menggunakan autentikasi
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth harus digunakan dalam AuthProvider");
    }
    return context;
};

// Helper function untuk menyimpan cookie
const setCookie = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
};

// Helper function untuk mendapatkan cookie
const getCookie = (name: string) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

// Helper function untuk menghapus cookie
const deleteCookie = (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/SameSite=Lax;`;
};

// Provider untuk menyimpan status autentikasi dan fungsionalitas login/logout
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate(); // Untuk navigasi setelah login/logout

    // Fungsi untuk login
    const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, 
            { email, password },
            { withCredentials: true }
        );

        console.log("Response from API:", response);

        // Akses data secara langsung jika tidak dibungkus dalam objek "data"
        const userData = response.data.user || response.data;
        console.log("User Data:", userData);

        if (userData) {
            setUser(userData);
            setCookie('authToken', response.data.token, 7);
            navigate('/dashboard');
        } else {
            console.error("User data is undefined");
        }
    } catch (error) {
        console.error("Login gagal:", error);
        throw error;
    }
};

    // Fungsi untuk logout
    const logout = () => {
        setUser(null);
        deleteCookie('authToken'); // Hapus token dari cookie
        navigate('/login'); // Arahkan kembali ke halaman login
    };

    // Fungsi untuk memeriksa status login pengguna saat komponen mount
    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = getCookie('authToken'); // Ambil token dari cookie
            if (token) {
                try {
                    const response: AxiosResponse<User> = await axios.get(`${API_devtunnel}/api/users`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const userData = response?.data;
                    if (userData) {
                        setUser(userData);
                    }
                } catch (error) {
                    console.error("Error fetching user:", error);
                    setUser(null); // Reset user jika terjadi error
                }
            }
            setLoading(false);
        };
        checkLoginStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
