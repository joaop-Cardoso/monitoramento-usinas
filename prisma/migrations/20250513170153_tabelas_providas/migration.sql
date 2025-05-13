-- CreateTable
CREATE TABLE "Usina" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Usina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inversor" (
    "id" SERIAL NOT NULL,
    "modelo" TEXT NOT NULL,
    "usinaId" INTEGER NOT NULL,

    CONSTRAINT "Inversor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Checagem" (
    "id" SERIAL NOT NULL,
    "horario" TIMESTAMP(3) NOT NULL,
    "inversorId" INTEGER NOT NULL,
    "potencia_ativa_watt" DOUBLE PRECISION NOT NULL,
    "temperatura_celsius" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Checagem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inversor" ADD CONSTRAINT "Inversor_usinaId_fkey" FOREIGN KEY ("usinaId") REFERENCES "Usina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checagem" ADD CONSTRAINT "Checagem_inversorId_fkey" FOREIGN KEY ("inversorId") REFERENCES "Inversor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
