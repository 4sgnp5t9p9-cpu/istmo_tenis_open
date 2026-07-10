# Configuración de Variables de Entorno en Vercel

Si el formulario da error al enviar, verifica que estas variables estén configuradas en Vercel:

## Pasos:

1. Ve a: https://vercel.com/dashboard
2. Selecciona el proyecto: **istmo-tenis-open**
3. Ve a: **Settings** → **Environment Variables**
4. Agrega estas 2 variables (si no están):

### Variable 1:
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** `https://gqcramvvcuvslfcrnvgc.supabase.co`
- **Environments:** Production, Preview

### Variable 2:
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxY3JhbXZ2Y3V2c2xmY3JudmdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2NDA5MTIsImV4cCI6MjA5OTIxNjkxMn0.wSaKIU6SRbm4qZIFygT8XGnixZIZ3xb3WJwyURJ_VW0`
- **Environments:** Production, Preview

## Después de agregar las variables:

1. Ve a: **Deployments**
2. Busca el deployment más reciente
3. Haz clic en los 3 puntos (⋯) → **Redeploy**
4. Confirma "Redeploy"

Esto forzará un nuevo deployment con las variables correctas.
