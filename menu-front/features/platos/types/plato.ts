export interface Categoria {
  id: string;
  nombre: string;
}

export interface Etiqueta {
  id: string;
  nombre: string;
}

export interface Plato {
  id: string;
  nombre: string;
  descripcion: string | null;
  precio: string;
  imagenUrl: string | null;
  etiquetas: Etiqueta[];
  disponible: boolean;
  categoriaId: string;
  restauranteId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlatoInput {
  nombre: string;
  descripcion?: string;
  precio: number;
  categoriaId: string;
  imagenUrl?: string;
  disponible?: boolean;
  etiquetas?: string[];
}

export type UpdatePlatoInput = Partial<CreatePlatoInput>;
