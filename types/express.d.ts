// src/types/express.d.ts
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload; // Tambahkan `user` sebagai properti yang dapat diterima di `Request`
    }
  }
}
