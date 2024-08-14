/*
  Warnings:

  - You are about to drop the column `weekdayId` on the `Todo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_weekdayId_fkey";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "weekdayId",
ADD COLUMN     "weekdayName" TEXT;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_weekdayName_fkey" FOREIGN KEY ("weekdayName") REFERENCES "Weekday"("name") ON DELETE CASCADE ON UPDATE CASCADE;
