import joi from "joi";

export const paymentSchema = joi.object({
    name: joi.string().required()
});