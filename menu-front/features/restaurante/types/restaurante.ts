export interface RestaurantePerfil {
  id: string;
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
}

export type UpdateRestauranteInput = Partial<Omit<RestaurantePerfil, 'id' | 'slug'>>;
