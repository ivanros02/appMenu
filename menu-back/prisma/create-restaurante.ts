import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const SALT_ROUNDS = 10;
const SLUG_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const USO =
  'Uso: DATABASE_URL="postgresql://menu_yyv9_user:@dpg--a.oregon-postgres.render.com/menu_yyv9?sslmode=require" pnpm provision:restaurante -- --slug=thionis --nombre="Thionis" --usuario=admin --password="123456';

interface Args {
  slug: string;
  nombre: string;
  usuario: string;
  password: string;
}

function parseArgs(): Args {
  const raw = new Map<string, string>();

  for (const arg of process.argv.slice(2)) {
    const match = /^--([a-z]+)=(.*)$/.exec(arg);
    if (match) {
      raw.set(match[1], match[2]);
    }
  }

  const slug = raw.get('slug');
  const nombre = raw.get('nombre');
  const usuario = raw.get('usuario');
  const password = raw.get('password');

  if (!slug || !nombre || !usuario || !password) {
    console.error(USO);
    process.exit(1);
  }

  if (!SLUG_REGEX.test(slug)) {
    console.error('El slug solo puede tener minúsculas, números y guiones (ej: "thionis", "la-esquina").');
    process.exit(1);
  }

  if (usuario.length > 50) {
    console.error('El usuario no puede superar los 50 caracteres.');
    process.exit(1);
  }

  if (password.length < 6 || password.length > 72) {
    console.error('La contraseña debe tener entre 6 y 72 caracteres.');
    process.exit(1);
  }

  return { slug, nombre, usuario, password };
}

async function main() {
  const { slug, nombre, usuario, password } = parseArgs();

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  const [restauranteExistente, usuarioExistente] = await Promise.all([
    prisma.restaurante.findUnique({ where: { slug } }),
    prisma.usuario.findUnique({ where: { username: usuario } }),
  ]);

  if (restauranteExistente) {
    console.error(`Ya existe un restaurante con el slug "${slug}".`);
    process.exit(1);
  }

  if (usuarioExistente) {
    console.error(`Ya existe un usuario con el nombre "${usuario}".`);
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const restaurante = await prisma.$transaction(async (tx) => {
    const nuevoRestaurante = await tx.restaurante.create({ data: { slug, nombre } });

    await tx.usuario.create({
      data: { username: usuario, passwordHash, restauranteId: nuevoRestaurante.id },
    });

    return nuevoRestaurante;
  });

  console.log(`Restaurante "${restaurante.nombre}" creado correctamente.`);
  console.log(`  Menú público: /${restaurante.slug}`);
  console.log(`  Login admin: /login (usuario: "${usuario}")`);
  console.log('  El resto de los datos públicos (dirección, wifi, redes, etc.) se cargan desde /dashboard/configuracion una vez logueado.');

  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
