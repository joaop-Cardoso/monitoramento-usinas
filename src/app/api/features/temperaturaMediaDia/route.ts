import { NextRequest, NextResponse } from "next/server";
import { mediaTemperaturaDia } from "../../../../../services/checagemServices";
import { tratarErro } from "../../../../../utils/tratamentoErros";



export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { inversorId, dataInicio, dataFim } = body;
        const mediaTemperaturaCriada = await mediaTemperaturaDia(inversorId, dataInicio, dataFim);
        return NextResponse.json({ success: true, body: mediaTemperaturaCriada});
    } catch (error) {
        return tratarErro(error);
    }
}