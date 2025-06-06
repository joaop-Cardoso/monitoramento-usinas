import { NextRequest } from "next/server";
import { ChecagemDTO } from "../dtos/checagemValidationDTO";
import { calcInvertersGeneration } from "../utils/calcularGeracaodeInversor";
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

export async function mediaTemperaturaDia(
  inversorId: number,
  dataInicio: string | Date,
  dataFim: string | Date
) {
  // Função para criar data em UTC
  function criarDataUTC(dateStr: string | Date, fimDoDia = false) {
    const data = typeof dateStr === 'string' ? dateStr : dateStr.toISOString().split('T')[0];
    const [ano, mes, dia] = data.split('-').map(Number);

    // Definindo a hora para 00:00 ou 23:59 dependendo de 'fimDoDia'
    const horas = fimDoDia ? 23 : 0;
    const minutos = fimDoDia ? 59 : 0;
    const segundos = fimDoDia ? 59 : 0;
    const milissegundos = fimDoDia ? 999 : 0;

    return new Date(Date.UTC(ano, mes - 1, dia, horas, minutos, segundos, milissegundos));
  }

  const inicio = criarDataUTC(dataInicio);
  const fim = criarDataUTC(dataFim, true);

  // Definir tipo para o resultado da consulta SQL
  type Resultado = {
    data: string;
    mediaTemperatura: number;
  };

  // Query SQL com tipo esperado para o resultado
  const resultado = await prisma.$queryRawUnsafe<Resultado[]>(
    `
    SELECT 
      DATE("horario") AS "data",
      AVG("temperaturaCelsius") AS "mediaTemperaturaCelsius"
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

  // Formatando as datas para o formato "dd|MM|yyyy"
  const resultadoFormatado = resultado.map((item) => {
    const dataFormatada = new Date(item.data);
    const dia = String(dataFormatada.getUTCDate()).padStart(2, '0');
    const mes = String(dataFormatada.getUTCMonth() + 1).padStart(2, '0');
    const ano = dataFormatada.getUTCFullYear();
    item.data = `${dia}|${mes}|${ano}`;
    return item;
  });

  return {
    success: true,
    body: resultadoFormatado,
  };
}

export async function geracaoTotalInversor(inversorId: number, dataInicio: string, dataFim: string) {
  const inversor = await prisma.inversor.findUnique({
    where: { id: inversorId },
    include: {
      checagens: {
        where: {
          horario: {
            gte: new Date(`${dataInicio}T00:00:00.000Z`),
            lte: new Date(`${dataFim}T23:59:59.999Z`)
          }
        },
        orderBy: { horario: 'asc' }
      }
    }
  });

  if (!inversor) {
    const error: any = new Error('Inversor não encontrado');
    error.status = 404;
    throw error;
  }

  const dados = [{
    power: inversor.checagens.map(checagem => ({
      value: checagem.potenciaAtivaWatt,
      date: checagem.horario
    }))
  }];

  const total = calcInvertersGeneration(dados);

  return {
    success: true,
    body: {
      inversorId,
      dataInicio,
      dataFim,
      geracaoTotalWh: total
    }
  };
}

export async function geracaoTotalUsina(usinaId: number, dataInicio: string, dataFim: string) {
  const usina = await prisma.usina.findUnique({
    where: { id: usinaId },
    include: {
      inversores: {
        include: {
          checagens: {
            where: {
              horario: {
                gte: new Date(`${dataInicio}T00:00:00.000Z`),
                lte: new Date(`${dataFim}T23:59:59.999Z`)
              }
            },
            orderBy: { horario: 'asc' }
          }
        }
      }
    }
  });

  if (!usina) {
    const error: any = new Error('Usina não encontrada');
    error.status = 404;
    throw error;
  }

  const dados = usina.inversores.map(inversor => ({
    power: inversor.checagens.map(checagem => ({
      value: checagem.potenciaAtivaWatt,
      date: checagem.horario
    }))
  }));

  const total = calcInvertersGeneration(dados);

  return {
    success: true,
    body: {
      usinaId,
      dataInicio,
      dataFim,
      geracaoTotalWh: total
    }
  };
}