// Funciones que manejan lo que debe suceder cuando llega una peticion
// Por ejemplo: Crear, leer, actualizar, eliminar datos

// Import que permite encriptar la contraseña al crear una cuenta
const bcrypt = require('bcrypt');

// Web token que permite aislar una pagina.
const jwt = require('jsonwebtoken');

// Import de DB
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Registro

// Exports de logica de registro
exports.register = async(req, res) => {
    
    const { email, password } = req.body;

    try {
        const existing = await prisma.user.findUnique({ where: { email }});
        
        // Verificación de usuario existente
        if (existing) return res.status(400).json({ error: 'User alredy exists.' });

        // Aplica hash a la contraseña
        const hashed =  await bcrypt.hash(password, 10);

        // Creación de usuario
        const user = await prisma.user.create(
            {
                data: { email, password: hashed },
            }
        );

        res.status(201).json({ message: 'User registered' });
        


    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }



}

    // Exports de logica de LOGIN

    exports.login = async(req, res) =>
    {
        const { email, password } = req.body;

        try{
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) return res.status(400).json({ error: 'Invalid credentials' });

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

            const token =  jwt.sign({ userId: user.id }, JWT_SECRET, {expiresIn: '1d'});

            res.json({token});

        }catch(err){
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }

    }
