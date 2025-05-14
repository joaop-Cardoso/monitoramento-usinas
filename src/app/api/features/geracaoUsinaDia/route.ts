import { NextRequest, NextResponse } from "next/server";
import { geracaoTotalUsina } from "../../../../../services/checagemServices";
import { tratarErro } from "../../../../../utils/tratamentoErros";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { usinaId, dataInicio, dataFim } = body;
        const geracaoUsinaCriada = await geracaoTotalUsina(usinaId, dataInicio, dataFim);
        return NextResponse.json(geracaoUsinaCriada);
    } catch (error) {
        return tratarErro(error);
    }
}