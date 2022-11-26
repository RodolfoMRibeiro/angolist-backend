-- CreateTable
CREATE TABLE "tb_users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_projects" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tb_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_questions" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "right_answer" BOOLEAN NOT NULL,
    "feedback_title" TEXT NOT NULL,
    "feedback_description" TEXT NOT NULL,

    CONSTRAINT "tb_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_project_surveys" (
    "question_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "tb_project_surveys_pkey" PRIMARY KEY ("question_id","project_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_users_email_key" ON "tb_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_questions_category_id_key" ON "tb_questions"("category_id");

-- AddForeignKey
ALTER TABLE "tb_projects" ADD CONSTRAINT "tb_projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_questions" ADD CONSTRAINT "tb_questions_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "tb_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_project_surveys" ADD CONSTRAINT "tb_project_surveys_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "tb_questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_project_surveys" ADD CONSTRAINT "tb_project_surveys_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "tb_projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
