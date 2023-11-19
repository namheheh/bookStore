import joi from "joi";

export const checkoutSchema = joi.object({
    products: joi.array().required(),
    user_id: joi.string().required(),
    dateCreate: joi.string(),
    total: joi.number(),
    address: joi.string().required(),
    status: joi.string(),
    Note: joi.string(),
    fullName: joi.string().required(),
    email: joi.string().required(),
    tel: joi.number().required(),
    voucherCode: joi.string(),
    shipping: joi.string().required(),
    payment_id: joi.string().required(),
    PaymentAmount: joi.number(),
});