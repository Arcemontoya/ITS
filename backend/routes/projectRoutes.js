
const express = require('express');
const router = require('router');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const athenticate = require('../middleware/authenticate');

// GET /api/projects/

router.get('/', authenticate, async(req, res) => {
    const userId = req.user.id;

    try{
        const projects = await prisma.project.findMany({
            where: { userId },
            include: {
                issues: true, // opcional: incluye los issues del proyecto
            },
        });
        res.json(projects);
    }catch(error){
            console.error('Error al obtener proyectos:', error);
    res.status(500).json({ message: 'Error al obtener proyectos' });
    }
});

module.exports = router;