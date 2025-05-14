import { NextRequest } from "next/server";
import { InversorDTO } from "../dtos/inversorValidationDTO";
import prisma from "../lib/prisma";

export async function getInversores() {
  return prisma.inversor.findMany({ include: { usina: false } });
}


export async function createInversor(data: InversorDTO) {
    const exists = await prisma.inversor.findFirst({
        where: {
            nome: data.nome,
        },
    });
    if (exists) {
        const error = new Error("Este inversor já está associado a uma usina.");
        (error as any).status = 409;
        throw error;
    }

    const usinaExists = await prisma.usina.findUnique({ where: { id:data.usinaId } });
  if(!usinaExists){
        const error = new Error(`Usina de id ${data.usinaId} não encontrada.`);
    (error as any).status = 404;
    throw error;
  }
   
    return prisma.inversor.create({data});
}
