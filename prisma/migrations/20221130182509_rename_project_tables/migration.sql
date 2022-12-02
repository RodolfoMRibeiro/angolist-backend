/*
  Warnings:

  - You are about to drop the `tb_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_project_surveys` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tb_project_surveys" DROP CONSTRAINT "tb_project_surveys_project_id_fkey";

-- DropForeignKey
ALTER TABLE "tb_project_surveys" DROP CONSTRAINT "tb_project_surveys_question_id_fkey";

-- DropForeignKey
ALTER TABLE "tb_projects" DROP CONSTRAINT "tb_projects_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tb_questions" DROP CONSTRAINT "tb_questions_category_id_fkey";

-- DropTable
DROP TABLE "tb_categories";

-- DropTable
DROP TABLE "tb_project_surveys";

-- DropTable
DROP TABLE "tb_projects";

-- DropTable
DROP TABLE "tb_questions";

-- DropTable
DROP TABLE "tb_users";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "right_answer" BOOLEAN NOT NULL,
    "feedback_title" TEXT NOT NULL,
    "feedback_description" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project_survey" (
    "question_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "Project_survey_pkey" PRIMARY KEY ("question_id","project_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Question_category_id_key" ON "Question"("category_id");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_survey" ADD CONSTRAINT "Project_survey_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project_survey" ADD CONSTRAINT "Project_survey_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
