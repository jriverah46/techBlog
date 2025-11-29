# 🧠 TechBlog – Plataforma completa de blog tecnológico

TechBlog es una solución  para publicar, leer y discutir artículos relacionados con tecnología. El backend está construido en **NestJS + TypeORM + PostgreSQL** con autenticación **JWT**, mientras que el nuevo frontend utiliza **Next.js 16 + React 19 + TypeScript**.

---

## 🚀 Tecnologías principales

| Capa | Stack |
| --- | --- |
| Backend | NestJS 11, TypeORM, PostgreSQL, JWT, bcrypt, class-validator |
| Frontend | Next.js 16 (App Router), React 19, React Query, Tailwind CSS v4 |


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
   - `DB_*`: 
   - `JWT_SECRET`: 
   - `JWT_EXPIRES_IN_SECONDS`: 

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

El frontend esta en `frontend/` 
```bash
cd frontend
cp .env.example .env.local          
npm install
npm run dev                         
```



