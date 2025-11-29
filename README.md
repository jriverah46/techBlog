# 🧠 TechBlog – Plataforma completa de blog tecnológico

TechBlog es una solución end-to-end para publicar, leer y discutir artículos relacionados con tecnología. El backend está construido en **NestJS + TypeORM + PostgreSQL** con autenticación **JWT**, mientras que el nuevo frontend utiliza **Next.js 16 + React 19 + TypeScript**.

---

## 🚀 Tecnologías principales

| Capa | Stack |
| --- | --- |
| Backend | NestJS 11, TypeORM, PostgreSQL, JWT, bcrypt, class-validator |
| Frontend | Next.js 16 (App Router), React 19, React Query, Tailwind CSS v4 |
| Infra | Node.js 20+, npm |

---

## ⚙️ Configuración del Backend (NestJS)

1. **Instala dependencias**
   ```bash
   npm install
   ```

2. **Variables de entorno**
   ```bash
   cp .env.example .env
   ```
   Ajusta:
   - `PORT`: Puerto del backend (3000 por defecto)
   - `DB_*`: Credenciales de PostgreSQL
   - `JWT_SECRET`: Genera uno seguro (`openssl rand -base64 32`)
   - `JWT_EXPIRES_IN_SECONDS`: Expiración del token (86400 = 24h)

3. **Base de datos**
   ```bash
   psql -U postgres -c "CREATE DATABASE blog;"
   ```

4. **Ejecutar**
   ```bash
   npm run start:dev
   ```

   API base: `http://localhost:3000/api`

---

## 🎨 Frontend (React + Next.js)

El frontend vive en `frontend/` e incluye login/registro, listado de posts con filtros, detalle con comentarios y formularios protegidos para crear/editar.

```bash
cd frontend
cp .env.example .env.local          # NEXT_PUBLIC_API_URL (por defecto http://localhost:3000/api)
npm install
npm run dev                         # http://localhost:3000 (si backend usa 3000, Next tomará 3001)
```

Características destacadas:
- React Query para caché de posts/tags/comentarios
- Contexto de autenticación que guarda el JWT en `localStorage`
- Formularios con `react-hook-form` + `zod`
- Componentes UI reutilizables + Tailwind CSS v4


---

