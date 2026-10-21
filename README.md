# Countries Express Rate Limit

API REST de países creada con Node.js y Express como proyecto pedagógico para aprender a organizar rutas, middlewares, validaciones y límites de solicitudes con `express-rate-limit`. Los datos se guardan en memoria; no se utiliza una base de datos externa.

---

## Objetivo

Practicar la construcción y prueba de una API REST sencilla, incluyendo operaciones CRUD, validación de los datos recibidos y protección de los endpoints frente a solicitudes frecuentes.

## ¿Qué hace el proyecto?

La API permite:

- Consultar la lista de países y buscar un país por su ID.
- Crear, actualizar y eliminar países.
- Validar que las solicitudes de creación y actualización incluyan nombre, capital, moneda, gentilicio e idioma.
- Aplicar un límite general de **5 solicitudes por minuto por IP** a `/api/countries` y un límite adicional de **3 solicitudes POST por minuto por IP**.
- Registrar las solicitudes en consola y devolver respuestas JSON para errores y rutas inexistentes.

Los datos iniciales están en un arreglo en memoria. Los cambios realizados mediante la API se pierden al reiniciar el servidor.

---

## Estructura de directorios

```text
.
├── bruno/
│   ├── opencollection.yml
│   └── countries/
│       ├── folder.yml
│       ├── list-countries.yml
│       ├── get-country-by-id.yml
│       ├── create-country.yml
│       ├── update-country.yml
│       └── delete-country.yml
├── src/
│   ├── app.js
│   ├── data/
│   │   └── countries.data.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   ├── rateLimiter.js
│   │   └── validator.js
│   └── routes/
│       └── countries.route.js
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── package.json
└── package-lock.json
```

### Responsabilidad de los archivos principales

- `src/app.js`: configura Express, registra los middlewares globales y monta las rutas.
- `src/routes/countries.route.js`: define los cinco endpoints CRUD.
- `src/data/countries.data.js`: contiene los países iniciales en memoria.
- `src/middlewares/validator.js`: valida los campos de creación y actualización.
- `src/middlewares/rateLimiter.js`: configura los límites de solicitudes.
- `src/middlewares/logger.js`: registra las solicitudes entrantes.
- `src/middlewares/errorHandler.js`: genera respuestas para errores.
- `bruno/`: colección OpenCollection YAML con las solicitudes de prueba.

---

## Endpoints

La URL base local es `http://localhost:3000`.

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/api/countries` | Lista los países. |
| `GET` | `/api/countries/:id` | Busca un país por ID. |
| `POST` | `/api/countries` | Crea un país. |
| `PUT` | `/api/countries/:id` | Actualiza todos los campos de un país. |
| `DELETE` | `/api/countries/:id` | Elimina un país. |

Los campos requeridos para `POST` y `PUT` son `nombre`, `capital`, `moneda`, `gentilicio` e `idioma`. El idioma puede ser una cadena o una lista de cadenas no vacías. Por ejemplo:

```json
{
  "nombre": "Argentina",
  "capital": "Buenos Aires",
  "moneda": "Peso argentino",
  "gentilicio": "argentino",
  "idioma": "español"
}
```

---

## Iniciar el proyecto localmente

Requisitos: Node.js y npm instalados.

1. Clona el repositorio y entra en la carpeta del proyecto.
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea `.env` a partir de la plantilla. En PowerShell:

   ```powershell
   Copy-Item .env.example .env
   ```

   La plantilla establece `PORT=3000`. Si `.env` ya existe, puedes conservarlo.

4. Inicia la aplicación en modo desarrollo:

   ```bash
   npm run dev
   ```

   Para iniciarla sin el modo de recarga automática:

   ```bash
   npm start
   ```

5. Abre `http://localhost:3000` para ver el mensaje de bienvenida y `http://localhost:3000/api/countries` para listar los países.

---

## Pruebas con Bruno

La carpeta `bruno/` contiene una colección en formato OpenCollection YAML, compatible con Bruno 3 o posterior.

1. Inicia la API localmente; las solicitudes usan `http://localhost:3000`.
2. Abre Bruno y selecciona **Open Collection**.
3. Selecciona la carpeta `bruno` del proyecto.
4. Ejecuta las cinco solicitudes de la carpeta `countries`:
   - **List countries** — lista los países.
   - **Get country by ID** — consulta el país con ID `1`.
   - **Create country** — crea un país de ejemplo.
   - **Update country** — actualiza el país con ID `1`.
   - **Delete country** — elimina el país con ID `1`.

Las solicitudes de actualización y eliminación modifican los datos en memoria. La solicitud de creación agrega otro país; los cambios desaparecen al reiniciar el servidor. Cada solicitud a `/api/countries` cuenta para el límite general de 5 por minuto; al alcanzarlo, espera a que se reinicie la ventana de tiempo antes de continuar.

---

## Iniciar con Docker Compose

Con Docker y Docker Compose instalados, asegúrate de que exista `.env` y ejecuta:

```bash
docker compose up --build
```

La API quedará disponible en `http://localhost:3000`. Para detener y retirar el contenedor:

```bash
docker compose down
```
