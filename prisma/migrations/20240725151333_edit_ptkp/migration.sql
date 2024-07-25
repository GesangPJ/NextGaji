/*
  Warnings:

  - You are about to alter the column `k0` on the `Ptkp` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `k1` on the `Ptkp` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `k2` on the `Ptkp` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `k3` on the `Ptkp` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `ki0` on the `Ptkp` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `ki1` on the `Ptkp` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `ki2` on the `Ptkp` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `ki3` on the `Ptkp` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `tk0` on the `Ptkp` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `tk1` on the `Ptkp` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `tk2` on the `Ptkp` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.
  - You are about to alter the column `tk3` on the `Ptkp` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `BigInt`.

*/
-- AlterTable
ALTER TABLE "Ptkp" ALTER COLUMN "k0" SET DATA TYPE BIGINT,
ALTER COLUMN "k1" SET DATA TYPE BIGINT,
ALTER COLUMN "k2" SET DATA TYPE BIGINT,
ALTER COLUMN "k3" SET DATA TYPE BIGINT,
ALTER COLUMN "ki0" SET DATA TYPE BIGINT,
ALTER COLUMN "ki1" SET DATA TYPE BIGINT,
ALTER COLUMN "ki2" SET DATA TYPE BIGINT,
ALTER COLUMN "ki3" SET DATA TYPE BIGINT,
ALTER COLUMN "tk0" SET DATA TYPE BIGINT,
ALTER COLUMN "tk1" SET DATA TYPE BIGINT,
ALTER COLUMN "tk2" SET DATA TYPE BIGINT,
ALTER COLUMN "tk3" SET DATA TYPE BIGINT;
