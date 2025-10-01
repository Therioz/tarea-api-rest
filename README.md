# 📝 Administracion de Tareas API-REST

API REST para gestión de tareas desarrollada con NestJS, Prisma ORM y PostgreSQL, implementando autenticación mediante API Key.

## 🚀 Tecnologías utilizadas

- **Framework**: NestJS 10.x
- **ORM**: Prisma 5.x
- **Base de datos**: PostgreSQL
- **Autenticación**: API Key
- **Documentación**: Swagger/OpenAPI
- **Validación**: class-validator + class-transformer
- **Lenguaje**: TypeScript

## ✨ Características

- ✅ CRUD completo de tareas
- ✅ Autenticación por API Key
- ✅ Filtrado de tareas por estado
- ✅ Búsqueda de tareas por texto
- ✅ Validación de datos robusta
- ✅ Documentación interactiva con Swagger
- ✅ Manejo de errores centralizado
- ✅ Tipado fuerte con TypeScript

## 📋 Modelo de datos

### Task (Tarea)

| Campo       | Tipo     | Descripción                             | Requerido             |
| ----------- | -------- | --------------------------------------- | --------------------- |
| id          | String   | Identificador único (CUID)              | Auto-generado         |
| title       | String   | Título de la tarea                      | Sí                    |
| description | String   | Descripción detallada                   | No                    |
| status      | Enum     | Estado: PENDING, IN_PROGRESS, COMPLETED | Sí (default: PENDING) |
| createdAt   | DateTime | Fecha de creación                       | Auto-generado         |
| dueDate     | DateTime | Fecha de vencimiento                    | No                    |
| updatedAt   | DateTime | Última actualización                    | Auto-actualizado      |

## 🛠️ Instalación

### Prerrequisitos

- Node.js 18+ instalado
- PostgreSQL 12+ instalado y corriendo
- npm o yarn

### 1. Clonar el repositorio

```bash
git clone https://github.com/Therioz/tarea-api-rest.git
cd tarea-api-rest
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
# Database Connection
DATABASE_URL="postgresql://usuario:password@localhost:5432/tareadb"

# API Key para autenticación
API_KEY="tarea-api-key-2025"

# Puerto de la aplicación
PORT=3000
```

**Notas importantes:**

- Reemplaza `usuario` y `password` con tus credenciales de PostgreSQL
- Si tu contraseña contiene caracteres especiales, debes codificarlos (ej: `@` → `%40`)
- Puedes cambiar el valor de `API_KEY` por cualquier string seguro

### 4. Crear la base de datos

Conectarse a PostgreSQL y ejecutar:

```sql
CREATE DATABASE tareadb;
```

### 5. Ejecutar migraciones de Prisma

```bash
# Generar el cliente de Prisma
npx prisma generate

# Crear las tablas en la base de datos
npx prisma migrate dev --name init
```

### 6. Iniciar la aplicación

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

La aplicación estará disponible en `http://localhost:3000`

## 📚 Documentación de la API

### Swagger UI

Una vez iniciada la aplicación, accede a la documentación interactiva:

```
http://localhost:3000/api/docs
```

Desde aquí puedes:

- Ver todos los endpoints disponibles
- Probar la API directamente desde el navegador
- Ver ejemplos de request/response
- Autorizar tus requests con la API Key

### Autenticación

Todos los endpoints requieren autenticación mediante API Key en el header:

```
x-api-key: tarea-api-key-2025
```

## 🔌 Endpoints

### 1. Crear una tarea

**POST** `/tasks`

**Headers:**

```
x-api-key: tarea-api-key-2025
Content-Type: application/json
```

**Body:**

```json
{
  "title": "Completar documentación",
  "description": "Escribir README.md completo",
  "dueDate": "2024-12-31T23:59:59Z"
}
```

**Respuesta (201):**

```json
{
  "id": "clx1a2b3c4d5e6f7g8h9i0j1",
  "title": "Completar documentación",
  "description": "Escribir README.md completo",
  "status": "PENDING",
  "createdAt": "2024-10-01T10:30:00.000Z",
  "dueDate": "2024-12-31T23:59:59.000Z",
  "updatedAt": "2024-10-01T10:30:00.000Z"
}
```

### 2. Listar tareas

**GET** `/tasks`

**Headers:**

```
x-api-key: tarea-api-key-2025
```

**Query Parameters (opcionales):**

- `status`: Filtrar por estado (`PENDING`, `IN_PROGRESS`, `COMPLETED`)
- `search`: Buscar en título y descripción

**Ejemplos:**

