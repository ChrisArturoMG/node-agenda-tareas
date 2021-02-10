require('colors');
const {
    inquirerMenu, 
    pausa, 
    leerInput,
    listadoTareasBorrar, 
    confirmar, 
    mostrarListadoCheckList
} = require('./helpers/inquirer');

const { guardarDB, 
    leerDB
} = require('./helpers/guardarArchivo');

const Tarea = require('./models/tarea')
const Tareas = require('./models/tareas')
// const { mostratMenu, pausa } = require('./helpers/msg')

// console.clear();

const main = async()=>{
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    
    if( tareasDB ){
        const data = tareas.cargarTareasFromArr(tareasDB);
    }
    
    do{
        // console.log({opt})
        opt = await inquirerMenu();
        // const tareas = new Tareas();
        // const tarea = new Tarea('Comprar');
        
        // tareas._listado[tarea.id] = tarea;
        // console.log(tareas)

        switch( opt ){
            case '1':
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc)
            break;

            case '2':
                tareas.listadoCompleto();
            break;
            case '3':
                tareas.listarPendientesCompletadas(true);
            break;

            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
            
            case '5':
                const ids= await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletada( ids );
            break;

            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr);
                if(id !== '0'){
                    const ok = await confirmar('¿Esta seguro?');
                    if(ok){
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada correctamente')
                    }
                    
                }
                
            break;
        } 

        guardarDB(tareas.listadoArr);

        if (opt !== '0') await pausa();
    }while(opt !== '0');

}

main();