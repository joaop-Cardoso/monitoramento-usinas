import { NextRequest, NextResponse } from "next/server";
import { createUsina, getUsinas } from "../../../../services/usinaServices";
import { usinaSchema } from "../../../../dtos/usinaValidationDTO";
import { tratarErro } from "../../../../utils/tratamentoErros";

export async function POST(request: NextRequest) {

    try {
        const body = await request.json()
        const data = usinaSchema.parse(body);
        const createdUsina = await createUsina(data)

        return NextResponse.json({ succes: true, body: createdUsina}, { status: 201 })
    } catch(error) {
           return tratarErro(error);
    }
}

export async function GET(request: NextRequest) {

    try {
        const data = await getUsinas()
        return NextResponse.json({ succes: true, body: data})
    } catch(error) {
           return tratarErro(error);
    }
}
