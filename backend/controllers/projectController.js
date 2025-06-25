// Funciones que manejan lo que debe suceder cuando llega una peticion
// Por ejemplo: Crear, leer, actualizar, eliminar datos

// Web token que permite aislar una pagina.
const jwt = require('jsonwebtoken');

// Import de DB
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Creacion de proyecto;

// Exports de logica de cracion de proyecto
exports.createProject = async(req, res) => {

    const { name,  } = req.body;

    try{
        const existing = await prisma.user.findUnique({ where: { name } });

        // Verificacion del proyecto existente
        if (existing) return res.status(400).json({ error: "Ya existe este proyecto "});

        // Creacion de proyecto
        const project =  await prisma.project.create{
            data: { name },
        }

    }catch(err){
        console.log(err);
        alert('Ha ocurrido un error creando un nuevo proyecto.');
    }

}