import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Users from '../models/userModels'; // Asumsi import model Users

export const createUsers = async (req: Request, res: Response): Promise<Response> => {
    const { email, username, password, role } = req.body || {};
  
    // Validasi data
    if (!email || !username || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' }); // Return untuk menghentikan eksekusi
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const existingUser = await Users.findOne({ email });
  
      // Cek jika user sudah ada
      if (existingUser) {
        return res.status(400).json({ message: 'Your account is already registered' }); // Return untuk mencegah eksekusi lebih lanjut
      }
  
      // Buat user baru jika belum ada
      const newUser = new Users({
        email,
        username,
        password: hashedPassword,
        role,
      });
  
      await newUser.save(); // Simpan ke database
      return res.status(201).json({ message: 'User created successfully', newUser }); // Return untuk memastikan ini satu-satunya response
    } catch (error: any) {
      return res.status(500).json({ message: 'Error creating user', error: error.message }); // Return juga pada blok catch
    }
  };
  
  
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try { 
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
};

export const getUsersByUsername = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = await Users.findOne({ username: req.params.id }); // untuk mencari user berdasarkan usernamenya
    if (userId) {
      res.status(201).json(userId);
    } else {
      res.status(404).json({ message: 'User Not found' });
    }
  } catch (err: any) {
    res.status(500).json({ message: 'Error retrieving User', error: err.message });
  }
};

export const updatePasswordOrUsername = async (req: Request, res: Response): Promise<Response | void> => {
  const { id } = req.params;
  const { oldPasword, newPassword, username, forgotPassword } = req.body;

  try {
    const User = await Users.findById(id);
    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username) {
      User.username = username;
    }

    if (newPassword) {
      if (forgotPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        User.password = hashedPassword;
      } else {
        const isMatch = await bcrypt.compare(oldPasword, User.password);
        if (!isMatch) {
          return res.status(401).json({ message: 'The old password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        User.password = hashedPassword;
      }
    }

    await User.save();
    res.status(200).json({ message: 'Your password has been successfully changed' });
  } catch (err: any) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const deleteUsersById = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await Users.deleteOne({ username: req.params.id });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'User has been deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err: any) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};
