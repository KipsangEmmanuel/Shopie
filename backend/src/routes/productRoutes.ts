import { Router } from "express";
import { createProduct, fetchOneProduct, fetchProducts } from "../controllers/productController";

const products_router = Router()

products_router.post('/create', createProduct);
products_router.get('/all', fetchProducts);
products_router.get('/:product_id', fetchOneProduct);

export default products_router;