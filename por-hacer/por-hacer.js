const fs = require('fs');

/* Inicializo un arreglo vacío */
let listadoPorHacer = [];

const guardarDB = () => {
    /* JSON.stringify convierte un objeto en un JSON Válido */
    let data = JSON.stringify(listadoPorHacer);


    fs.writeFile('db/data.json', data, (err) => {
        /* Así lo hice yo y funcionó pero no era óptimo porque el return no se 
           estaba usando */
        // if (!err) {
        //     return 'datos guardados correctamente'.green;
        // }
        if (err) throw new Error('No se puede grabar', err);
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = []; //Si falla, es igual a un arreglo vacío. 
        // Esto es en caso que se 
        // trate de leer un JSON con formato inválido
    }
}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion, // descripcion: descripcion (Esta forma ya no es necesaria gracias a ES6)
        completados: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {

    /* Forma Mía.ini */
    // cargarDB();
    // let listadoPorHacerOld = listadoPorHacer;
    // listadoPorHacer = [];
    // for (let objLista of listadoPorHacerOld) {
    //     if (objLista.descripcion === descripcion) {
    //         objLista.completados = completado;
    //     }
    //     listadoPorHacer.push(objLista);
    // }
    // guardarDB();
    /* Forma Mía.fin */
    cargarDB();

    // let index = listadoPorHacer.findIndex( tarea => {
    //     return tarea.descripcion === descripcion;
    // })
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) { //Si encontró un registro 
        listadoPorHacer[index].completados = completado;
        guardarDB();
        return true; //Solo para saber si la tarea se completó correctamente
    } else {
        return false;
    }
}

// const eliminar = (descripcion) => {
//     cargarDB();

//     let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

//     if (index >= 0) { //Si encontró un registro 
//         listadoPorHacer.splice(index, 1);
//         guardarDB();
//         return true; //Solo para saber si la tarea se completó correctamente
//     } else {
//         return false;
//     }
// }
const eliminar = (descripcion) => {
    cargarDB();
    //Esta forma es mejor porque hace un ciclo excluyendo todas las descripciones 
    // que sean iguales a la del parámetro de la función
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado) { //Si encontró un registro 
        return false; //Solo para saber si la tarea se completó correctamente
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    eliminar
}