import { Router } from "express";
const router = Router();

//CONTROLLERS
import * as productController from '../controllers/products.controller';
//MIDDLEWARE
import { authJwt } from '../middlewares'

router.get('/', productController.getProducts);
router.get('/:productId', productController.getProductById);
router.post('/', [authJwt.verifyToken, authJwt.isAdmin], productController.createProduct);
router.put('/:productId', [authJwt.verifyToken, authJwt.isModerator], productController.updateProductById);
router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productController.deleteProductById);

export default router;