/*
  Warnings:

  - You are about to drop the column `message` on the `Client` table. All the data in the column will be lost.
  - Added the required column `caseDetails` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monetaryRange` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problemType` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "message",
ADD COLUMN     "caseDetails" TEXT NOT NULL,
ADD COLUMN     "monetaryRange" TEXT NOT NULL,
ADD COLUMN     "problemType" TEXT NOT NULL;
