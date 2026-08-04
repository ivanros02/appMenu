const PALETA_COLORES = [
  'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
  'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300',
  'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300',
  'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300',
];

// Las etiquetas son dinámicas por restaurante, así que no hay un mapa fijo
// por nombre: se elige un color de forma determinística a partir del id,
// así el mismo tag siempre pinta igual.
export function getEtiquetaColor(etiquetaId: string): string {
  const suma = Array.from(etiquetaId).reduce((acc, char) => acc + char.codePointAt(0)!, 0);
  return PALETA_COLORES[suma % PALETA_COLORES.length];
}
