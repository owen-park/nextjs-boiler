import { z } from 'zod';

export type LoginForm = {
	loginId: string;
	password: string;
};

export const LoginSchema = z.object({
  loginId: z.string().min(1),
  password: z.string().min(1),
});
