import express from 'express';
import { getCart, addToCart, getCartDetail, tokenUser, removeCartDetail, updateCart } from '../controller/cart';
const cartRouter = express.Router();

// Thêm sản phẩm vào giỏ hàng
cartRouter.post('/cart/token', tokenUser);
cartRouter.post('/cart/add/:productDetailId/:user_id', addToCart);

// Lấy thông tin giỏ hàng
cartRouter.get('/cart/:id', getCart);
cartRouter.get('/cart/cart-detail', getCartDetail);
cartRouter.get('/cartDetail/:id', getCartDetail)
cartRouter.delete('/cartDetail/:id', removeCartDetail)
cartRouter.put('/cartDetail/:id/update', updateCart)


export default cartRouter;
