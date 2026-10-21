// Middleware de registro y auditoria de trafico

export function logger(req, res, next){
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl || req.url;

    console.log(`[${timestamp}] 🇬🇹 ${method} -> ${url}`);

    next(); // Obligatorio el next para seguir con las validaciones
}

