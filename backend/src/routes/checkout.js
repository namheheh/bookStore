import express from "express";
import { } from "../controller/payment";
import { createCheckout, getCheckout, getOneCheckout, removeCheckout, updateCheckout } from "../controller/checkout";
import { checkPermission } from "../middleware/checkPermission";
const checkoutRouter = express.Router();
//Them vao don hang
checkoutRouter.post('/checkout/add', createCheckout);
//lay thong tin don hang
checkoutRouter.get('/checkout',checkPermission, getCheckout);
checkoutRouter.get('/checkout/:id', getOneCheckout);
checkoutRouter.put('/checkout/:id/update',checkPermission, updateCheckout);
checkoutRouter.delete('/checkout/:id', checkPermission,removeCheckout);
export default checkoutRouter;