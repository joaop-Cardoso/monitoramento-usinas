/*
  Warnings:

  - You are about to drop the column `potencia_ativa_watt` on the `Checagem` table. All the data in the column will be lost.
  - You are about to drop the column `temperatura_celsius` on the `Checagem` table. All the data in the column will be lost.
  - Added the required column `potenciaAtivaWatt` to the `Checagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temperaturaCelsius` to the `Checagem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Checagem" DROP COLUMN "potencia_ativa_watt",
DROP COLUMN "temperatura_celsius",
ADD COLUMN     "potenciaAtivaWatt" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "temperaturaCelsius" DOUBLE PRECISION NOT NULL;
