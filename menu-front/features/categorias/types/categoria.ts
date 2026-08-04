export interface Categoria {
  id: string;
  nombre: string;
  restauranteId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoriaInput {
  nombre: string;
}

export type UpdateCategoriaInput = Partial<CreateCategoriaInput>;
