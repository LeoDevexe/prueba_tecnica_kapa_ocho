# Dashboard de Proyectos — Kapa Ocho LayerEight

Mini dashboard de proyectos para la prueba técnica, construido con **Next.js (App Router)**, **TypeScript** y **Tailwind CSS**, con persistencia en **localStorage** y arquitectura **Feature-Based + separación por capas**.

---

## 🚀 Cómo ejecutar y probar

### Requisitos previos

- **Node.js** 18+ (recomendado 20+)
- **npm** o **pnpm** (recomendado)

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd prueba_tecnica_kapa_ocho

# Instalar dependencias
npm install
# o si usas pnpm
pnpm install
```

### Ejecución en modo desarrollo

```bash
npm run dev
# o
pnpm dev
```

La aplicación estará disponible en: **[http://localhost:3000](http://localhost:3000)**

> ⚡ **Optimizado con Turbopack**: Este proyecto usa Turbopack, el nuevo bundler de Next.js que compila hasta **10x más rápido** que Webpack tradicional.

### Otros comandos disponibles

```bash
# Compilar para producción
npm run build

# Ejecutar versión de producción (requiere build previo)
npm start

# Linter
npm run lint
```

---

## ✅ Flujo de prueba recomendado

1. **Inicio** (`/`) — En la home, clic en "Ver proyectos" o "Proyectos" en el header.

2. **Listado** (`/projects`) — Tabla vacía al inicio. Crear el primer proyecto con el botón "Nuevo proyecto".

3. **Crear** (`/projects/new`) — Rellenar formulario:
   - **Nombre** y **Cliente** (obligatorios)
   - **Estado** (PLANNED, IN_PROGRESS, DONE)
   - **Descripción** (opcional)
   - Al enviar: se guarda vía API, muestra toast de éxito y redirige al listado
   - Si faltan campos: verás validación en tiempo real y toast de error

4. **Búsqueda y filtros** — En el listado, probar:
   - Buscador por nombre o cliente
   - Filtro por estado (Planificado, En progreso, Completado)

5. **Detalle** (`/projects/[id]`) — Clic en el nombre del proyecto desde la tabla:
   - Ver información completa
   - Botón "Marcar como completado" (solo si no está en DONE)

6. **API REST** — Los endpoints pueden probarse con Postman, Thunder Client, curl, etc:
   ```bash
   # Listar proyectos
   GET http://localhost:3000/api/projects
   
   # Crear proyecto
   POST http://localhost:3000/api/projects
   Content-Type: application/json
   {
     "name": "Proyecto Test",
     "client": "Cliente ABC",
     "status": "PLANNED",
     "description": "Descripción opcional"
   }
   
   # Obtener proyecto por ID
   GET http://localhost:3000/api/projects/[id]
   
   # Actualizar proyecto
   PATCH http://localhost:3000/api/projects/[id]
   Content-Type: application/json
   {
     "status": "DONE"
   }
   ```

---

## 💾 Persistencia de datos

- **Cliente (UI):** Los datos se guardan vía API que persiste en el archivo `data/projects.json` en el servidor
- **Datos persistentes:** Al recargar la página, los proyectos se cargan automáticamente desde el servidor
- **Arquitectura:** El cliente hace peticiones fetch a las APIs REST, que usan `FileProjectRepository` para leer/escribir en el sistema de archivos

---

## ⚡ Optimizaciones de rendimiento

Este proyecto incluye múltiples optimizaciones para máximo rendimiento:

### Turbopack
- Bundler de nueva generación incluido en Next.js
- Compilación hasta **10x más rápida** que Webpack
- Hot Module Replacement (HMR) casi instantáneo

### Optimizaciones de React
- **React.memo** en componentes clave (`ProjectTable`, `ProjectSearch`, `StatusFilter`)
- **useCallback** para memoizar funciones y evitar re-renders innecesarios
- Componentes optimizados para minimizar actualizaciones del DOM

### Configuración de Next.js
- **SWC Minify**: Minificación ultrarrápida
- **Optimización de paquetes**: React y React-DOM optimizados automáticamente
- **Tree-shaking** agresivo para bundles más pequeños

### Solución de problemas

Si experimentas lentitud:

1. **Limpia la caché de Next.js:**
   ```bash
   # En Windows
   rmdir /s /q .next
   
   # En Mac/Linux
   rm -rf .next
   
   # Luego reinicia
   npm run dev
   ```

2. **Verifica que no haya múltiples servidores ejecutándose:**
   - Solo debe haber una instancia en el puerto 3000
   - Cierra otras terminales con servidores de desarrollo

3. **Para máximo rendimiento, usa el build de producción:**
   ```bash
   npm run build
   npm start
   ```
   La versión de producción está completamente optimizada y es significativamente más rápida.

---

## Cumplimiento de requisitos

| Requisito | Cumplimiento |
|-----------|----------------|
| **4. Descripción general** — Proyecto con ID, nombre, cliente, estado (PLANNED, IN_PROGRESS, DONE), descripción opcional, fecha creación y actualización | ✅ `types/index.ts` + modelo en toda la app |
| **5. Listado** (`/projects`) — Tabla/listado, buscador por nombre o cliente, botón nuevo proyecto | ✅ Tabla responsive, `ProjectSearch`, filtro por estado, botón "Nuevo proyecto" |
| **5. Creación** (`/projects/new`) — Formulario con validación, persistencia, redirección y mensaje éxito/error | ✅ `ProjectForm` + Zod, persistencia vía API en `data/projects.json`, redirect a `/projects`, toasts |
| **5. Detalle** (`/projects/[id]`) — Información completa, botón marcar como DONE | ✅ `ProjectDetailCard`, botón "Marcar como completado" |
| **6. API** — GET/POST `/api/projects`, GET/PATCH `/api/projects/[id]`, respuestas JSON y manejo de errores | ✅ Route Handlers en `app/api/projects` y `app/api/projects/[id]` |
| **7. Reglas técnicas** — App Router, TypeScript, validaciones, manejo de errores, organización, UI Tailwind | ✅ App Router, tipado estricto, Zod, toasts y estados de error, estructura por features/capas, Tailwind en todos los componentes |

---

## Arquitectura: Feature-Based + Layer Separation

El proyecto organiza código por **features** y por **capas** para separar responsabilidades y facilitar escalabilidad.

### Estructura de carpetas

```
/app                    # App Router (páginas y API)
  /api/projects         # Route Handlers (GET, POST, GET/PATCH [id])
  /projects             # Listado, nuevo, detalle
  layout.tsx, page.tsx
