import User from '../models/userModels'
import express, {Request,Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key'

export const loginAuth = async (req: Request,res: Response): Promise<Response> => {
    const {email,password} = req.body

    try{
        const userLogin = await User.findOne({email})
        if(!userLogin){
            return res.status(404).json({message: 'not found email'})
        }

        const isMatch = await bcrypt.compare(password, userLogin.password)
        if(!isMatch){
            return res.status(400).json({message: 'your password invalid'})
        }

        const token = jwt.sign(
            { id: userLogin._id, email: userLogin.email }, // Data yang akan di-encode dalam token
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

    }catch (error: unknown){
        return res.status(500).json({message: 'server error', error})
    }
}