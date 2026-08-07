import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: 'postgresql://menu_admin:menu_pass@localhost:5432/menu_db?schema=public',
});
const prisma = new PrismaClient({ adapter });

const ID = 'bbec0e51-8c7d-4cfa-81fc-f65b380e8fd0'; // Café con Leche
const PALABRA_LARGA =
  'Estotieneunapalabraunicaenormequenotieneningunespacioenmedioparaverificarsidesborda';

(async () => {
  const original = await prisma.plato.findUniqueOrThrow({ where: { id: ID } });
  console.log('ORIGINAL GUARDADO:', JSON.stringify(original.descripcion));

  await prisma.plato.update({ where: { id: ID }, data: { descripcion: PALABRA_LARGA } });
  console.log('seteado texto de prueba, listo para curl');
  await prisma.$disconnect();
})();
