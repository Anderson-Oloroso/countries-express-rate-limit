// Servidor principal de express con middlwares y express-rate-limit
// Aplicacion de Campuslands que protege un a API REST de Paises 
// Almacenaodos en un arreglo en memoria utilizando express-rate-limit como middleware

import express from 'express';
import { logger } from './middlewares/logger.js';
import { apiLimiter } from './middlewares/rateLimiter.js';
import { errorHandler } from './middlewares/errorHandler.js';
import countries from './routes/countries.route.js';
import 'dotenv/config' 

// Iniciar Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares Globales de parseo y auditoria
app.use(express.json());
app.use(logger);

// Ruta pública de Bienvenida (Sin límite estricto de api)
app.get('/', (req, res)=>{
    res.status(200).json({
        message: 'Bienvenido a la API de videojuegos protegida con express-rate-limit (Campuslands)',
        security: 'Middleware express-rate-limit ctivo en /api/ (Máx. 5 peticiones por minuto por IP)',
        storage: 'Arreglo de paises en memoria RAM (Sin base de datos externa)',
        endpoint: {
            list_countries: 'GET /api/countries',
            find_by_id: 'GET /api/countries/:id',
            create_country: 'POST /api/countries',
            update_country: 'PUT /api/countries/:id',
            delete_country: 'DELETE /api/countries/:id' 
        }
    });
});

// Aplicar el middleware de Rate Limit a todas las rutas que comiencen con /api/
app.use('/api/countries', countriesRouter);

// Middleware para rutas Inexistentes (404 Not Found)
app.use((req, res)=>{
    res.status(404).json({
        success: false,
        error: `La ruta '${req.originalUrl}' no existe en el servidor de videojuegos.`
    });
});

// Middleware Global de Manejo de Errores (4 Parametros)
app.use(errorHandler);

// Iniciar el servidor HTTP si no estaoms en modo test
if(process.env.NODE_ENV !== 'test'){
    app.listen(PORT, ()=>{
        console.log(`\n===========================================================`);
        console.log(`   Servidor de Paises iniciado en http://localhost:${PORT}`);
        console.log(`   Rate Limit activo en /api/videojuegos Máx: 5 req / min`);
        console.log(`\n===========================================================`);
    });
}

export default app;