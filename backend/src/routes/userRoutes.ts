import { Router } from "express";
import { checkUserDetails, deleteUser, loginUser, registerUser } from "../controllers/userController";
import { verifyToken } from "../middleware/verifyToken";


const user_router = Router();

user_router.post('/register', registerUser)
user_router.post('/login', loginUser)
user_router.delete('/:_id', deleteUser)
user_router.get('/check_user_details', verifyToken, checkUserDetails)



export default user_router;