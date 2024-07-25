/*
  Warnings:

  - You are about to drop the column `tunjangan_anak` on the `Gaji` table. All the data in the column will be lost.
  - You are about to drop the column `tunjangan_jabatan` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Gaji" DROP COLUMN "tunjangan_anak",
ADD COLUMN     "tunjangan_lainnya" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "tunjangan_jabatan";

-- CreateTable
CREATE TABLE "Tunjangan" (
    "id" SERIAL NOT NULL,
    "tunjangan_lainnya" INTEGER DEFAULT 0,
    "tunjangan_internet" INTEGER DEFAULT 0,
    "tunjangan_makan" INTEGER DEFAULT 0,
    "tunjangan_transport" INTEGER DEFAULT 0,

    CONSTRAINT "Tunjangan_pkey" PRIMARY KEY ("id")
);
