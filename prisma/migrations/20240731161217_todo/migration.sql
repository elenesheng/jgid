/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `description` to the `Todo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "createdAt",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "spentTime" INTEGER NOT NULL DEFAULT 0;
