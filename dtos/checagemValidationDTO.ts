import { z } from 'zod'

export const checagemSchema = z.object({
  horario: z.coerce.date(),
  potenciaAtivaWatt: z.number(),
  temperaturaCelsius: z.number(),
  inversorId: z.number().int().positive()
})

export type ChecagemDTO = z.infer<typeof checagemSchema>;