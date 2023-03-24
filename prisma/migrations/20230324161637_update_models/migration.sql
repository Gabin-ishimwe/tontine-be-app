/*
  Warnings:

  - You are about to alter the column `amount` on the `Wallet` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- CreateEnum
CREATE TYPE "TimeType" AS ENUM ('DAYS', 'WEEKS', 'MONTHS');

-- AlterTable
ALTER TABLE "Pool" ADD COLUMN     "cycleTimeType" "TimeType" DEFAULT 'DAYS',
ADD COLUMN     "sprintTimeType" "TimeType" DEFAULT 'DAYS';

-- AlterTable
ALTER TABLE "Wallet" ALTER COLUMN "amount" SET DATA TYPE INTEGER;
