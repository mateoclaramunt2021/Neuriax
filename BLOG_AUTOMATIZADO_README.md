<!-- Blog eliminado. Este archivo ya no es relevante. -->

1. **Vercel Cron** ejecuta `/api/fetch-news` cada día a las 8:00 AM UTC
2. La API busca noticias de IA en fuentes RSS gratuitas:
   - TechCrunch AI
   - VentureBeat AI
   - MIT Technology Review
   - Wired
3. Filtra solo noticias relacionadas con IA
4. Las guarda en Supabase
5. El blog muestra automáticamente las nuevas noticias

---

## 💰 Monetización con AdSense

Cuando tengas tráfico suficiente:

1. Solicita una cuenta en [Google AdSense](https://www.google.com/adsense)
2. Una vez aprobado, obtén tu código de anunciante (ca-pub-XXXXXXXXXX)
3. Edita `app/blog/client.tsx` y:
   - Cambia `isAdSenseReady` a `true`
   - Reemplaza `ca-pub-XXXXXXXXXX` con tu ID real

---

## 🧪 Probar Manualmente

Para probar que todo funciona:

```bash
# En desarrollo
curl http://localhost:3000/api/fetch-news

# En producción
curl https://tu-dominio.com/api/fetch-news
```

---

## 📁 Archivos Creados

- `scripts/supabase-blog-table.sql` - SQL para crear la tabla
- `app/api/fetch-news/route.ts` - API que busca noticias
- `app/blog/page.tsx` - Actualizado para leer de Supabase
- `app/blog/client.tsx` - Con espacios para anuncios
- `vercel.json` - Con cron job configurado
- `.github/workflows/fetch-news.yml` - Backup con GitHub Actions
