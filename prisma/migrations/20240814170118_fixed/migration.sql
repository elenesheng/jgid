/*
  Warnings:

  - You are about to drop the column `weekdayName` on the `Todo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_weekdayName_fkey";

-- DropIndex
DROP INDEX "Weekday_name_key";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "weekdayName",
ADD COLUMN     "weekdayId" TEXT;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_weekdayId_fkey" FOREIGN KEY ("weekdayId") REFERENCES "Weekday"("id") ON DELETE CASCADE ON UPDATE CASCADE;
