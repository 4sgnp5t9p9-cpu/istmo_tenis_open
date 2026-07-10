'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    whatsapp: '',
    correo: '',
    cedula: '',
    categoria: '',
    anios_jugando: '',
    torneos_previos: '',
    acepta_reglas: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.acepta_reglas) {
      alert('Debes aceptar las reglas del torneo para continuar');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/inscripcion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_completo: formData.nombre_completo,
          whatsapp: formData.whatsapp,
          correo: formData.correo,
          cedula: formData.cedula || null,
          categoria: formData.categoria,
          anios_jugando: formData.anios_jugando,
          torneos_previos: formData.torneos_previos || null,
        }),
      });

      if (response.ok) {
        setShowConfirmation(true);
        setFormData({
          nombre_completo: '',
          whatsapp: '',
          correo: '',
          cedula: '',
          categoria: '',
          anios_jugando: '',
          torneos_previos: '',
          acepta_reglas: false,
        });
      } else {
        alert('Hubo un error al procesar tu inscripción. Por favor intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al procesar tu inscripción. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            ¡Inscripción Recibida!
          </h2>

          <p className="text-lg text-slate-700 mb-6">
            Tu registro ha sido guardado exitosamente.
          </p>

          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Paso Final: Confirmación de Pago
            </h3>
            <p className="text-slate-700 mb-4">
              Para confirmar tu cupo en el torneo, envía tu comprobante de pago de <strong>$55 por ACH</strong> al WhatsApp:
            </p>
            <a
              href="https://wa.me/50764841573"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-green-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              6484-1573
            </a>
          </div>

          <button
            onClick={() => setShowConfirmation(false)}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent"></div>
        <div className="container mx-auto px-4 pt-12 pb-8 md:pt-20 md:pb-12 text-center relative">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-400 to-lime-400 rounded-full mx-auto shadow-lg shadow-yellow-400/50"></div>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight">
            ISTMO TENIS OPEN
          </h1>
          <p className="text-cyan-300 text-lg md:text-2xl font-semibold mb-6">
            Torneo de Tenis Panamá · 7 de agosto — 30 de septiembre
          </p>
          <div className="inline-block bg-gradient-to-r from-lime-400 to-yellow-400 px-8 py-3 rounded-full">
            <p className="text-slate-900 text-2xl md:text-3xl font-black">
              Inscripción $55
            </p>
          </div>
        </div>
      </div>

      {/* Categorías */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
          Categorías del Torneo
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border-2 border-cyan-500/30 hover:border-cyan-500/60 transition-all">
            <h3 className="text-xl font-bold text-cyan-400 mb-3">B1 – Avanzado</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Mantiene peloteo intenso, crea estrategias, técnica clara de golpe y desplazamiento, servicio fuerte y consistente, juego mental consolidado.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border-2 border-cyan-500/30 hover:border-cyan-500/60 transition-all">
            <h3 className="text-xl font-bold text-cyan-400 mb-3">B2 – Semi Avanzado</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Cambios de ritmo con control y destreza, servicio con colocación, mayor análisis en sus decisiones y estrategias.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border-2 border-cyan-500/30 hover:border-cyan-500/60 transition-all">
            <h3 className="text-xl font-bold text-cyan-400 mb-3">C1 – Intermedio</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Peloteo y colocación ágil, técnica consistente, servicio de fuerza moderada y certeza intermedia, juego mental sólido con períodos de desesperación.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border-2 border-cyan-500/30 hover:border-cyan-500/60 transition-all">
            <h3 className="text-xl font-bold text-cyan-400 mb-3">C2 – Bajo</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Intercambia pelotas con cierta dificultad buscando el error del rival, comete errores no forzados con regularidad, servicio controlado, juego mental mesurado.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-xl border-2 border-pink-500/30 hover:border-pink-500/60 transition-all lg:col-span-2">
            <h3 className="text-xl font-bold text-pink-400 mb-3">Femenino</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Categoría femenina.
            </p>
          </div>
        </div>

        {/* Formulario */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Formulario de Inscripción
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nombre Completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.nombre_completo}
                onChange={(e) => setFormData({ ...formData, nombre_completo: e.target.value })}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                placeholder="Juan Pérez"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                placeholder="6XXX-XXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Correo Electrónico <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                placeholder="juan@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Cédula <span className="text-slate-400">(opcional)</span>
              </label>
              <input
                type="text"
                value={formData.cedula}
                onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                placeholder="X-XXX-XXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Categoría <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors bg-white"
              >
                <option value="">Selecciona tu categoría</option>
                <option value="B1">B1 – Avanzado</option>
                <option value="B2">B2 – Semi Avanzado</option>
                <option value="C1">C1 – Intermedio</option>
                <option value="C2">C2 – Bajo</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Años Jugando Tenis <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.anios_jugando}
                onChange={(e) => setFormData({ ...formData, anios_jugando: e.target.value })}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                placeholder="Ej: 3 años"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Torneos Jugados Anteriormente <span className="text-slate-400">(opcional)</span>
              </label>
              <textarea
                value={formData.torneos_previos}
                onChange={(e) => setFormData({ ...formData, torneos_previos: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors resize-none"
                placeholder="Lista los torneos en los que has participado..."
              />
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.acepta_reglas}
                  onChange={(e) => setFormData({ ...formData, acepta_reglas: e.target.checked })}
                  className="mt-1 w-5 h-5 text-cyan-600 border-slate-300 rounded focus:ring-cyan-500"
                />
                <span className="text-sm font-medium text-slate-800">
                  Entiendo que debo inscribirme en la categoría de mi nivel real y acepto las reglas del torneo <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-lg text-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Procesando...' : 'Inscribirme al Torneo'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
