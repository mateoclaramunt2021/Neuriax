## 🔧 Modo Mantenimiento - Instrucciones

### ✅ ESTADO ACTUAL
**Modo mantenimiento: ACTIVO**

### 📍 Páginas:
- `/mantenimiento` → Página de mantenimiento (logo + mensaje)
- Todas las demás rutas → Redirigen a `/mantenimiento`

### ⚙️ Cómo Controlar

**Para DESACTIVAR mantenimiento (volver a web normal):**

En `.env.local`:
```
NEXT_PUBLIC_MAINTENANCE_MODE=false
```

Luego:
```bash
npm run build
git add .
git commit -m "DEACTIVATE: Maintenance mode OFF"
git push origin main
```

**Para ACTIVAR mantenimiento (como está ahora):**

En `.env.local`:
```
NEXT_PUBLIC_MAINTENANCE_MODE=true
```

Luego:
```bash
npm run build
git add .
git commit -m "ACTIVATE: Maintenance mode ON"
git push origin main
```

### 🚀 Vercel lo Deploy Automáticamente

Una vez hagas push, Vercel recoge el cambio en ~2 minutos.

### 📝 Personalizar Mensaje

Edita: `app/mantenimiento/page.tsx`
