import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

export const decodeAndSaveToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token; // Ambil token dari cookie

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided' });
    }

    try {
        // Verifikasi token untuk memastikan validitas dan dekode payload
        const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload;

        // Simpan data decoded ke dalam `req.user`
        req.user = decoded; // Sekarang `req.user` akan berisi informasi pengguna dari token

        next(); // Lanjut ke middleware berikutnya
    } catch (error) {
        return res.status(400).json({ message: 'Invalid Token', error });
    }
};
