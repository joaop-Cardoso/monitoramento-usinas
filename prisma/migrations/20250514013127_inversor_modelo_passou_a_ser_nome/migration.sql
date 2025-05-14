/*
  Warnings:

  - You are about to drop the column `modelo` on the `Inversor` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Inversor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inversor" DROP COLUMN "modelo",
ADD COLUMN     "nome" TEXT NOT NULL;
