import { NextRequest } from "next/server";
import { ChecagemDTO } from "../dtos/checagemValidationDTO";
import prisma from "../lib/prisma";

export async function createChecagens(data: ChecagemDTO | ChecagemDTO[]) {
  if (Array.isArray(data)) {
    return await prisma.checagem.createMany({
      data,
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

export async function getChecagens() {
  return prisma.checagem.findMany()
}

export async function potenciaMaximaDia(
  inversorId: number,
  dataInicio: string | Date,
  dataFim: string | Date
) {

  function criarDataUTC(dateStr: string | Date, fimDoDia = false) {
    const data = typeof dateStr === 'string' ? dateStr : dateStr.toISOString().split('T')[0];
    const [ano, mes, dia] = data.split('-').map(Number);
    return new Date(Date.UTC(ano, mes - 1, dia, fimDoDia ? 23 : 0, fimDoDia ? 59 : 0, fimDoDia ? 59 : 0, fimDoDia ? 999 : 0));
  }

  function formatarDataBR(dataIso: string) {
    const data = new Date(dataIso);
    const dia = String(data.getUTCDate()).padStart(2, '0');
    const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
    const ano = data.getUTCFullYear();
    return `${dia}|${mes}|${ano}`;
  }

  const inicio = criarDataUTC(dataInicio);
  const fim = criarDataUTC(dataFim, true);

  const result = await prisma.$queryRawUnsafe<
    { data: string; potenciaMaxima: number }[]
  >(
    `
    SELECT 
      DATE("horario") AS "data",
      MAX("potenciaAtivaWatt") AS "potenciaMaxima"
    FROM "Checagem"
    WHERE "inversorId" = $1
      AND "horario" BETWEEN $2 AND $3
    GROUP BY DATE("horario")
    ORDER BY DATE("horario")
    `,
    inversorId,
    inicio,
    fim
  );

  const resultadoFormatado = result.map(item => ({
    data: formatarDataBR(item.data),
    potenciaMaxima: item.potenciaMaxima,
  }));

  return resultadoFormatado;
}