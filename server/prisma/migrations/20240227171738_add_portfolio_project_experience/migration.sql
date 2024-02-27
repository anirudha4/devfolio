-- CreateTable
CREATE TABLE "portfolio" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "heroTitle" TEXT NOT NULL,
    "heroSubtitle" TEXT NOT NULL,
    "aboutMe" TEXT,
    "skills" TEXT[],
    "contactDetails" JSONB NOT NULL,
    "experienceId" TEXT,
    "userId" TEXT,

    CONSTRAINT "portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "techStack" TEXT[],

    CONSTRAINT "project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experience" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT,
    "techStack" TEXT[],

    CONSTRAINT "experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_portfolioToproject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_experienceToportfolio" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_portfolioToproject_AB_unique" ON "_portfolioToproject"("A", "B");

-- CreateIndex
CREATE INDEX "_portfolioToproject_B_index" ON "_portfolioToproject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_experienceToportfolio_AB_unique" ON "_experienceToportfolio"("A", "B");

-- CreateIndex
CREATE INDEX "_experienceToportfolio_B_index" ON "_experienceToportfolio"("B");

-- AddForeignKey
ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_portfolioToproject" ADD CONSTRAINT "_portfolioToproject_A_fkey" FOREIGN KEY ("A") REFERENCES "portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_portfolioToproject" ADD CONSTRAINT "_portfolioToproject_B_fkey" FOREIGN KEY ("B") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_experienceToportfolio" ADD CONSTRAINT "_experienceToportfolio_A_fkey" FOREIGN KEY ("A") REFERENCES "experience"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_experienceToportfolio" ADD CONSTRAINT "_experienceToportfolio_B_fkey" FOREIGN KEY ("B") REFERENCES "portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
