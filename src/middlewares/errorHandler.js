// Middleware global de manejo de errores
// Este se distingue en expres por tener 4 parametros

export function errorHandler(err, req, res, next){
    console.log('[ERROR CAPTURADO EN EL SERVIDOR]: ', err.message || err.message);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno en el servidor de Paises';

    res.status(statusCode).json({
        success: false,
        error: {
            code: statusCode,
            message: message
        }
    });
}