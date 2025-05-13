import { UsinaDTO } from "../dtos/usinaValidationDTO";
import prisma from "../lib/prisma";

export async function getUsinas() {
  return prisma.usina.findMany({ include: { inversores: true } });
}

export async function createUsina(data: UsinaDTO) {
  const exists = await prisma.usina.findFirst({
    where: { nome: data.nome },
  });

 if (exists) {
    const error = new Error("Já existe uma usina com esse nome.");
    (error as any).status = 409;
    throw error;
  }
  return prisma.usina.create({ data });
}