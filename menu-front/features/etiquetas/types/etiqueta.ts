export interface Etiqueta {
  id: string;
  nombre: string;
  restauranteId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEtiquetaInput {
  nombre: string;
}

export type UpdateEtiquetaInput = Partial<CreateEtiquetaInput>;
