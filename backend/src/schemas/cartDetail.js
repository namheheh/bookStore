import joi from "joi";

export const cartDetailSchema = joi.object({
    cart_id: joi.string().required(),
    productDetailId: joi.string().required(),
    quantity: joi.number(),
    status: joi.boolean
});