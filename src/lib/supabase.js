// Lectura pública de infografías publicadas desde Supabase (REST / PostgREST).
// Usa la publishable key (pública, igual que en la app). La RLS solo deja leer
// filas con publicado = true, así que es seguro exponerla.
const SUPABASE_URL = 'https://jprhnlgxcbwsbtezadmf.supabase.co';
const SUPABASE_KEY = 'sb_publishable_mjer0PZ5du7RcFSvN4DArg_M4W_dGRE';

const HEADERS = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
};

// Devuelve la publicación por slug (o null si no existe / no está publicada).
export async function getPublicacion(slug) {
  if (!slug) return null;
  const url = `${SUPABASE_URL}/rest/v1/publicaciones`
    + `?slug=eq.${encodeURIComponent(slug)}&publicado=eq.true&select=*&limit=1`;
  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) return null;
    const rows = await res.json();
    return Array.isArray(rows) && rows.length ? rows[0] : null;
  } catch (e) {
    return null;
  }
}

// Devuelve todas las publicaciones publicadas (para el sitemap): slug + fecha.
export async function getPublicaciones() {
  const url = `${SUPABASE_URL}/rest/v1/publicaciones`
    + `?publicado=eq.true&select=slug,created_at&order=created_at.desc`;
  try {
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) return [];
    const rows = await res.json();
    return Array.isArray(rows) ? rows : [];
  } catch (e) {
    return [];
  }
}
