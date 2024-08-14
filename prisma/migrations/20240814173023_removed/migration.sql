/*
  Warnings:

  - You are about to drop the column `weekdayId` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the `Weekday` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_weekdayId_fkey";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "weekdayId",
ADD COLUMN     "weekday" TEXT;

-- DropTable
DROP TABLE "Weekday";
