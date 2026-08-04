'use client';

import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { changePasswordAction, type ChangePasswordState } from '../actions/change-password.action';

const initialState: ChangePasswordState = {};
const inputClass =
  'w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:focus:border-neutral-100';
const labelClass = 'mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300';

export function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(changePasswordAction, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success('Contraseña actualizada correctamente');
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
    >
      <h1 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        Cambiar contraseña
      </h1>

      <div>
        <label className={labelClass}>Contraseña actual</label>
        <input
          name="currentPassword"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Nueva contraseña</label>
        <input
          name="newPassword"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Repetir nueva contraseña</label>
        <input
          name="confirmPassword"
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          className={inputClass}
        />
      </div>

      {state.error && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
      >
        {isPending ? 'Guardando...' : 'Guardar nueva contraseña'}
      </button>
    </form>
  );
}
