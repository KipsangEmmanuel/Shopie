import { Router } from "express";
import { deleteUser, loginUser, registerUser } from "../controllers/userController";
import { verifyToken } from "../middleware/verifyToken";


const user_router = Router();

user_router.post('/register', registerUser)
user_router.post('/login', loginUser)
user_router.delete('/:_id', deleteUser)
user_router.delete('/:_id', deleteUser)


export default user_router;