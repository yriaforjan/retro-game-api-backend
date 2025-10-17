# 🚀 RETRO VIDEOGAMES API (BACKEND)

[![Status](https://img.shields.io/badge/Status-En%20Desarrollo-blue.svg)](https://github.com/yriaforjan/retro-game-api-backend)
[![License](https://img.shields.io/badge/Status-Pendiente%20de%20Revisión-yellow.svg)]()

## 🌟 Descripción del Proyecto

API REST para la gestión de videojuegos retro y usuarios. Permite el registro y autenticación de usuarios, administración de videojuegos clásicos con imágenes de portada, y sistema de favoritos bidireccional. Construida con Node.js, Express y MongoDB, incluye autenticación JWT, roles de usuario (user/admin), y almacenamiento de archivos en Cloudinary.

## 🛠️ Tecnologías Utilizadas (Stack Tecnológico)

El proyecto está construido con las siguientes tecnologías clave:

### ⚙️ Backend y Runtime

- **Node.js:** Entorno de ejecución JavaScript.
- **Express.js:** Framework web minimalista para Node.js.

### 💾 Base de Datos

- **MongoDB:** Base de datos NoSQL para el almacenamiento de datos.
- **Mongoose:** ODM (Object Data Modeling) para interactuar con MongoDB.

### 🔒 Autenticación y Seguridad

- **JWT (JSON Web Tokens):** Para la gestión de sesiones y autenticación de usuarios.
- **Bcrypt:** Para el hash seguro de contraseñas.

### 🖼️ Gestión de Archivos y Almacenamiento en la Nube

- **Cloudinary:** Servicio de almacenamiento externo para imágenes (avatares y portadas).
- **Multer:** Middleware de Node.js para el manejo de la subida de archivos (`multipart/form-data`).
- **Multer-Storage-Cloudinary:** Integración para conectar Multer con Cloudinary.

### 🔧 Configuración

- **Dotenv:** Para la gestión de variables de entorno (como claves de API y credenciales).
-

---

## 📋 Requisitos Previos

Para ejecutar el servidor localmente, necesitas tener instalados los siguientes softwares y cuentas:

### 💻 Software Requerido

- **Node.js:** Entorno de ejecución de JavaScript.
- **MongoDB:** Base de datos NoSQL. Puede ser una instancia local (ej. a través de Docker) o remota (ej. MongoDB Atlas).

### ☁️ Cuentas de Servicios Externos

- **Cloudinary:** Necesitas una cuenta en Cloudinary para el almacenamiento de archivos (avatares de usuarios y portadas de videojuegos).

---

## ⚙️ Instalación y Configuración

Sigue estos pasos para poner en marcha la **Retro Game API** en tu entorno local:

### 1️⃣ Clonar el repositorio

```bash
$ git clone https://github.com/yriaforjan/retro-game-api-backend.git
$ cd retro-game-api-backend
```

### 2️⃣ Instalar dependencias

```bash
$ npm install
```

### 3️⃣ Configurar variables de entorno

Crea un archivo llamado **`.env`** en la raíz del proyecto y añade las siguientes variables con tus valores:

```env
PORT=8080
DB_URL=mongodb://localhost:27017/retro_videogames_api
CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret
JWT_SECRET=tu-secreto-jwt-seguro
```

#### Descripción de las variables:

- **PORT:** Puerto en el que se ejecutará el servidor (por defecto `8080`)
- **DB_URL:** URL de conexión a MongoDB
- **CLOUDINARY_CLOUD_NAME:** Nombre de tu cloud en Cloudinary
- **CLOUDINARY_API_KEY:** API Key de Cloudinary
- **CLOUDINARY_API_SECRET:** API Secret de Cloudinary
- **JWT_SECRET:** Clave secreta para firmar tokens JWT (usa una cadena aleatoria y segura)

### 4️⃣ Iniciar MongoDB

Asegúrate de que MongoDB esté corriendo en tu sistema:

```bash
# Si usas MongoDB local
$ mongod
```

### 5️⃣ Ejecutar el servidor

```bash
$ npm start
```

El servidor se iniciará en http://localhost:8080 (o el puerto que hayas configurado).

---

## ✅ Verificación de la instalación

Una vez iniciado el servidor, deberías ver en la consola algo similar a:

```bash
Conectamos con éxito a cloudinary
Servidor escuchando en http://localhost:8080
```

Puedes verificar que la API está funcionando accediendo a:

```bash
GET http://localhost:8080/api/v1/videogames
```

Esto debería devolver una lista vacía inicialmente.

---

## 🗂️ Estructura del Proyecto

```text
retro-game-api-backend/
├── index.js                          # Punto de entrada de la aplicación
├── .env                              # Variables de entorno (no versionado)
├── package.json                      # Dependencias y scripts
│
├── src/
│   ├── api/
│   │   ├── controllers/              # Lógica de negocio
│   │   │   ├── user.js              # 8 funciones de usuario
│   │   │   └── videogame.js         # 6 funciones de videojuegos
│   │   │
│   │   ├── models/                   # Esquemas de Mongoose
│   │   │   ├── user.js              # Modelo User con validaciones
│   │   │   └── videogame.js         # Modelo Videogame con validaciones
│   │   │
│   │   └── routes/                   # Definición de endpoints
│   │       ├── user.js              # Rutas de /api/v1/users
│   │       └── videogame.js         # Rutas de /api/v1/videogames
│   │
│   ├── config/                       # Configuración de servicios
│   │   ├── db.js                    # Conexión a MongoDB
│   │   └── cloudinary.js            # Configuración de Cloudinary
│   │
│   ├── middlewares/                  # Middlewares personalizados
│   │   ├── isAuth.js                # Verificación JWT
│   │   ├── isAdmin.js               # Verificación rol admin
│   │   ├── isAdminOrOwner.js        # Verificación admin o propietario
│   │   ├── avatarImg.js             # Upload de avatares (Multer)
│   │   └── coverImg.js              # Upload de portadas (Multer)
│   │
│   └── utils/                        # Utilidades
│       ├── token.js                 # Generación y verificación JWT
│       └── deleteFile.js            # Eliminación de archivos en Cloudinary
```

### 📂 Descripción de Carpetas

#### /src/api/

Contiene toda la lógica de la API organizada en capas MVC:

- **controllers/**: Lógica de negocio para usuarios y videojuegos
- **models/**: Define esquemas de Mongoose con validaciones
- **routes/**: Mapea endpoints HTTP a controladores con middlewares

#### /src/config/

Configuración de servicios externos:

- **db.js:** Conexión a MongoDB
- **cloudinary.js:** Configura SDK de Cloudinary para almacenamiento de imágenes

#### /src/middlewares/

Middlewares de autenticación, autorización y subida de archivos:

- **isAuth.js:** Verifica token JWT y carga usuario en `req.user`
- **isAdmin.js:** Requiere rol de administrador
- **isAdminOrOwner.js:** Permite acceso a admin o propietario del recurso
- **avatarImg.js:** Procesa subida de avatares a carpeta `user_avatar`
- **coverImg.js:** Procesa subida de portadas a carpeta `videogame_cover`

#### /src/utils/

Funciones auxiliares reutilizables:

- **token.js:** Generación y verificación de tokens JWT
- **deleteFile.js:** Elimina archivos de Cloudinary parseando URLs

### 🚪 Punto de entrada

El archivo `index.js` en la raíz inicializa la aplicación:

- Carga variables de entorno con dotenv
- Conecta a MongoDB y Cloudinary
- Configura middleware JSON
- Monta routers en `/api/v1/users` y `/api/v1/videogames`
- Maneja rutas 404
- Inicia servidor en el puerto configurado

---

## 📡 Endpoints de la API

La API está organizada en dos recursos principales bajo el prefijo `/api/v1`.

### 👤 Endpoints de Usuarios (`/api/v1/users`)

#### Públicos (sin autenticación)

| Método | Ruta      | Descripción                                 |
| ------ | --------- | ------------------------------------------- |
| POST   | /register | Registrar nuevo usuario con avatar opcional |
| POST   | /login    | Iniciar sesión y obtener token JWT          |

#### Autenticados (requieren JWT)

| Método | Ruta                           | Descripción                                    |
| ------ | ------------------------------ | ---------------------------------------------- |
| PUT    | /favorites/toggle/:videogameId | Añadir/quitar videojuego de favoritos          |
| PUT    | /:id                           | Editar perfil de usuario (admin o propietario) |
| DELETE | /:id                           | Eliminar usuario (admin o propietario)         |

#### Solo Admin

| Método | Ruta      | Descripción                |
| ------ | --------- | -------------------------- |
| PUT    | /:id/role | Cambiar rol de usuario     |
| GET    | /         | Listar todos los usuarios  |
| GET    | /:id      | Obtener usuario específico |

### 🎮 Endpoints de Videojuegos (`/api/v1/videogames`)

#### Públicos (sin autenticación)

| Método | Ruta    | Descripción                                          |
| ------ | ------- | ---------------------------------------------------- |
| GET    | /       | Listar todos los videojuegos                         |
| GET    | /search | Buscar videojuegos por título, consola, género o año |
| GET    | /:id    | Obtener videojuego específico                        |

#### Autenticados (requieren JWT)

| Método | Ruta | Descripción                        |
| ------ | ---- | ---------------------------------- |
| POST   | /    | Crear nuevo videojuego con portada |
| PUT    | /:id | Editar videojuego existente        |
| DELETE | /:id | Eliminar videojuego                |

---

## 📝 Ejemplos de Uso

> **Nota:** El token Bearer se obtiene al hacer login y puede reutilizarse en todos los endpoints que requieran autenticación.

### 👤 Registro de Usuario

**Ejemplo con avatar:**

```bash
curl -X POST http://localhost:8080/api/v1/users/register \
  -F "name=Juan Pérez" \
  -F "email=juan@example.com" \
  -F "password=mipassword123" \
  -F "avatar=@/ruta/a/imagen.jpg"
```

**Respuesta esperada (201):**

```json
{
  "message": "Usuario registrado con éxito",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "avatar": "https://res.cloudinary.com/.../user_avatar/imagen.jpg",
    "role": "user",
    "favoriteVideogames": []
  }
}
```

### 🔓 Login

```bash
curl -X POST http://localhost:8080/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "mipassword123"
  }'
```

**Respuesta esperada (200):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "user"
  }
}
```

> **Nota:** El campo "token" es el JWT que obtienes al hacer login.

### 🆕 Crear Videojuego (Autenticado)

```bash
curl -X POST http://localhost:8080/api/v1/videogames \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "title=Super Mario Bros." \
  -F "year=1985" \
  -F "genres=Platformer" \
  -F "genres=Adventure" \
  -F "console=NES" \
  -F "description=Juego clásico de plataformas" \
  -F "coverImg=@/ruta/a/portada.jpg"
```

**Respuesta esperada (201):**

```json
{
  "message": "Videojuego creado con éxito",
  "videogame": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Super Mario Bros.",
    "year": 1985,
    "genres": ["Platformer", "Adventure"],
    "console": "NES",
    "coverImg": "https://res.cloudinary.com/.../videogame_cover/portada.jpg",
    "favsCount": 0
  }
}
```

### 🔎 Buscar Videojuegos

**Buscar por título**

```bash
curl "http://localhost:8080/api/v1/videogames/search?title=mario"
```

**Buscar por consola y año**

```bash
curl "http://localhost:8080/api/v1/videogames/search?console=NES&year=1985"
```

**Buscar por género**

```bash
curl "http://localhost:8080/api/v1/videogames/search?genre=Platformer"
```

> **Nota:** Este endpoint acepta parámetros **title** (búsqueda parcial case-insensitive), **console**, **genre** y **year**.

### ♥️ Añadir/Quitar Favorito (Autenticado)

```bash
curl -X PUT http://localhost:8080/api/v1/users/favorites/toggle/507f1f77bcf86cd799439012 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Respuesta esperada al añadir a favoritos (200):**

```json
{
  "message": "Videojuego añadido a favoritos",
  "favorites": ["507f1f77bcf86cd799439012"]
}
```

**Respuesta esperada al quitar de favoritos (200):**

```json
{
  "message": "Videojuego eliminado de favoritos",
  "favorites": []
}
```

### ✏️ Editar Usuario (Admin o Propietario)

```bash
curl -X PUT http://localhost:8080/api/v1/users/507f1f77bcf86cd799439011 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "name=Juan Pérez Actualizado" \
  -F "avatar=@/ruta/a/nuevo-avatar.jpg"
```

Si subes un nuevo avatar, el antiguo se elimina automáticamente de Cloudinary.

### 👮🏼 Cambiar Rol (Solo Admin)

```bash
curl -X PUT http://localhost:8080/api/v1/users/507f1f77bcf86cd799439011/role \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"role": "admin"}'
```

Este endpoint requiere que el usuario autenticado tenga rol admin.

### 📋 Listar Todos los Videojuegos

```bash
curl http://localhost:8080/api/v1/videogames
```

**Respuesta esperada (200):**

```json
{
  "videogames": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Super Mario Bros.",
      "year": 1985,
      "genres": ["Platformer", "Adventure"],
      "console": "NES",
      "favsCount": 5
    }
  ]
}
```

---

## 🔒 Autenticación y Autorización

### Sistema JWT

La API utiliza **JSON Web Tokens (JWT)** para autenticación.  
Los tokens tienen validez de **1 día** y se incluyen en el header:

```bash
Authorization: Bearer <tu-token-jwt>
```

### Roles

| Rol   | Permisos                                                     |
| ----- | ------------------------------------------------------------ |
| user  | Gestionar perfil propio, favoritos, CRUD de videojuegos      |
| admin | Acceso completo: ver usuarios, cambiar roles, gestionar todo |

### Middlewares

| Middleware       | Función                                 |
| ---------------- | --------------------------------------- |
| `isAuth`         | Verifica JWT válido (401 si falla)      |
| `isAdmin`        | Requiere rol admin (403 si no es admin) |
| `isAdminOrOwner` | Permite admin o propietario del recurso |

### Protección de Endpoints

| Tipo de acceso    | Endpoints                                          |
| ----------------- | -------------------------------------------------- |
| Públicos          | `/register`, `/login`, `GET /videogames`           |
| Autenticados      | `/favorites/toggle`, `POST/PUT/DELETE /videogames` |
| Solo Admin        | `GET /users`, `PUT /:id/role`                      |
| Admin/Propietario | `PUT /users/:id`, `DELETE /users/:id`              |

### Seguridad

- Contraseñas **hasheadas** con bcrypt (10 salt rounds)
- Campo **password** eliminado de todas las respuestas
- Tokens firmados con `JWT_SECRET` definido en el archivo `.env`

---

## 📦 Modelos de Datos

La API utiliza **MongoDB** con **Mongoose** como ODM, definiendo dos modelos principales con validaciones y relaciones.

### 👤 Modelo User

Esquema de usuario con autenticación, roles y sistema de favoritos.

| Campo              | Tipo            | Validaciones                             | Descripción             |
| ------------------ | --------------- | ---------------------------------------- | ----------------------- |
| name               | String          | Requerido, trim                          | Nombre del usuario      |
| email              | String          | Requerido, único, regex email            | Email de autenticación  |
| password           | String          | Requerido, mínimo 8 caracteres           | Hash bcrypt (10 rounds) |
| avatar             | String          | Opcional                                 | URL de Cloudinary       |
| role               | String          | Enum: ["user", "admin"], default: "user" | Rol de autorización     |
| favoriteVideogames | Array[ObjectId] | Referencia a Videogame                   | IDs de juegos favoritos |
| timestamps         | Date            | Automático                               | createdAt, updatedAt    |

**Características especiales:**

- **Hash automático de contraseñas:** Hook `pre('save')` hashea contraseñas con bcrypt antes de guardar.
- **Relación bidireccional:** Array `favoriteVideogames` se sincroniza con `favsCount` del modelo Videogame.

### 🎮 Modelo Videogame

Esquema de videojuegos retro con validaciones de consolas y géneros.

| Campo       | Tipo          | Validaciones                          | Descripción                  |
| ----------- | ------------- | ------------------------------------- | ---------------------------- |
| title       | String        | Requerido, único, trim                | Título del juego             |
| year        | Number        | Requerido, min: 1970, max: año actual | Año de lanzamiento           |
| genres      | Array[String] | Enum de 16 géneros                    | Géneros del juego            |
| console     | String        | Requerido, enum de 13 consolas        | Plataforma retro             |
| description | String        | Opcional, max: 2000 caracteres        | Descripción del juego        |
| coverImg    | String        | Requerido                             | URL de portada en Cloudinary |
| favsCount   | Number        | Default: 0                            | Contador de favoritos        |
| timestamps  | Date          | Automático                            | createdAt, updatedAt         |

**Géneros disponibles:**

`Action, Adventure, Platformer, Shooter, RPG, Puzzle, Fighting, Sports, Racing, Simulation, Strategy, Beat 'em up, Horror, Maze, Pinball`

**Consolas disponibles:**

`Arcade, NES, SNES, Game Boy, Game Boy Color, Game Boy Advance, Genesis, Mega Drive, Atari 2600, Atari 5200, Atari 7800, PS1, PS2, N64`

### 🔗 Relación entre Modelos

![Relación entre User y Videogame](./assets/models-relationship.png "User ↔ Videogame")

Cuando un usuario añade o quita un videojuego de favoritos:

- Se actualiza **`User.favoriteVideogames[]`**
- Se actualiza **`Videogame.favsCount`** simultáneamente

La sincronización utiliza el operador **`$inc`** para incrementos/decrementos atómicos.

---

## ⚠️ Manejo de Errores

La API implementa un sistema robusto de manejo de errores con códigos HTTP estándar y mensajes descriptivos en español.

### 📊 Códigos de Estado HTTP

| Código | Tipo de Error         | Cuándo Ocurre                                   |
| ------ | --------------------- | ----------------------------------------------- |
| 400    | Bad Request           | Datos inválidos, validación fallida, duplicados |
| 401    | Unauthorized          | Token ausente, inválido o expirado              |
| 403    | Forbidden             | Sin permisos suficientes                        |
| 404    | Not Found             | Recurso no encontrado                           |
| 500    | Internal Server Error | Errores inesperados del servidor                |

### 🛠️ Tipos de Errores

#### Errores de Validación (400)

- **Mongoose ValidationError:** Campos requeridos faltantes, valores fuera de rango, enums inválidos
- **CastError:** Formato de ObjectId inválido en parámetros
- **Duplicados:** Email o título ya registrado

#### Errores de Autenticación (401)

- Token JWT ausente o inválido
- Credenciales incorrectas en login

#### Errores de Autorización (403)

- Usuario sin rol admin cuando se requiere
- Usuario sin permisos de propietario

#### Errores de Recursos (404)

- Usuario no encontrado
- Videojuego no encontrado
- Ruta no encontrada

### 📤 Formato de Respuesta

Todas las respuestas de error siguen el mismo formato JSON:

```json
{
  "error": "Mensaje descriptivo del error en español"
}
```

### 🧹 Limpieza de Archivos

La API elimina automáticamente archivos en Cloudinary cuando ocurren errores:

- **Registro fallido:** elimina avatar subido
- **Edición fallida:** elimina nueva imagen, mantiene la antigua
- **Creación de videojuego fallida:** elimina portada subida

### 💬 Ejemplos de Mensajes de Error

**Validación:**

- "Datos de usuario inválidos"
- "Datos de videojuego incorrectos"

**Duplicados:**

- "Ya existe un usuario registrado con este email"
- "Ya existe un videojuego registrado con ese título"

**Autenticación:**

- "No autorizado"
- "Usuario o contraseña incorrectos"

**Autorización:**

- "Prohibido. Se requieren permisos de administrador"
- "No tiene permisos para realizar esta acción"

**Recursos:**

- "No se ha encontrado ningún usuario con el id {id}"
- "No se ha encontrado ningún videojuego con el id {id}"
- "Ruta no encontrada"

---

## 📄 Licencia

Este proyecto es **de carácter escolar y educativo**, desarrollado como parte de un trabajo de máster.  
No está destinado a fines comerciales ni de distribución fuera del ámbito educativo.

---

## 👩🏼‍💻 Autor

Desarrollado por **Yria Forján Oliveira**

GitHub: [@yriaforjan](https://github.com/yriaforjan)
