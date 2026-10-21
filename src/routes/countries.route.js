import { Router } from 'express';
import { countries } from '../data/countries.data.js';
import { validateCountry } from '../middlewares/validator.js';
import { createCountryLimiter } from '../middlewares/rateLimiter.js';

const router = Router();

router.get('/', (req, res)=>{
    res.status(200).json({
        success: true,
        total: countries.length,
        rateLimitInfo: req.rateLimit
        ? {
            windowLimit: req.rateLimit.limit,
            used: req.rateLimit.used,
            remainingTokens: req.rateLimit.remaining
        } : undefined,
        data: countries
    });
});

router.get('/:id', (req, res)=>{
    const id = Number(req.params.id);

    if(!Number.isInteger(id)){
        return res.status(400).json({
            success: false,
            error: 'El parámetro ID debe ser un número entero válido.'
        });
    }

    const country = countries.find((item)=> item.id === id);

    if(!country){
        return res.status(404).json({
            success: false,
            error: `No se encontró ningún país con el ID ${id}`
        });
    }

    res.status(200).json({ success: true, country });
});

function normalizeLanguages(idioma){
    return Array.isArray(idioma)
        ? idioma.map((language)=> language.trim())
        : idioma.trim();
}

router.post('/', createCountryLimiter, validateCountry, (req, res)=>{
    const { nombre, capital, moneda, gentilicio, idioma } = req.body;

    const newId = countries.length > 0 ? Math.max(...countries.map((c)=> c.id)) + 1 : 1;

    const newCountry = {
        id: newId,
        nombre: nombre.trim(),
        capital: capital.trim(),
        moneda: moneda.trim(),
        gentilicio: gentilicio.trim(),
        idioma: normalizeLanguages(idioma)
    }

    countries.push(newCountry);

    res.status(201).json({
        success: true,
        message: 'Pais agregado correctamente en el catálogo de memoria.',
        country: newCountry
    });
})

router.put('/:id', validateCountry, (req, res)=>{
    const id = Number(req.params.id);

    if(!Number.isInteger(id)){
        return res.status(400).json({
            success: false,
            error: 'El parámetro ID debe ser un número entero válido.'
        });
    }

    const index = countries.findIndex((country)=> country.id === id);

    if(index === -1){
        return res.status(404).json({
            success: false,
            error: `No se puede actualizar: No existe Pais con ID ${id}`
        });
    }

    const { nombre, capital, moneda, gentilicio, idioma } = req.body;

    countries[index] = {
        id,
        nombre: nombre.trim(),
        capital: capital.trim(),
        moneda: moneda.trim(),
        gentilicio: gentilicio.trim(),
        idioma: normalizeLanguages(idioma)
    }

    res.status(200).json({
        success: true,
        message: `Pais con ID ${id} actualizado correctamente`
    });
});

router.delete('/:id', (req, res)=>{
    const id = Number(req.params.id);

    if(!Number.isInteger(id)){
        return res.status(400).json({
            success: false,
            error: 'El parámetro ID debe ser un número entero válido.'
        });
    }

    const index = countries.findIndex((country)=> country.id === id);

    if(index === -1){
        return res.status(404).json({
            success: false,
            error: `No se puede eliminar: No existe país con ID ${id}`
        });
    }

    const [ deletedCountry ] = countries.splice(index, 1);

    res.status(200).json({
        success: true,
        message: `Pais con ID ${id} eliminado del catálogo.`,
        country: deletedCountry
    });
});

export default router;