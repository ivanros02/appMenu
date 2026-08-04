import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const SALT_ROUNDS = 10;

const APTO_CELIACO = 'Apto Celíaco';
const VEGETARIANO = 'Vegetariano';

interface PlatoSeed {
  nombre: string;
  descripcion: string;
  precio: number;
  imagenUrl: string;
  etiquetas: string[];
}

interface CategoriaSeed {
  nombre: string;
  platos: PlatoSeed[];
}

interface RestauranteSeed {
  slug: string;
  admin: { username: string; password: string };
  datosPublicos: {
    nombre: string;
    logoUrl: string;
    horarioTexto: string;
    direccion: string;
    googleMapsUrl: string;
    wifiNombre: string;
    wifiPassword: string;
    telefono: string;
    instagramUrl: string;
    tiktokUrl: string;
  };
  categorias: CategoriaSeed[];
}

const RESTAURANTES: RestauranteSeed[] = [
  {
    slug: 'demo',
    admin: { username: 'admin', password: 'admin' },
    datosPublicos: {
      nombre: 'Restaurante Demo',
      logoUrl: 'https://picsum.photos/seed/demo-logo/200/200',
      horarioTexto: 'Abierto hasta las 02:00 AM',
      direccion: 'Av. Corrientes 1234, CABA',
      googleMapsUrl: 'https://maps.google.com/?q=Av.+Corrientes+1234,+CABA',
      wifiNombre: 'Bar_Demo_Wifi',
      wifiPassword: 'bardemo2026',
      telefono: '+541122223333',
      instagramUrl: 'https://instagram.com/bardemo',
      tiktokUrl: 'https://tiktok.com/@bardemo',
    },
    categorias: [
      {
        nombre: 'Principales',
        platos: [
          {
            nombre: 'Milanesa a la Napolitana',
            descripcion: 'Salsa de tomate, jamón, mozzarella y papas fritas',
            precio: 8500,
            imagenUrl: 'https://picsum.photos/seed/milanesa/400/400',
            etiquetas: [],
          },
          {
            nombre: 'Hamburguesa Doble Cheddar',
            descripcion: 'Doble carne, cheddar, cebolla crispy y salsa de la casa',
            precio: 9200,
            imagenUrl: 'https://picsum.photos/seed/hamburguesa/400/400',
            etiquetas: [],
          },
          {
            nombre: 'Ensalada César',
            descripcion: 'Lechuga, crutones, parmesano y aderezo césar',
            precio: 6800,
            imagenUrl: 'https://picsum.photos/seed/ensalada/400/400',
            etiquetas: [VEGETARIANO],
          },
        ],
      },
      {
        nombre: 'Bebidas',
        platos: [
          {
            nombre: 'Limonada con Menta',
            descripcion: 'Limón, menta fresca y soda',
            precio: 3200,
            imagenUrl: 'https://picsum.photos/seed/limonada/400/400',
            etiquetas: [APTO_CELIACO, VEGETARIANO],
          },
          {
            nombre: 'Cerveza Artesanal IPA',
            descripcion: '500ml, elaboración local',
            precio: 4500,
            imagenUrl: 'https://picsum.photos/seed/cerveza/400/400',
            etiquetas: [],
          },
        ],
      },
    ],
  },
  {
    slug: 'la-esquina',
    admin: { username: 'admin2', password: 'admin2' },
    datosPublicos: {
      nombre: 'La Esquina Café',
      logoUrl: 'https://picsum.photos/seed/esquina-logo/200/200',
      horarioTexto: 'Abierto de 8:00 a 21:00',
      direccion: 'Av. Cabildo 3456, CABA',
      googleMapsUrl: 'https://maps.google.com/?q=Av.+Cabildo+3456,+CABA',
      wifiNombre: 'LaEsquina_Clientes',
      wifiPassword: 'esquina2026',
      telefono: '+541144445555',
      instagramUrl: 'https://instagram.com/laesquinacafe',
      tiktokUrl: 'https://tiktok.com/@laesquinacafe',
    },
    categorias: [
      {
        nombre: 'Café',
        platos: [
          {
            nombre: 'Café con Leche',
            descripcion: 'Con medialunas de manteca',
            precio: 2800,
            imagenUrl: 'https://picsum.photos/seed/cafe-con-leche/400/400',
            etiquetas: [VEGETARIANO],
          },
          {
            nombre: 'Tostado de Jamón y Queso',
            descripcion: 'Pan de campo, jamón cocido y queso fundido',
            precio: 4200,
            imagenUrl: 'https://picsum.photos/seed/tostado/400/400',
            etiquetas: [],
          },
        ],
      },
      {
        nombre: 'Postres',
        platos: [
          {
            nombre: 'Cheesecake de Frutos Rojos',
            descripcion: 'Porción individual, con coulis casero',
            precio: 3900,
            imagenUrl: 'https://picsum.photos/seed/cheesecake/400/400',
            etiquetas: [VEGETARIANO],
          },
        ],
      },
    ],
  },
];

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  for (const seed of RESTAURANTES) {
    const restaurante = await prisma.restaurante.upsert({
      where: { slug: seed.slug },
      update: seed.datosPublicos,
      create: { slug: seed.slug, ...seed.datosPublicos },
    });

    const passwordHash = await bcrypt.hash(seed.admin.password, SALT_ROUNDS);

    await prisma.usuario.upsert({
      where: { username: seed.admin.username },
      update: {},
      create: {
        username: seed.admin.username,
        passwordHash,
        restauranteId: restaurante.id,
      },
    });

    const nombresEtiquetas = new Set(
      seed.categorias.flatMap((categoriaSeed) =>
        categoriaSeed.platos.flatMap((plato) => plato.etiquetas),
      ),
    );

    const etiquetaIdsPorNombre = new Map<string, string>();

    for (const nombre of nombresEtiquetas) {
      const etiqueta = await prisma.etiqueta.upsert({
        where: { restauranteId_nombre: { restauranteId: restaurante.id, nombre } },
        update: {},
        create: { nombre, restauranteId: restaurante.id },
      });
      etiquetaIdsPorNombre.set(nombre, etiqueta.id);
    }

    for (const categoriaSeed of seed.categorias) {
      const categoria = await prisma.categoria.upsert({
        where: {
          restauranteId_nombre: { restauranteId: restaurante.id, nombre: categoriaSeed.nombre },
        },
        update: {},
        create: { nombre: categoriaSeed.nombre, restauranteId: restaurante.id },
      });

      for (const plato of categoriaSeed.platos) {
        const existente = await prisma.plato.findFirst({
          where: { nombre: plato.nombre, restauranteId: restaurante.id },
        });

        if (!existente) {
          const { etiquetas, ...datosPlato } = plato;

          await prisma.plato.create({
            data: {
              ...datosPlato,
              categoriaId: categoria.id,
              restauranteId: restaurante.id,
              etiquetas: {
                connect: etiquetas.map((nombre) => ({ id: etiquetaIdsPorNombre.get(nombre)! })),
              },
            },
          });
        }
      }
    }

    console.log(
      `Restaurante "${restaurante.nombre}" (${restaurante.slug}) -> admin: "${seed.admin.username}" / "${seed.admin.password}"`,
    );
    console.log(`  Menú público: http://localhost:3001/${restaurante.slug}`);
  }

  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  process.exit(1);
});
