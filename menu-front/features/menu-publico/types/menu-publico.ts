export interface PlatoPublico {
  id: string;
  nombre: string;
  descripcion: string | null;
  precio: string;
  imagenUrl: string | null;
  etiquetas: { id: string; nombre: string }[];
  categoriaId: string;
}

export interface CategoriaPublica {
  id: string;
  nombre: string;
  platos: PlatoPublico[];
}

export interface PlatoDetallePublico extends PlatoPublico {
  categoria: { id: string; nombre: string };
}

export interface MenuPublico {
  nombre: string;
  slug: string;
  logoUrl: string | null;
  horarioTexto: string | null;
  direccion: string | null;
  googleMapsUrl: string | null;
  wifiNombre: string | null;
  wifiPassword: string | null;
  telefono: string | null;
  instagramUrl: string | null;
  tiktokUrl: string | null;
  categorias: CategoriaPublica[];
}
