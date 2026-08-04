-- CreateEnum
CREATE TYPE "Etiqueta" AS ENUM ('APTO_CELIACO', 'VEGETARIANO', 'PICANTE');

-- AlterTable
ALTER TABLE "platos" ADD COLUMN     "etiquetas" "Etiqueta"[] DEFAULT ARRAY[]::"Etiqueta"[];

-- AlterTable
ALTER TABLE "restaurantes" ADD COLUMN     "bannerUrl" TEXT,
ADD COLUMN     "direccion" TEXT,
ADD COLUMN     "googleMapsUrl" TEXT,
ADD COLUMN     "horarioTexto" TEXT,
ADD COLUMN     "instagramUrl" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "telefono" TEXT,
ADD COLUMN     "tiktokUrl" TEXT,
ADD COLUMN     "wifiNombre" TEXT,
ADD COLUMN     "wifiPassword" TEXT;
