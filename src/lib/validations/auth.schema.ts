import * as z from "zod";

//! Validation Schemas
export const nameSchema = z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must be less than 100 characters long");

export const emailSchema = z.email("Please enter a valid email address");

export const passwordSchema = z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be less than 100 characters long");

export const confirmPasswordSchema = z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be less than 100 characters long");

// export const roleSchema = z
//     .enum(["seller", "admin"], {
//         message: "Status must be either seller or admin",
//     })
//     .optional()
//     .default("seller");

//! Signup Schema
export const signupSchema = z
    .object({
        name: nameSchema,
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: confirmPasswordSchema,
        // role: roleSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export type SignupFormValues = z.infer<typeof signupSchema>;


//! Login Schema
export const loginSchema = z
    .object({
        email: emailSchema,
        password: passwordSchema,
    })

export type LoginFormValues = z.infer<typeof loginSchema>;