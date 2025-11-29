## TechBlog Frontend

Aplicación web construida con **Next.js 16**, **React 19** y **TypeScript** que consume el backend NestJS para autenticar, crear y leer artículos, gestionar etiquetas y comentarios.

### Requisitos
- Node.js 18+ (recomendado 20 LTS)
- Backend corriendo en `http://localhost:3000/api`
- Variables de entorno configuradas en `frontend/.env.local`

### Variables de entorno

Duplica el archivo de ejemplo:
```bash
cp .env.example .env.local
```

Campos disponibles:
- `NEXT_PUBLIC_API_URL`: URL base del backend (por defecto `http://localhost:3000/api`)

### Scripts disponibles

```bash
npm run dev      # desarrollo con recarga automática
npm run build    # compila la app para producción
npm run start    # sirve la versión compilada
npm run lint     # ejecuta ESLint
```

### Arquitectura
- **App Router** (`src/app`) con rutas protegidas para crear/editar posts
- **React Query** para manejar caché de datos (`posts`, `tags`, `comments`)
- **AuthContext** persiste JWT y datos de usuario en `localStorage`
- **Tailwind CSS v4** + componentes reutilizables (`Button`, `Input`, `Card`, etc.)
- Formularios con `react-hook-form` + validaciones `zod`

### Flujo principal
1. Registro / login (`/register`, `/login`)
2. Listado de artículos con buscador + filtros por etiquetas (`/`)
3. Detalle del post con comentarios (`/posts/:id`)
4. Creación/Edición protegidas (`/posts/new`, `/posts/:id/edit`)

### Integración con backend
El cliente asume los endpoints REST descritos en el backend NestJS (`/auth`, `/posts`, `/tags`, `/comments`). Ajusta `NEXT_PUBLIC_API_URL` si despliegas ambos servicios en entornos distintos.
