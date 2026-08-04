-- AlterTable
ALTER TABLE "platos" DROP COLUMN "etiquetas";

-- DropEnum
DROP TYPE "Etiqueta";

-- CreateTable
CREATE TABLE "etiquetas" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "restauranteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "etiquetas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EtiquetaToPlato" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EtiquetaToPlato_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "etiquetas_restauranteId_idx" ON "etiquetas"("restauranteId");

-- CreateIndex
CREATE UNIQUE INDEX "etiquetas_restauranteId_nombre_key" ON "etiquetas"("restauranteId", "nombre");

-- CreateIndex
CREATE INDEX "_EtiquetaToPlato_B_index" ON "_EtiquetaToPlato"("B");

-- AddForeignKey
ALTER TABLE "etiquetas" ADD CONSTRAINT "etiquetas_restauranteId_fkey" FOREIGN KEY ("restauranteId") REFERENCES "restaurantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EtiquetaToPlato" ADD CONSTRAINT "_EtiquetaToPlato_A_fkey" FOREIGN KEY ("A") REFERENCES "etiquetas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EtiquetaToPlato" ADD CONSTRAINT "_EtiquetaToPlato_B_fkey" FOREIGN KEY ("B") REFERENCES "platos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
