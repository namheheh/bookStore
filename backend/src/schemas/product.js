import joi from "joi";

export const productSchema = joi.object({
    name: joi.string().required(),
    images: joi.array().required(),
    price: joi.number().required(),
    price_sale: joi.number(),
    author_id: joi.string().required(),
    publisher: joi.string().required(),
    content: joi.string().required(),
    description: joi.string(),
    rate: joi.number(),
    quantity: joi.number().required,
});