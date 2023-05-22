import z from 'zod';

export const productZodSchema = z.object
(
    {
        code: z.string({required_error:'code is required',invalid_type_error:'code must be a string'}),
        title:z.string({required_error:'title is required',invalid_type_error:'title must be a string'}),
        description:z.string({required_error:'description is required',invalid_type_error:'description must be a string'}),
        price:z.number({required_error:'price is required',invalid_type_error:'price must be a number'}),
        thumbnail:z.array(z.string({required_error:'thumnail is required',invalid_type_error:'thumbail must be a string'})),
        stock:z.number({required_error:'stock is required',invalid_type_error:'stock must be a number'}),
        status:z.boolean({required_error:'status is required',invalid_type_error:'status must be a boolean'}),
        category:z.string({required_error:'category is required',invalid_type_error:'category must be a string'})
    }
);

export const userZodSchema = z.object
(
    {
        firstName: z.string({required_error:'firstName is required',invalid_type_error:'firstName must be a string'}),
        lastName:z.string({required_error:'lastName is required',invalid_type_error:'lastName must be a string'}),
        email:z.string({required_error:'email is required'}).email({message:'email must be like email@email.com'}),
        password:z.string({required_error:'password is required',invalid_type_error:'password must be a string'}),
        age:z.number({required_error:'age is required',invalid_type_error:'age must be a number'}),
    }
);

export const loginValidation = z.object
(
    {
        email:z.string({required_error:'email is required'}).email({message:'email must be like email@email.com'}),
        password:z.string({required_error:'password is required',invalid_type_error:'password must be a string'}),
    }
);

export const idValidation = z.string().length(24);

export const updateCartValidation = z.array(
        z.object({
            pid:z.string().length(24),
            quantity: z.number()
        })
);