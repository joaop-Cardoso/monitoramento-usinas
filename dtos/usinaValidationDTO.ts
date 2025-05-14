import { z } from 'zod'

export const usinaSchema = z.object({
  nome: z.string().min(1).max(20)
})

export type UsinaDTO = z.infer<typeof usinaSchema>;

