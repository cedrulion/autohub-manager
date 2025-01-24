const express = require('express');
const router = express.Router();
const productController = require ("../controllers/productController");

router.post("/addproduct", productController.createProduct);
router.get("/product/:id", productController.getProductById);
router.get("/allproduct", productController.getAllProducts); 
router.delete('/product/:id', productController.deleteProductById); 
router.put('/product/:id/rate', productController.rateProductById);
router.get('/product-count', productController.getProductCount);

module.exports = router;