```
GET /tasks
GET /tasks?status=PENDING
GET /tasks?search=documentación
GET /tasks?status=IN_PROGRESS&search=API
```

**Respuesta (200):**

```json
[
  {
    "id": "clx1a2b3c4d5e6f7g8h9i0j1",
    "title": "Completar documentación",
    "description": "Escribir README.md completo",
    "status": "PENDING",
    "createdAt": "2024-10-01T10:30:00.000Z",
    "dueDate": "2024-12-31T23:59:59.000Z",
    "updatedAt": "2024-10-01T10:30:00.000Z"
  }
]
```

### 3. Actualizar estado de una tarea

**PATCH** `/tasks/:id/status`

**Headers:**

```
x-api-key: tarea-api-key-2025
Content-Type: application/json
```

**Body:**

```json
{
  "status": "IN_PROGRESS"
}
```

**Estados válidos:**

- `PENDING` - Pendiente
- `IN_PROGRESS` - En progreso
- `COMPLETED` - Completada

**Respuesta (200):**

```json
{
  "id": "clx1a2b3c4d5e6f7g8h9i0j1",
  "title": "Completar documentación",
  "description": "Escribir README.md completo",
  "status": "IN_PROGRESS",
  "createdAt": "2024-10-01T10:30:00.000Z",
  "dueDate": "2024-12-31T23:59:59.000Z",
  "updatedAt": "2024-10-01T10:35:00.000Z"
}
```

### 4. Obtener una tarea por ID

**GET** `/tasks/:id`

**Headers:**

```
x-api-key: tarea-api-key-2025
```

**Respuesta (200):**

```json
{
  "id": "clx1a2b3c4d5e6f7g8h9i0j1",
  "title": "Completar documentación",
  "description": "Escribir README.md completo",
  "status": "IN_PROGRESS",
  "createdAt": "2024-10-01T10:30:00.000Z",
  "dueDate": "2024-12-31T23:59:59.000Z",
  "updatedAt": "2024-10-01T10:35:00.000Z"
}
```

## 🧪 Ejemplos con cURL

### Crear una tarea

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "x-api-key: tarea-api-key-2025" \
  -d '{
    "title": "Aprender NestJS",
    "description": "Completar tutorial oficial",
    "dueDate": "2024-12-15T00:00:00Z"
  }'
```

### Listar todas las tareas

```bash
curl -X GET http://localhost:3000/tasks \
  -H "x-api-key: tarea-api-key-2025"
```

### Filtrar tareas pendientes

```bash
curl -X GET "http://localhost:3000/tasks?status=PENDING" \
  -H "x-api-key: tarea-api-key-2025"
```

### Actualizar estado

```bash
curl -X PATCH http://localhost:3000/tasks/clx1a2b3c4d5e6f7g8h9i0j1/status \
  -H "Content-Type: application/json" \
  -H "x-api-key: tarea-api-key-2025" \
  -d '{"status": "COMPLETED"}'
```

## 🧪 Pruebas con Postman

1. Importa la colección desde Swagger:

   - Ve a `http://localhost:3000/api/docs`
   - Descarga el JSON de OpenAPI
   - Importa en Postman

2. Configura el header global:

   - Key: `x-api-key`
   - Value: `tarea-api-key-2025`

3. Prueba cada endpoint desde la colección

## 📂 Estructura del proyecto

```
task-api/
├── prisma/
│   ├── migrations/          # Historial de migraciones
│   └── schema.prisma        # Esquema de base de datos
├── src/
│   ├── auth/
│   │   └── api-key.guard.ts # Guard de autenticación
│   ├── prisma/
│   │   └── prisma.service.ts # Servicio de Prisma
│   ├── tasks/
│   │   ├── dto/
│   │   │   └── task.dto.ts  # Data Transfer Objects
│   │   ├── tasks.controller.ts # Controlador REST
│   │   ├── tasks.service.ts    # Lógica de negocio
│   │   └── tasks.module.ts     # Módulo de tareas
│   ├── app.module.ts        # Módulo principal
│   └── main.ts              # Punto de entrada
├── .env                     # Variables de entorno (no incluir en Git)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## ⚠️ Códigos de error comunes

| Código | Error                 | Solución                                        |
| ------ | --------------------- | ----------------------------------------------- |
| 400    | Bad Request           | Verifica que los datos enviados sean válidos    |
| 401    | Unauthorized          | Verifica que el header `x-api-key` sea correcto |
| 404    | Not Found             | Verifica que el ID de la tarea exista           |
| 500    | Internal Server Error | Revisa los logs del servidor                    |
