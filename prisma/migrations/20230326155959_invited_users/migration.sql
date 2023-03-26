/*
  Warnings:

  - You are about to drop the `Pool` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "InvitedStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_poolId_fkey";

-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_poolId_fkey";

-- DropTable
DROP TABLE "Pool";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Wallet";

-- DropEnum
DROP TYPE "TimeType";

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "poolId" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pools" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amountPerSprint" INTEGER NOT NULL,
    "sprintTime" INTEGER NOT NULL,
    "sprintTimeType" TEXT NOT NULL,
    "cycleTime" TEXT,
    "cycleTimeType" TEXT,
    "numberOfParticipants" INTEGER NOT NULL DEFAULT 3,
    "expectedTimeStart" TIMESTAMP(3),
    "inviteCode" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallets" (
    "accountNumber" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "poolId" TEXT NOT NULL,

    CONSTRAINT "Wallets_pkey" PRIMARY KEY ("accountNumber")
);

-- CreateTable
CREATE TABLE "InvitedMembers" (
    "id" TEXT NOT NULL,
    "status" "InvitedStatus" NOT NULL DEFAULT 'PENDING',
    "memberId" TEXT NOT NULL,
    "poolId" TEXT NOT NULL,

    CONSTRAINT "InvitedMembers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pools_title_key" ON "Pools"("title");

-- CreateIndex
CREATE INDEX "Pools_id_title_idx" ON "Pools"("id", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Wallets_accountNumber_key" ON "Wallets"("accountNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Wallets_poolId_key" ON "Wallets"("poolId");

-- CreateIndex
CREATE INDEX "Wallets_accountNumber_idx" ON "Wallets"("accountNumber");

-- CreateIndex
CREATE UNIQUE INDEX "InvitedMembers_id_key" ON "InvitedMembers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InvitedMembers_memberId_key" ON "InvitedMembers"("memberId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallets" ADD CONSTRAINT "Wallets_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pools"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitedMembers" ADD CONSTRAINT "InvitedMembers_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvitedMembers" ADD CONSTRAINT "InvitedMembers_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pools"("id") ON DELETE CASCADE ON UPDATE CASCADE;
