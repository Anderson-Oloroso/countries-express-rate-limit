// Middleware global de manejo de errores
// Este se distingue en expres por tener 4 parametros

export function errorHandler(err, req, res, next){
    console.error('[ERROR CAPTURADO EN EL SERVIDOR]: ', err.message);

    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || 'Error interno en el servidor de Paises';

    res.status(statusCode).json({
        success: false,
        error: {
            code: statusCode,
            message: message
        }
    });
}