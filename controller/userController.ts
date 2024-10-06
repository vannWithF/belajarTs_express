import express, { Request, Response } from 'express';
import User from '../models/userModels'; // Pastikan nama model sesuai

export const createUser = async (req: Request, res: Response) => {
    try {
        const userInstance = new User(req.body);
        await userInstance.save();
        res.status(201).json({ message: 'User has been created', user: userInstance });
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: 'Error retrieving user', error: err.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users); // 200 OK lebih sesuai
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: 'Error retrieving users', error: err.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const getUserByUsername = async (req: Request, res: Response) => {
    try {
        const userInstance = await User.findOne({ username: req.params.id });
        if (userInstance) {
            res.status(200).json(userInstance); 
        } else {
            res.status(404).json({ message: 'User not found' }); // 404 Not Found
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: 'Error retrieving user', error: err.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deleteUserResponse = await User.deleteOne({ username: req.params.id });
        if (deleteUserResponse.deletedCount > 0) {
            res.status(200).json({ message: 'User successfully deleted from the database' }); // 200 OK
        } else {
            res.status(404).json({ message: 'User not found' }); // 404 Not Found
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            res.status(500).json({ message: 'Error deleting user', error: err.message });
        } else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
};