/components             # UI compartida y por dominio
  /ui                   # Botones, inputs, cards, badge, select, textarea
  /projects             # Tabla, búsqueda, filtro, formulario, detalle, empty states
/features
  /projects             # Feature “proyectos”
    /hooks              # useProjectsRepository (capa aplicación)
    index.ts
/lib
  /storage
    /repositories       # Capa datos: Repository Pattern
      BaseRepository.ts
      IProjectRepository.ts
      ProjectRepository.ts      # Cliente (localStorage)
      FileProjectRepository.ts  # Servidor (archivo JSON)
  /validations         # Schemas Zod (capa dominio)
  /utils               # id, etc.
/types                 # Interfaces y tipos de dominio
```

### Capas

| Capa | Ubicación | Responsabilidad |
|------|-----------|-----------------|
| **Presentación** | `app/`, `components/` | Páginas, layouts, componentes UI |
| **Aplicación** | `features/projects/hooks/` | Casos de uso, orquestación (hooks) |
| **Dominio** | `types/`, `lib/validations/` | Entidades, reglas de negocio, validación |
| **Datos** | `lib/storage/repositories/` | Acceso a datos (Repository) |

---

## Patrones de diseño utilizados

### 1. Repository Pattern

Abstrae el acceso a datos detrás de una interfaz, de modo que la aplicación no dependa de localStorage, archivos o APIs concretas.

- **`BaseRepository<T>`** (`lib/storage/repositories/BaseRepository.ts`): clase base abstracta para persistencia en **localStorage** (cliente). Expone `getAll()` y `save(items)` protegidos; las subclases definen la clave de almacenamiento y la entidad.

- **`IProjectRepository`**: interfaz con `getAll()`, `getById(id)`, `create(data)`, `update(id, data)`.

- **`ProjectRepository`**: implementación alternativa en el **cliente** que extiende `BaseRepository<Project>` y usa localStorage. Actualmente no se usa, ya que el cliente consume las APIs directamente.

- **`FileProjectRepository`**: implementación en el **servidor** que cumple la misma interfaz pero persiste en un archivo JSON (`data/projects.json`). Usada por los Route Handlers (`/api/projects` y `/api/projects/[id]`).

Ventajas: sustitución de la persistencia (localStorage vs archivo vs API) sin cambiar la lógica de negocio; pruebas más sencillas con mocks de la interfaz.

### 2. Separación por capas (Layered Architecture)

- La **capa de presentación** solo muestra datos y delega acciones en hooks.
- La **capa de aplicación** (hooks) usa el repositorio y opcionalmente validaciones, sin conocer detalles de UI.
- La **capa de dominio** define tipos y reglas (Zod).
- La **capa de datos** se limita a repositorios; el resto del código depende de `IProjectRepository`, no de localStorage o archivos.

### 3. Validación en runtime (Zod)

Los schemas en `lib/validations/project.ts` validan entrada en cliente y en API (POST/PATCH), garantizando tipos y reglas de negocio en runtime.

### 4. Server / Client Components

- Páginas en `app/` son Server Components por defecto (metadata, Suspense).
- Solo los contenedores que usan estado, hooks o repositorio en cliente están marcados con `"use client"` (por ejemplo `ProjectsPageClient`, `NewProjectForm`, `ProjectDetailView`).

---

## Persistencia y Arquitectura de Datos

La aplicación utiliza una arquitectura cliente-servidor moderna:

```
┌─────────────┐
│   Cliente   │ (React Components)
│  (Browser)  │
└──────┬──────┘
       │ fetch() / HTTP
       ▼
