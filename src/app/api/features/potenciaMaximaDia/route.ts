import { NextRequest, NextResponse } from "next/server";
import { potenciaMaximaDia } from "../../../../../services/checagemServices";
import { tratarErro } from "../../../../../utils/tratamentoErros";


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { inversorId, dataInicio, dataFim } = body;
        const maximaPotenciaCriada = await potenciaMaximaDia(inversorId, dataInicio, dataFim);
        return NextResponse.json({ success: true, body: maximaPotenciaCriada});
    } catch (error) {
        return tratarErro(error);
    }
}