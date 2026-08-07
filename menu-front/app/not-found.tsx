export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3 bg-gray-50 px-6 text-center">
      <p className="text-sm font-semibold text-indigo-600">404</p>
      <h1 className="text-2xl font-semibold text-gray-900">No encontramos esta página</h1>
      <p className="max-w-sm text-sm text-gray-500">
        Si buscás el menú de un restaurante, pedí el link o escaneá el código QR de la mesa.
      </p>
    </div>
  );
}
