/*
  Warnings:

  - You are about to drop the column `caseDetails` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `monetaryRange` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `rut` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "caseDetails",
DROP COLUMN "monetaryRange",
DROP COLUMN "rut";
