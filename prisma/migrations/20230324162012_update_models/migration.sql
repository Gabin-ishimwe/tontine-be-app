/*
  Warnings:

  - The `cycleTimeType` column on the `Pool` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sprintTimeType` column on the `Pool` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Pool" DROP COLUMN "cycleTimeType",
ADD COLUMN     "cycleTimeType" TEXT,
DROP COLUMN "sprintTimeType",
ADD COLUMN     "sprintTimeType" TEXT;
