import { NextRequest, NextResponse } from "next/server";
import { tratarErro } from "../../../../utils/tratamentoErros";
import { inversorSchema } from "../../../../dtos/inversorValidationDTO";
import { createInversor, getInversores } from "../../../../services/inversorServices";

export async function POST(request: NextRequest) {

    try {
        const body = await request.json()
        const data = inversorSchema.parse(body);
        const createdUsina = await createInversor(data)

        return NextResponse.json({ succes: true, body: createdUsina}, { status: 201 })
    } catch(error) {
           return tratarErro(error);
    }
}

export async function GET(request: NextRequest) {

    try {
        const data = await getInversores()
        return NextResponse.json({ succes: true, body: data})
    } catch(error) {
           return tratarErro(error);
    }
}
