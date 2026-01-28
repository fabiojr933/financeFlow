import { z } from 'zod'

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(4),
    address: z.string(),
  }),
})

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    address: z.string().optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
})