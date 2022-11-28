-- AlterTable
ALTER TABLE "tb_projects" ALTER COLUMN "deleted_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tb_users" ALTER COLUMN "deleted_at" DROP NOT NULL;
