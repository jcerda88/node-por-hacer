const descripcion = {
    demand: true, //Parametro base, obligatorio
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
};

const completado = {
    demand: true,
    alias: 'c',
    default: true,
    type: 'boolean'
};
/* Configuración del objeto argv */
const argv = require('yargs')
    .command('crear', 'Crea un elemento por hacer', { descripcion })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion: descripcion, //esto no es necesario por ES6
        completado
    })
    .command('eliminar', 'Elimina un elemento por hacer', { descripcion })
    .help()
    .argv;

module.exports = {
    argv
}