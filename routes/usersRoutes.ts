import { Router } from "express";
import { createUser, getAllUsers, getUserByUsername,deleteUser } from "../controller/userController";

const router = Router()

router.get('/users', getAllUsers)
router.get('/users/:id', getUserByUsername)
router.post('/users', createUser)
router.delete('/users/:id', deleteUser)

export default router