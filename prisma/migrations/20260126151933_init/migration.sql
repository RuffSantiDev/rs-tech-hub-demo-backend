/*
  Warnings:

  - The values [DELETED] on the enum `UserStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `invalidatedAt` on the `ActivationToken` table. All the data in the column will be lost.
  - You are about to drop the column `revoked` on the `RefreshToken` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "UserActivityType" ADD VALUE 'SOFT_DELETE';
ALTER TYPE "UserActivityType" ADD VALUE 'SCHEDULE_DELETION';
ALTER TYPE "UserActivityType" ADD VALUE 'REQUEST_PASSWORD_RESET';
ALTER TYPE "UserActivityType" ADD VALUE 'UPDATE_ROLE';

-- AlterEnum
BEGIN;
CREATE TYPE "UserStatus_new" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE', 'DISABLED', 'SOFT_DELETED', 'SCHEDULED_DELETION');
ALTER TABLE "public"."User" ALTER COLUMN "Status" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "Status" TYPE "UserStatus_new" USING ("Status"::text::"UserStatus_new");
ALTER TYPE "UserStatus" RENAME TO "UserStatus_old";
ALTER TYPE "UserStatus_new" RENAME TO "UserStatus";
DROP TYPE "public"."UserStatus_old";
ALTER TABLE "User" ALTER COLUMN "Status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "ActivationToken" DROP COLUMN "invalidatedAt",
ADD COLUMN     "isRevoked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "revokedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "revoked",
ADD COLUMN     "isRevoked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "revokedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "disabledAt" TIMESTAMP(3),
ADD COLUMN     "isScheduledForDeletion" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "scheduledDeletionAt" TIMESTAMP(3),
ADD COLUMN     "softDeletedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "isRevoked" BOOLEAN NOT NULL DEFAULT false,
    "revokedAt" TIMESTAMP(3),

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_tokenHash_key" ON "PasswordResetToken"("tokenHash");

-- CreateIndex
CREATE INDEX "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId");

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
