import { z } from 'zod';

export const registerSchema = z
  .object({
    FirstName: z.string().min(2, 'First name must be at least 2 characters'),
    LastName: z.string().min(2, 'Last name must be at least 2 characters'),
    Email: z.string().email('Please enter a valid email address'),
    Password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    ConfirmPassword: z.string(),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "Passwords don't match",
    path: ['ConfirmPassword'],
  });

export const loginSchema = z.object({
  Email: z.string().email('Please enter a valid email address'),
  Password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  Email: z.string().email('Please enter a valid email address'),
});

export const resetPasswordSchema = z
  .object({
    Token: z.string(),
    NewPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain one uppercase letter')
      .regex(/[0-9]/, 'Must contain one number'),
    ConfirmPassword: z.string(),
  })
  .refine((data) => data.NewPassword === data.ConfirmPassword, {
    message: "Passwords don't match",
    path: ['ConfirmPassword'],
  });

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export type LoginFormData = z.infer<typeof loginSchema>;

export type RegisterFormData = z.infer<typeof registerSchema>;
