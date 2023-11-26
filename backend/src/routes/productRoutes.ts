import { Router } from "express";
import { createProduct, fetchProducts } from "../controllers/productController";

const products_router = Router()

products_router.post('/create', createProduct);
products_router.get('/all', fetchProducts);

export default products_router;