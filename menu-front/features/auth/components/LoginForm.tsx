'use client';

import { useActionState } from 'react';
import { loginAction, type LoginState } from '../actions/login.action';

const initialState: LoginState = {};
const inputClass =
  'w-full rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:focus:border-neutral-100';
const labelClass = 'mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300';

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form
      action={formAction}
      className="space-y-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div>
        <label className={labelClass}>Usuario</label>
        <input name="username" required autoFocus autoComplete="username" className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Contraseña</label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={inputClass}
        />
      </div>

      {state.error && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
      >
        {isPending ? 'Ingresando...' : 'Ingresar'}
      </button>
    </form>
  );
}
