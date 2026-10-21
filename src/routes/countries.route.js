import { Router } from 'express';
import { countries } from '../data/countries.db.js';
import { validateCountry } from '../middlewares/validator.js';
import { createCountryLimiter } from '../middlewares/rateLimiter.js';

// Enrutador modular de Paises
// Gestiona 5 endpints CRUD operandi sobre el arreglo en memoria
// Se monda en src/app.js bajo el prefijo de /api/countries protegido

const router = Router();

// 1. [GET] api/countries - List
router.get('/', (req, res)=>{
    res.status(200).json({
        success: true,
        total: countries.length,
        rateLimitInfo: req.rateLimit
        ? {
            windowLimit: req.rateLimit.limit,
            used: req.rateLimit.current,
            remainingTokens: req.rateLimit.remaining
        } : undefined,
        data: countries
    });
});

// 2. [GET] /api/countries/:id - Find One
router.get('/:id', (req, res)=>{
    const id = parseInt(req.params.id, 10);

    if(isNaN(id)){
        return res.status(400).json({
            success: false,
            error: 'El parámetro ID debe ser un número entero válido.'
        });
    }

    const findedCountry = countries.find((j)=> j.id === id);

    if(!findedCountry){
        return res.status(404).json({
            success: false,
            error: `No se encontró ningún juego con el ID ${id}`
        });
    }
});

router.post('/', createCountryLimiter, validateCountry, (req, res)=>{
    const { nombre, capital, moneda, gentilicio, idioma } = req.body;

    const newId = countries.length > 0 ? Math.max(...countries.map((c)=> c.id)) + 1 : 1;

    const newCountry = {
        id: newId.trim(),
        nombre: nombre.trim(),
        capital: capital.trim(),
        moneda: moneda.trim(),
        gentilicio: gentilicio.trim(),
        idioma: idioma.trim()
    }

    countries.push(newCountry);

    res.status(201).json({
        success: true,
        message: 'Pais agregado correctamente en el catálogo de memoria.',
        country: newCountry
    });
})

// 4. [PUT] /api/countries/:id - Update
router.put('/:id', validateCountry, (req, res)=>{
    const id = parseInt(req.params.id, 10);

    if(isNaN(id)){
        return res.status(400).json({
            success: false,
            error: 'El parámetro ID debe ser un número entero válido.'
        });
    }

    const index = countries.findIndex((c)=> c.id === id);

    if(index === -1){
        return res.status(404).json({
            success: false,
            error: `No se puede actualizar: No existe Pais con ID ${id}`
        });
    }

    const { nombre, capital, moneda, gentilicio, idioma } = req.body;

    countries[index] = {
        id: newId.trim(),
        nombre: nombre.trim(),
        capital: capital.trim(),
        moneda: moneda.trim(),
        gentilicio: gentilicio.trim(),
        idioma: idioma.trim()
    }

    res.status(200).json({
        success: true,
        message: `Pais con ID ${id} actualizado correctamente`
    });
});

// 5. [DELETE] /api/countries/:id - Eliminar
router.delete('/:id', (req, res)=>{
    const id = parseInt(req.params.id, 10);

    if(isNaN(id)){
        return res.status(400).json({
            success: false,
            error: 'El parámetro ID debe ser un número entero válido.'
        });
    }

    const index = countries.findIndex((c)=> c.id === id);

    if(index === -1){
        return res.status(404).json({
            success: false,
            error: `No se puede eliminar: No existe Pais con ID ${id}`
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