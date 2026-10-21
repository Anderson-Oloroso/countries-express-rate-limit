export function validateCountry(req, res, next){
    if(!req.body || typeof req.body !== 'object'){
        return res.status(400).json({
            success: false,
            error: 'Se requiere enviar un cuerpo JSON válido.'
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

    if(!moneda || typeof moneda !== 'string' || moneda.trim().length === 0){
        return res.status(400).json({
            success: false,
            error: 'El campo "moneda" del país es obligatorio.'
        });
    }

    if(!gentilicio || typeof gentilicio !== 'string' || gentilicio.trim().length === 0){
        return res.status(400).json({
            success: false,
            error: 'El campo "gentilicio" del pais es obligatorio.'
        });
    }

    const validLanguages = typeof idioma === 'string'
        ? idioma.trim().length > 0
        : Array.isArray(idioma) && idioma.length > 0
            && idioma.every((language)=> typeof language === 'string' && language.trim().length > 0);

    if(!validLanguages){
        return res.status(400).json({
            success: false,
            error: 'El campo "idioma" debe ser una cadena o una lista de cadenas no vacías.'
        });
    }

    next();
}
