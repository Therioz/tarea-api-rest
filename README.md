# Tarea API-REST – Gestión de Tareas con NestJS + Prisma + PostgreSQL

API REST para gestionar tareas utilizando **NestJS**, **Prisma ORM** y **PostgreSQL**.
La autenticación se realiza mediante **API Key** fija.

---

## 🚀 Tecnologías utilizadas

* [NestJS](https://nestjs.com/) – Framework backend
* [Prisma ORM](https://www.prisma.io/) – ORM para PostgreSQL
* [PostgreSQL](https://www.postgresql.org/) – Base de datos
* Autenticación por API Key (via header `x-api-key`)

---

## 📦 Instalación y configuración

### 1. Clonar repositorio

```bash
git clone https://github.com/tuusuario/task-api.git
cd task-api
```

### 2. Variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita el archivo `.env` y configura:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/taskdb?schema=public"
API_KEY="mi_api_key_segura_aqui"
PORT=3000
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Migraciones de base de datos

Generar cliente de Prisma y migraciones:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Ejecutar aplicación

```bash
npm run start:dev
```

Servidor disponible en:
👉 `http://localhost:3000`

---

## 🔑 Autenticación

Todos los endpoints requieren header:

```
x-api-key: <tu_api_key>
```

La clave se define en `.env` bajo la variable `API_KEY`.

---

## 📖 Endpoints disponibles

### 1. Crear una nueva tarea

**POST** `/tasks`

**Body (JSON):**

```json
{
  "title": "Comprar comida para perro",
  "description": "Croquetas y premios",
  "dueDate": "2025-10-01T12:00:00.000Z"
}
```

**Ejemplo cURL:**

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "x-api-key: mi_api_key_segura_aqui" \
  -d '{"title":"Comprar comida","description":"2kg de croquetas","dueDate":"2025-10-01T12:00:00.000Z"}'
```

---

### 2. Listar tareas (con filtros)

**GET** `/tasks`

**Query params opcionales:**

* `status` → `PENDING` | `IN_PROGRESS` | `COMPLETED`
* `search` → Buscar en título o descripción
* `dueBefore` → Fecha ISO (tareas con vencimiento antes)
* `dueAfter` → Fecha ISO (tareas con vencimiento después)
* `limit` → cantidad de resultados (default 20)
* `offset` → desde qué posición empezar (default 0)

**Ejemplo:**

```
GET /tasks?status=PENDING&search=perro&limit=10
```

**Ejemplo cURL:**

```bash
curl -X GET "http://localhost:3000/tasks?status=PENDING&search=perro" \
  -H "x-api-key: mi_api_key_segura_aqui"
```

---

### 3. Actualizar estado de una tarea

**PATCH** `/tasks/:id/status`

**Body (JSON):**

```json
{
  "status": "COMPLETED"
}
```

**Ejemplo cURL:**

```bash
curl -X PATCH http://localhost:3000/tasks/1/status \
  -H "Content-Type: application/json" \
  -H "x-api-key: mi_api_key_segura_aqui" \
  -d '{"status":"COMPLETED"}'
```

---

## ⚙️ Decisiones técnicas

* **Autenticación**: API Key fija validada mediante un guard de NestJS (`ApiKeyGuard`).
* **Validación**: DTOs con `class-validator` + `ValidationPipe` global.
* **Modelo de datos**:

  * `title` (string, obligatorio)
  * `description` (string, opcional)
  * `createdAt` (datetime, default `now()`)
  * `dueDate` (datetime, opcional)
  * `status` (enum: `PENDING`, `IN_PROGRESS`, `COMPLETED`, default `PENDING`)
* **Filtros**: búsqueda por texto (`search`), filtrado por estado y rango de fechas.
* **Endpoints**: se definió `PATCH /tasks/:id/status` exclusivamente para actualizar estado, cumpliendo con el requerimiento.

