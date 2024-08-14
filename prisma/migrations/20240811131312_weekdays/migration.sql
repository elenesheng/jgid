-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "weekdayId" TEXT;

-- CreateTable
CREATE TABLE "Weekday" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Weekday_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Weekday_name_key" ON "Weekday"("name");

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_weekdayId_fkey" FOREIGN KEY ("weekdayId") REFERENCES "Weekday"("id") ON DELETE CASCADE ON UPDATE CASCADE;
