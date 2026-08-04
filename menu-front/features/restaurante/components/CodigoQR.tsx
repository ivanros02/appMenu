'use client';

import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface CodigoQRProps {
  slug: string;
}

export function CodigoQR({ slug }: CodigoQRProps) {
  // El origin solo existe en el browser; en el render de servidor de este
  // client component todavía no hay window, por eso se resuelve en efecto.
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    setUrl(`${window.location.origin}/${slug}`);
  }, [slug]);

  function descargar() {
    const svg = document.getElementById('qr-menu-svg');
    if (!svg) return;

    const svgString = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `qr-menu-${slug}.svg`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  return (
    <div className="space-y-3 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
      <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        Código QR de tu menú
      </h2>

      {url ? (
        <>
          <div className="flex justify-center rounded-lg bg-white p-4">
            <QRCodeSVG id="qr-menu-svg" value={url} size={180} />
          </div>
          <p className="break-all text-center text-xs text-neutral-500 dark:text-neutral-400">{url}</p>
          <button
            type="button"
            onClick={descargar}
            className="w-full rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            Descargar QR
          </button>
        </>
      ) : (
        <p className="text-center text-sm text-neutral-400 dark:text-neutral-600">Generando...</p>
      )}
    </div>
  );
}
