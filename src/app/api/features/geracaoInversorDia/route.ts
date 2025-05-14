import { NextRequest, NextResponse } from "next/server";
import { geracaoTotalInversor } from "../../../../../services/checagemServices";
import { tratarErro } from "../../../../../utils/tratamentoErros";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { inversorId, dataInicio, dataFim } = body;
        const geracaoInversorCriada = await geracaoTotalInversor(inversorId, dataInicio, dataFim);
        return NextResponse.json(geracaoInversorCriada);
    } catch (error) {
        return tratarErro(error);
    }
}