import express from 'express';
import 'dotenv/config';
import { logger } from './middlewares/logger.js';
import { apiLimiter } from './middlewares/rateLimiter.js';
import { errorHandler } from './middlewares/errorHandler.js';
import countriesRouter from './routes/countries.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.get('/', (req, res)=>{
    res.status(200).json({
        message: 'Bienvenido a la API de países protegida con express-rate-limit (Campuslands)',
        security: 'Middleware express-rate-limit activo en /api/countries (Máx. 5 peticiones por minuto por IP)',
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

app.use('/api/countries', apiLimiter, countriesRouter);

app.use((req, res)=>{
    res.status(404).json({
        success: false,
        error: `La ruta '${req.originalUrl}' no existe en el servidor de países.`
    });
});

app.use(errorHandler);

if(process.env.NODE_ENV !== 'test'){
    app.listen(PORT, ()=>{
        console.log(`\n===========================================================`);
        console.log(`   Servidor de Paises iniciado en http://localhost:${PORT}`);
        console.log(`   Rate Limit activo en /api/countries Máx: 5 req / min`);
        console.log(`\n===========================================================`);
    });
}

export default app;