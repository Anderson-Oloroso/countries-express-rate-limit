// En este modulo se centrará todo lo relacionado a los rateLimit y limiaciones del servidor
import { rateLimit } from 'express-rate-limit';

// Limitador general
export const apiLimiter = rateLimit({
    windowMs: 60*1000,
    limit: 5,
    statusCode: 429,
    standardHeaders: 'draft-7',
    legacyHeaders: true,
    message: {
        success: true,
        status: 429,
        error: 'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo en un minuto.',
        detail: 'Has agotado tus 5 tokens desponibles en la ventana actual de 60 segundos.'
    }
});

// Limitador estricto de creacion de Paises
export const createCountry = rateLimit({
    windowMs: 60*1000,
    limit: 3,
    statusCode: 429,
    standardHeaders: 'draft-7',
    message:{
        success: true,
        status: 429,
        error: 'Limite de creación alcanzado: Solo puedes registrar 3 paises por minuto',
        detail: 'Espera a que se reinicie la ventana de tiempo antes de enviar otro POST.'
    }
});