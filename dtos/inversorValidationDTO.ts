import { z } from 'zod'

export const inversorSchema = z.object({
  nome: z.string().min(1).max(20),
  usinaId: z.number().int().positive()
})

export type InversorDTO = z.infer<typeof inversorSchema>;