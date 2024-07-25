-- AlterTable
ALTER TABLE "Bpjs" ALTER COLUMN "bpjskes_perusahaan" DROP NOT NULL,
ALTER COLUMN "bpjsjht_perusahaan" DROP NOT NULL,
ALTER COLUMN "bpjsjkk_perusahaan" DROP NOT NULL,
ALTER COLUMN "bpjsjkm_perusahaan" DROP NOT NULL,
ALTER COLUMN "bpjsjp_perusahaan" DROP NOT NULL,
ALTER COLUMN "bpjskes_peg" DROP NOT NULL,
ALTER COLUMN "bpjsjht_peg" DROP NOT NULL,
ALTER COLUMN "bpjsjp_peg" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Pph21" ALTER COLUMN "nama_pph21" DROP NOT NULL,
ALTER COLUMN "nilai_pph21" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Ptkp" ALTER COLUMN "nama_ptkp" DROP NOT NULL,
ALTER COLUMN "nilai_ptkp" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "jabatan" DROP NOT NULL;
