'use client';

interface ConfirmDialogProps {
  titulo: string;
  descripcion: string;
  textoConfirmar?: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export function ConfirmDialog({
  titulo,
  descripcion,
  textoConfirmar = 'Eliminar',
  onConfirmar,
  onCancelar,
}: ConfirmDialogProps) {
  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-titulo"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onCancelar}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl dark:bg-neutral-900"
      >
        <h2 id="confirm-dialog-titulo" className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {titulo}
        </h2>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{descripcion}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancelar}
            className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}
