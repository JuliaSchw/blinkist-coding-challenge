-- CreateTable
CREATE TABLE "PageView" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "variation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PageView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Click" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "variation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Click_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PageView_userId_variation_idx" ON "PageView"("userId", "variation");

-- CreateIndex
CREATE UNIQUE INDEX "Click_userId_variation_key" ON "Click"("userId", "variation");
