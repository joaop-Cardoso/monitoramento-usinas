import { NextRequest, NextResponse } from "next/server";
import { tratarErro } from "../../../../utils/tratamentoErros";
import { checagemArraySchema} from "../../../../dtos/checagemValidationDTO";
import { createChecagens, dataTransform, getChecagens } from "../../../../services/checagemServices";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const transformedData = dataTransform(body)
    const data = checagemArraySchema.parse(transformedData);
    const createdChecagem = await createChecagens(data)

    return NextResponse.json({ success: true, body: createdChecagem});
  } catch (error) {
    return tratarErro(error);
  }
}

export async function GET() {
  try {
    const data = await getChecagens()
    return NextResponse.json({ success: true, body: data});
  } catch (error) {
    return tratarErro(error);
  }
}