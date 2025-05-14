import { NextRequest } from "next/server";
import { ChecagemDTO } from "../dtos/checagemValidationDTO";
import prisma from "../lib/prisma";

export async function createChecagens(data: ChecagemDTO | ChecagemDTO[]) {
  if (Array.isArray(data)) {
    return await prisma.checagem.createMany({ data,
        skipDuplicates: true
    },);
  } else {
    return await prisma.checagem.create({ data });
  }
}

export function dataTransform(externalData: any | any[]) {
  const array = Array.isArray(externalData) ? externalData : [externalData];

  return array.map((item) => ({
    horario: new Date(item.datetime.$date),
    inversorId: item.inversor_id,
    potenciaAtivaWatt: item.potencia_ativa_watt,
    temperaturaCelsius: item.temperatura_celsius,
  }));
}

export async function getChecagens(){
    return prisma.checagem.findMany()
}