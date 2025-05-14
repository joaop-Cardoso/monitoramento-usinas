import { NextRequest } from "next/server";
import { InversorDTO } from "../dtos/inversorValidationDTO";
import prisma from "../lib/prisma";

export async function getInversores() {
  return prisma.inversor.findMany({ include: { usina: false } });
}

export  function getIdFromParams(request: NextRequest): number {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  if (!id || isNaN(Number(id))) {
    throw { status: 400, message: "ID inválido." };
  }
  return Number(id);
}

export async function getInversorById(externalId: number) {
  const exists = await prisma.inversor.findUnique({ where: { id:externalId } });
  if(!exists){
        const error = new Error(`Inversor de id ${externalId} não encontrado.`);
    (error as any).status = 404;
    throw error;
  }
  return exists;
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

export async function updateInversor(externalId: number, data: InversorDTO) {
  
const exists = await prisma.inversor.findUnique({ where: { id:externalId } });
  if(!exists){
        const error = new Error(`Inversor de id ${externalId} não encontrado.`);
    (error as any).status = 404;
    throw error;
  }
    const usinaExists = await prisma.usina.findUnique({ where: { id:data.usinaId } });
  if(!usinaExists){
        const error = new Error(`Usina de id ${data.usinaId} não encontrada.`);
    (error as any).status = 404;
    throw error;
  }
    return await prisma.inversor.update({
    where: { id:externalId },
    data,
  });
}

export async function deleteInversor(externalIdid: number) {
  const exists = await prisma.inversor.findUnique({ where: { id:externalIdid } });
  if(!exists){
        const error = new Error(`Inversor de id ${externalIdid} não encontrado.`);
    (error as any).status = 404;
    throw error;
  }
  return prisma.inversor.delete({ where: { id:externalIdid } });
}