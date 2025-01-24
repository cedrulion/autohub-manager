import express from 'express';
const router = express.Router();
import cartController from '../controllers/cartController.js';
import checkAuth from '../middleware/checkAuthentication.js';

router.post('/add-to-cart', checkAuth, cartController.addToCart);
router.get('/user', checkAuth, cartController.getCartForUser);
router.get('/all', cartController.getAllCartItems);
router.delete('/productcart/:id', cartController.deleteProductItemById); 
router.delete('/clear-cart', checkAuth, cartController.clearCartForUser);
router.put('/update-order-status',  cartController.updateOrderStatus);
router.get('/order-status/:cartItemId', checkAuth, cartController.getOrderStatus);
router.post('/book-appointment', checkAuth, cartController.bookAppointment);
router.get('/all-appointments', cartController.getAllAppointmentsForUser);
router.get('/count-all-cart-products', cartController.countAllCartProducts);
router.get('/top-selling-product', cartController.getTopSellingProduct);


export default router;
