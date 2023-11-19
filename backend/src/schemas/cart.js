import { cartDetailSchema } from "./cartDetail";

export const cartSchema = Joi.object({
    user_id: Joi.string().required(),
    products: Joi.array().items(cartDetailSchema),
});