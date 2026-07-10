'use client';

import { useState } from 'react';
import Image from 'next/image';

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
      <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#1e3a5f] to-[#0a1628] flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          <div className="w-24 h-24 bg-[#CCFF00] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#CCFF00]/50">
            <svg className="w-12 h-12 text-[#0a1628]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="font-bebas text-5xl md:text-6xl text-[#0a1628] mb-4 tracking-wide">
            ¡INSCRIPCIÓN CONFIRMADA!
          </h2>

          <p className="text-xl text-slate-700 mb-8 font-medium">
            Tu registro ha sido guardado exitosamente
          </p>

          <div className="bg-gradient-to-r from-[#CCFF00]/20 to-[#00d4ff]/20 border-2 border-[#CCFF00] rounded-2xl p-8 mb-8">
            <h3 className="font-bebas text-3xl text-[#0a1628] mb-4 tracking-wide">
              PASO FINAL
            </h3>
            <p className="text-slate-700 mb-2 text-lg">
              Para confirmar tu cupo en el torneo, envía tu comprobante de pago de
            </p>
            <p className="font-bebas text-4xl text-[#0a1628] mb-6 tracking-wide">
              $55 POR ACH
            </p>
            <p className="text-slate-700 mb-6">al WhatsApp:</p>
            <a
              href="https://wa.me/50764841573"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-8 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              6484-1573
            </a>
          </div>

          <button
            onClick={() => setShowConfirmation(false)}
            className="text-[#1e3a5f] hover:text-[#0a1628] font-bold text-lg transition-colors"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* Hero Section with Background Image */}
      <div className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-tennis.jpg"
            alt="Tennis court"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/95 via-[#0a1628]/85 to-[#0a1628]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/50 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          {/* Logo */}
          <div className="inline-block mb-8">
            <Image
              src="/logo.png"
              alt="Istmo Tenis Open"
              width={600}
              height={200}
              className="w-auto h-32 sm:h-40 md:h-48 lg:h-56 drop-shadow-2xl"
              priority
            />
          </div>

          {/* Subtitle */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
            <p className="font-bebas text-2xl md:text-3xl text-[#00d4ff] tracking-wider">
              PANAMÁ
            </p>
            <span className="hidden sm:block w-2 h-2 bg-[#CCFF00] rounded-full"></span>
            <p className="font-bebas text-xl md:text-2xl text-white/90 tracking-wide">
              7 AGOSTO — 30 SEPTIEMBRE
            </p>
          </div>

          {/* Price Badge */}
          <div className="inline-block">
            <div className="bg-gradient-to-r from-[#CCFF00] via-[#b8e600] to-[#CCFF00] px-10 py-4 rounded-full shadow-2xl shadow-[#CCFF00]/50 transform hover:scale-105 transition-transform">
              <p className="font-bebas text-4xl md:text-5xl text-[#0a1628] tracking-wider">
                INSCRIPCIÓN $55
              </p>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a1628] to-transparent z-10"></div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="font-bebas text-5xl md:text-6xl text-center text-white mb-4 tracking-wider">
          CATEGORÍAS
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#CCFF00] to-transparent mx-auto mb-12"></div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* B1 - Avanzado */}
          <div className="group relative bg-gradient-to-br from-[#1e3a5f] to-[#0a1628] p-8 rounded-2xl border-2 border-[#00d4ff]/30 hover:border-[#00d4ff] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#00d4ff]/20 hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d4ff]/5 rounded-full blur-3xl group-hover:bg-[#00d4ff]/10 transition-all"></div>
            <h3 className="font-bebas text-4xl text-[#00d4ff] mb-3 tracking-wide relative z-10">B1</h3>
            <p className="font-bebas text-2xl text-white/80 mb-4 tracking-wide relative z-10">AVANZADO</p>
            <p className="text-white/70 leading-relaxed relative z-10">
              Mantiene peloteo intenso, crea estrategias, técnica clara de golpe y desplazamiento, servicio fuerte y consistente, juego mental consolidado.
            </p>
          </div>

          {/* B2 - Semi Avanzado */}
          <div className="group relative bg-gradient-to-br from-[#1e3a5f] to-[#0a1628] p-8 rounded-2xl border-2 border-[#00d4ff]/30 hover:border-[#00d4ff] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#00d4ff]/20 hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d4ff]/5 rounded-full blur-3xl group-hover:bg-[#00d4ff]/10 transition-all"></div>
            <h3 className="font-bebas text-4xl text-[#00d4ff] mb-3 tracking-wide relative z-10">B2</h3>
            <p className="font-bebas text-2xl text-white/80 mb-4 tracking-wide relative z-10">SEMI AVANZADO</p>
            <p className="text-white/70 leading-relaxed relative z-10">
              Cambios de ritmo con control y destreza, servicio con colocación, mayor análisis en sus decisiones y estrategias.
            </p>
          </div>

          {/* C1 - Intermedio */}
          <div className="group relative bg-gradient-to-br from-[#1e3a5f] to-[#0a1628] p-8 rounded-2xl border-2 border-[#00d4ff]/30 hover:border-[#00d4ff] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#00d4ff]/20 hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d4ff]/5 rounded-full blur-3xl group-hover:bg-[#00d4ff]/10 transition-all"></div>
            <h3 className="font-bebas text-4xl text-[#00d4ff] mb-3 tracking-wide relative z-10">C1</h3>
            <p className="font-bebas text-2xl text-white/80 mb-4 tracking-wide relative z-10">INTERMEDIO</p>
            <p className="text-white/70 leading-relaxed relative z-10">
              Peloteo y colocación ágil, técnica consistente, servicio de fuerza moderada y certeza intermedia, juego mental sólido con períodos de desesperación.
            </p>
          </div>

          {/* C2 - Bajo */}
          <div className="group relative bg-gradient-to-br from-[#1e3a5f] to-[#0a1628] p-8 rounded-2xl border-2 border-[#00d4ff]/30 hover:border-[#00d4ff] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#00d4ff]/20 hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d4ff]/5 rounded-full blur-3xl group-hover:bg-[#00d4ff]/10 transition-all"></div>
            <h3 className="font-bebas text-4xl text-[#00d4ff] mb-3 tracking-wide relative z-10">C2</h3>
            <p className="font-bebas text-2xl text-white/80 mb-4 tracking-wide relative z-10">BAJO</p>
            <p className="text-white/70 leading-relaxed relative z-10">
              Intercambia pelotas con cierta dificultad buscando el error del rival, comete errores no forzados con regularidad, servicio controlado, juego mental mesurado.
            </p>
          </div>

          {/* Femenino */}
          <div className="group relative bg-gradient-to-br from-[#1e3a5f] to-[#0a1628] p-8 rounded-2xl border-2 border-[#CCFF00]/30 hover:border-[#CCFF00] transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#CCFF00]/20 hover:-translate-y-2 lg:col-span-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#CCFF00]/5 rounded-full blur-3xl group-hover:bg-[#CCFF00]/10 transition-all"></div>
            <h3 className="font-bebas text-4xl text-[#CCFF00] mb-3 tracking-wide relative z-10">FEMENINO</h3>
            <p className="font-bebas text-2xl text-white/80 mb-4 tracking-wide relative z-10">CATEGORÍA FEMENINA</p>
            <p className="text-white/70 leading-relaxed relative z-10">
              Categoría exclusiva femenina.
            </p>
          </div>
        </div>
      </div>

      {/* Registration Form Section */}
      <div className="container mx-auto px-4 pb-24">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <h2 className="font-bebas text-5xl md:text-6xl text-[#0a1628] mb-8 text-center tracking-wider">
            INSCRIPCIÓN
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-bold text-sm text-[#0a1628] mb-2 uppercase tracking-wide">
                Nombre Completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.nombre_completo}
                onChange={(e) => setFormData({ ...formData, nombre_completo: e.target.value })}
                className="w-full px-5 py-4 border-2 border-slate-300 rounded-xl focus:border-[#00d4ff] focus:outline-none focus:ring-4 focus:ring-[#00d4ff]/20 transition-all text-slate-900 font-medium"
                placeholder="Juan Pérez"
              />
            </div>

            <div>
              <label className="block font-bold text-sm text-[#0a1628] mb-2 uppercase tracking-wide">
                WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-5 py-4 border-2 border-slate-300 rounded-xl focus:border-[#00d4ff] focus:outline-none focus:ring-4 focus:ring-[#00d4ff]/20 transition-all text-slate-900 font-medium"
                placeholder="6XXX-XXXX"
              />
            </div>

            <div>
              <label className="block font-bold text-sm text-[#0a1628] mb-2 uppercase tracking-wide">
                Correo Electrónico <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                className="w-full px-5 py-4 border-2 border-slate-300 rounded-xl focus:border-[#00d4ff] focus:outline-none focus:ring-4 focus:ring-[#00d4ff]/20 transition-all text-slate-900 font-medium"
                placeholder="juan@ejemplo.com"
              />
            </div>

            <div>
              <label className="block font-bold text-sm text-[#0a1628] mb-2 uppercase tracking-wide">
                Cédula <span className="text-slate-400">(opcional)</span>
              </label>
              <input
                type="text"
                value={formData.cedula}
                onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                className="w-full px-5 py-4 border-2 border-slate-300 rounded-xl focus:border-[#00d4ff] focus:outline-none focus:ring-4 focus:ring-[#00d4ff]/20 transition-all text-slate-900 font-medium"
                placeholder="X-XXX-XXXX"
              />
            </div>

            <div>
              <label className="block font-bold text-sm text-[#0a1628] mb-2 uppercase tracking-wide">
                Categoría <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className="w-full px-5 py-4 border-2 border-slate-300 rounded-xl focus:border-[#00d4ff] focus:outline-none focus:ring-4 focus:ring-[#00d4ff]/20 transition-all bg-white text-slate-900 font-medium"
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
              <label className="block font-bold text-sm text-[#0a1628] mb-2 uppercase tracking-wide">
                Años Jugando Tenis <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.anios_jugando}
                onChange={(e) => setFormData({ ...formData, anios_jugando: e.target.value })}
                className="w-full px-5 py-4 border-2 border-slate-300 rounded-xl focus:border-[#00d4ff] focus:outline-none focus:ring-4 focus:ring-[#00d4ff]/20 transition-all text-slate-900 font-medium"
                placeholder="Ej: 3 años"
              />
            </div>

            <div>
              <label className="block font-bold text-sm text-[#0a1628] mb-2 uppercase tracking-wide">
                Torneos Jugados Anteriormente <span className="text-slate-400">(opcional)</span>
              </label>
              <textarea
                value={formData.torneos_previos}
                onChange={(e) => setFormData({ ...formData, torneos_previos: e.target.value })}
                rows={4}
                className="w-full px-5 py-4 border-2 border-slate-300 rounded-xl focus:border-[#00d4ff] focus:outline-none focus:ring-4 focus:ring-[#00d4ff]/20 transition-all resize-none text-slate-900 font-medium"
                placeholder="Lista los torneos en los que has participado..."
              />
            </div>

            <div className="bg-gradient-to-r from-[#CCFF00]/10 to-[#00d4ff]/10 border-2 border-[#CCFF00]/50 rounded-xl p-5">
              <label className="flex items-start gap-4 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  checked={formData.acepta_reglas}
                  onChange={(e) => setFormData({ ...formData, acepta_reglas: e.target.checked })}
                  className="mt-1 w-6 h-6 text-[#00d4ff] border-slate-400 rounded focus:ring-[#00d4ff] focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-sm font-semibold text-[#0a1628] leading-relaxed">
                  Entiendo que debo inscribirme en la categoría de mi nivel real y acepto las reglas del torneo <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#CCFF00] via-[#b8e600] to-[#CCFF00] text-[#0a1628] font-bebas text-3xl py-5 rounded-xl hover:scale-[1.02] transition-all shadow-2xl shadow-[#CCFF00]/30 hover:shadow-[#CCFF00]/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 tracking-wider"
            >
              {isSubmitting ? 'PROCESANDO...' : 'INSCRIBIRME AL TORNEO'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
