import { z } from 'zod'

export const checagemSchema = z.object({
  horario: z.coerce.date(),
  potenciaAtivaWatt: z.number(),
  temperaturaCelsius: z.number(),
  inversorId: z.number().int().positive()
})

export const checagemArraySchema = z.union([
  checagemSchema,
  z.array(checagemSchema)
]);

export type ChecagemDTO = z.infer<typeof checagemSchema>;