import { NextRequest } from "next/server";
import { UsinaDTO } from "../dtos/usinaValidationDTO";
import prisma from "../lib/prisma";

export  function getIdFromParams(request: NextRequest): number {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // pega o [id] do final da URL
  if (!id || isNaN(Number(id))) {
    throw { status: 400, message: "ID inválido." };
  }
  return Number(id);
}

export async function getUsinas() {
  return prisma.usina.findMany({ include: { inversores: true } });
}

export async function getUsinaById(id: number) {
  const exists = await prisma.usina.findUnique({ where: { id }, include: { inversores: true }}, );
  if(!exists){
        const error = new Error(`Usina de id ${id} não encontrada.`);
    (error as any).status = 404;
    throw error;
  }
  return exists;
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

export async function updateUsina(id: number, data: UsinaDTO) {
  
const exists = await prisma.usina.findUnique({ where: { id } });
  if(!exists){
        const error = new Error(`Usina de id ${id} não encontrada.`);
    (error as any).status = 404;
    throw error;
  }
    return await prisma.usina.update({
    where: { id },
    data,
  });
}

export async function deleteUsina(id: number) {
  const exists = await prisma.usina.findUnique({ where: { id } });
  if(!exists){
        const error = new Error(`Usina de id ${id} não encontrada.`);
    (error as any).status = 404;
    throw error;
  }
  return prisma.usina.delete({ where: { id } });
}