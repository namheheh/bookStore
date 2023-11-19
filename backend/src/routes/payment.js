import express from "express";
import { createPayment, getOnePayment, getPayment, removePayment, updatePayment } from "../controller/payment";
import { checkPermission } from "../middleware/checkPermission";
const paymentRouter = express.Router();
//Them vao don hang

paymentRouter.post('/payment/add',checkPermission, createPayment);
paymentRouter.get('/payment', getPayment);
paymentRouter.get('/payment/:id', getOnePayment);
paymentRouter.put('/payment/:id/update',checkPermission, updatePayment);
paymentRouter.delete('/payment/:id',checkPermission,removePayment);
export default paymentRouter;