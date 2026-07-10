import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Faltan variables de entorno de Supabase');
      return NextResponse.json(
        { error: 'Configuración del servidor incompleta' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const body = await request.json();

    const { data, error } = await supabase
      .from('inscritos')
      .insert([
        {
          nombre_completo: body.nombre_completo,
          whatsapp: body.whatsapp,
          correo: body.correo,
          cedula: body.cedula,
          categoria: body.categoria,
          anios_jugando: body.anios_jugando,
          torneos_previos: body.torneos_previos,
          comprobante_url: null,
          pago_confirmado: false,
        },
      ])
      .select();

    if (error) {
      console.error('Error al insertar en Supabase:', error);
      return NextResponse.json(
        { error: 'Error al procesar la inscripción', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
