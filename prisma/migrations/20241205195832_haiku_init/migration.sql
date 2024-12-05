-- CreateTable
CREATE TABLE "haiku" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,
    "line1" TEXT NOT NULL,
    "line2" TEXT NOT NULL,
    "line3" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "haiku_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "haiku_id_key" ON "haiku"("id");

-- AddForeignKey
ALTER TABLE "haiku" ADD CONSTRAINT "haiku_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
