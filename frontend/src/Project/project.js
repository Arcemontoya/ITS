import React, { useState } from 'react';
import axios from 'axios';

export default function createProject({ onCreateProject }){

    const[name, setName] = useState('');

    const project = async (e) => {
        e.preventDefault();
        try{

            const res = await axios.post('http://localhost:5000/api/auth/projects', {
                name
            });

            alert('Se ha creado el proyecto exitosamente');
        }catch(err){
            console.log(err);
            alert('Ha ocurrido un error en frontend');
        }
    }

    return (
        <form
        onSubmit={project}
        className='p-4 rounded sha
        dow bg-light'
        style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>


            <h2 className = 'text-center mb4'><strong><em> Crear un nuevo Proyecto </em> </strong>  </h2>

            <div className='mb-3'>
                <input
                    className='form-control'
                    placeholder='Nombre del nuevo proyecto'
                    value = {name}
                    onChange={(e) => setName(e.target.value)}/>
            </div>
            
        </form>
    );
}