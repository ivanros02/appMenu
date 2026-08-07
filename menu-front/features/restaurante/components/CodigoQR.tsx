'use client';

import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface CodigoQRProps {
  slug: string;
  wifiNombre: string | null;
  wifiPassword: string | null;
}

// Formato estándar que las cámaras de los celulares reconocen para unirse
// solas a una red WiFi al escanear el QR.
function escaparValorWifi(valor: string) {
  return valor.replace(/([\\;,:"])/g, '\\$1');
}

function construirPayloadWifi(ssid: string, password: string) {
  const tipo = password ? 'WPA' : 'nopass';
  return `WIFI:T:${tipo};S:${escaparValorWifi(ssid)};P:${escaparValorWifi(password)};;`;
}

function descargarSvg(elementId: string, nombreArchivo: string) {
  const svg = document.getElementById(elementId);
  if (!svg) return;

  const svgString = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([svgString], { type: 'image/svg+xml' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = nombreArchivo;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function CodigoQR({ slug, wifiNombre, wifiPassword }: CodigoQRProps) {
  // El origin solo existe en el browser; en el render de servidor de este
  // client component todavía no hay window, por eso se resuelve en efecto.
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    setUrl(`${window.location.origin}/${slug}`);
  }, [slug]);

  const wifiPayload = wifiNombre ? construirPayloadWifi(wifiNombre, wifiPassword ?? '') : null;

  return (
    <div className="space-y-6">
      <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-gray-900">Código QR de tu menú</h2>

        {url ? (
          <>
            <div className="flex justify-center rounded-lg bg-white p-4">
              <QRCodeSVG id="qr-menu-svg" value={url} size={180} />
            </div>
            <p className="break-all text-center text-xs text-gray-900">{url}</p>
            <button
              type="button"
              onClick={() => descargarSvg('qr-menu-svg', `qr-menu-${slug}.svg`)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 transition-colors duration-150 hover:bg-gray-100"
            >
              Descargar QR
            </button>
          </>
        ) : (
          <p className="text-center text-sm text-gray-900">Generando...</p>
        )}
      </div>

      <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4">
        <h2 className="text-sm font-semibold text-gray-900">Código QR del WiFi</h2>

        {wifiPayload ? (
          <>
            <div className="flex justify-center rounded-lg bg-white p-4">
              <QRCodeSVG id="qr-wifi-svg" value={wifiPayload} size={180} />
            </div>
            <p className="text-center text-xs text-gray-900">
              Al escanearlo, el celular se conecta solo a &quot;{wifiNombre}&quot;.
            </p>
            <button
              type="button"
              onClick={() => descargarSvg('qr-wifi-svg', `qr-wifi-${slug}.svg`)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 transition-colors duration-150 hover:bg-gray-100"
            >
              Descargar QR
            </button>
          </>
        ) : (
          <p className="text-center text-sm text-gray-900">
            Cargá el nombre de la red WiFi en &quot;WiFi para clientes&quot; para generar este código.
          </p>
        )}
      </div>
    </div>
  );
}
