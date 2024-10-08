import { Router } from "express";
import { createUsers,getAllUsers,getUsersByUsername,deleteUsersById } from "../controller/userController";

const router = Router()

router.get('/userss', getAllUsers)
router.get('/userss/:id', getUsersByUsername)
router.post('/userss', createUsers)
router.delete('/userss/:id', deleteUsersById)

export default router