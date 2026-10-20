// Validaciones de los paises
// Verfifica los datos obligatorios

export function validateCountry(req, res, next){
    if(!req.body || typeof req.body !== 'object'){
        return res.status(400).json({
            exito: false,
            error: 'Se requie enviar un cuerpo JSON válido.' 
        });
    }

    const { nombre, capital, moneda, gentilicio, idioma } = req.body;

    if(!nombre || typeof nombre !== 'string' || nombre.trim().length === 0){
        return res.status(400).json({
            success: false,
            error: 'El campo "nombre" del pais es obligatorio.'
        });
    }

    if(!capital || typeof capital !== 'string' || capital.trim().length === 0){
        return res.status(400).json({
            success: false,
            error: 'El campo "capital" del pais es obligatorio.'
        });
    }

    if(!moneda || typeof nombre !== 'string' || nombre.trim().length === 0){
        return res.status(400).json({
            success: false,
            error: 'El campo "nombre" del pais es obligatorio.'
        });
    }

    if(!gentilicio || typeof gentilicio !== 'string' || gentilicio.trim().length === 0){
        return res.status(400).json({
            success: false,
            error: 'El campo "gentilicio" del pais es obligatorio.'
        });
    }

    if(!idioma || typeof idioma !== 'string' || idioma.trim().length === 0){
        return res.status(400).json({
            success: false,
            error: 'El campo "idioma" del pais es obligatorio.'
        });
    }

    // Si todas las validaciones con correctas
    next();
};