┌─────────────────┐
│  API Routes     │ (Next.js Route Handlers)
│  /api/projects  │
└──────┬──────────┘
       │
       ▼
┌─────────────────────────┐
│ FileProjectRepository   │ (Repository Pattern)
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│  data/projects.json     │ (Sistema de archivos)
└─────────────────────────┘
```

- **Cliente:** Usa el hook `useProjectsRepository` que hace peticiones HTTP a las APIs
- **Servidor:** Las API routes (`/api/projects/*`) usan `FileProjectRepository` 
- **Almacenamiento:** Archivo JSON en el sistema de archivos (`data/projects.json`)
- **Ventaja:** Arquitectura escalable lista para migrar a una base de datos real sin cambiar el código del cliente

---

## Stack y buenas prácticas

- **Next.js** (App Router), **TypeScript** estricto, **Tailwind CSS**
- **Zod** para validación y tipos inferidos
- **Route Handlers** en `/app/api/projects` con validación y manejo de errores
- **Estados de carga** (Suspense, skeletons) y **manejo de errores** (mensajes claros, reintento)
- **Accesibilidad**: ARIA, labels, roles donde aplica
- **Dark mode** con `ThemeProvider` y clase `dark` en `<html>`

---

## Mejoras futuras

- Migración a base de datos real (PostgreSQL, MongoDB, etc.)
- Paginación o infinite scroll en el listado
- Tests unitarios para repositorios, validaciones y hooks
- Tests E2E con Playwright o Cypress
- Filtros avanzados (fecha, cliente, búsqueda avanzada)
- Exportar/importar proyectos (JSON, CSV)
- Autenticación y autorización de usuarios
- Caché de datos con React Query o SWR

---

## Decisiones técnicas

- **Arquitectura Cliente-Servidor:** El cliente usa `fetch` para comunicarse con las API routes de Next.js, que utilizan `FileProjectRepository` para persistir en `data/projects.json`. Esto permite una arquitectura escalable tipo REST.
- **Feature "projects"** con hook `useProjectsRepository` que abstrae las llamadas a la API, desacoplando las páginas de los detalles de implementación.
- **Repository Pattern:** Se mantiene la interfaz `IProjectRepository` con implementaciones para localStorage (`ProjectRepository` - no usado actualmente) y sistema de archivos (`FileProjectRepository` - usado por las APIs).
- **Zod** en cliente y servidor para una única fuente de verdad de reglas de validación.
- **Optimizaciones de rendimiento:** Turbopack, React.memo, useCallback, y configuración optimizada de Next.js para máxima velocidad en desarrollo.