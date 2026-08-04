-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('ADMIN');

-- CreateTable
CREATE TABLE "restaurantes" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "rol" "RolUsuario" NOT NULL DEFAULT 'ADMIN',
    "restauranteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "restauranteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "platos" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" DECIMAL(10,2) NOT NULL,
    "imagenUrl" TEXT,
    "modelo3dUrl" TEXT,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "restauranteId" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "platos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurantes_slug_key" ON "restaurantes"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_username_key" ON "usuarios"("username");

-- CreateIndex
CREATE INDEX "usuarios_restauranteId_idx" ON "usuarios"("restauranteId");

-- CreateIndex
CREATE INDEX "categorias_restauranteId_idx" ON "categorias"("restauranteId");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_restauranteId_nombre_key" ON "categorias"("restauranteId", "nombre");

-- CreateIndex
CREATE INDEX "platos_restauranteId_idx" ON "platos"("restauranteId");

-- CreateIndex
CREATE INDEX "platos_restauranteId_categoriaId_idx" ON "platos"("restauranteId", "categoriaId");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_restauranteId_fkey" FOREIGN KEY ("restauranteId") REFERENCES "restaurantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categorias" ADD CONSTRAINT "categorias_restauranteId_fkey" FOREIGN KEY ("restauranteId") REFERENCES "restaurantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platos" ADD CONSTRAINT "platos_restauranteId_fkey" FOREIGN KEY ("restauranteId") REFERENCES "restaurantes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "platos" ADD CONSTRAINT "platos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
