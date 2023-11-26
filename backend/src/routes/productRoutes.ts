import { Router } from "express";
import { createProduct } from "../controllers/productController";

const products_router = Router()

products_router.post('/create', createProduct)

export default products_router;