const Tarea = require("./tarea");

class Tareas{

    _listado = {};


    get listadoArr(){
        const listado = [];

        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea( id='' ){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArr( tareas = []){
        //this._listado = tareas; 
        tareas.forEach(tarea =>{
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc='' ){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto (){
        console.log()
        this.listadoArr.forEach((tarea, indice) =>{
            
            const idx = `${ indice+1 }. `.green
            const {desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`)
        });
    }
    listarPendientesCompletadas( completadas = true ){

        let contador = 0;
        console.log()

        if(completadas){
            this.listadoArr.forEach((tarea) =>{
                
            const idx = `${ contador + 1 }. `.green;
            const {desc, completadoEn } = tarea;
            if(completadoEn) {
                console.log(`${idx} ${desc} :: ${ completadoEn.green }`);
            }
            });
        }else{
            this.listadoArr.forEach((tarea) =>{
                
                const idx = `${ contador+1 }. `.green;
                const {desc, completadoEn } = tarea;
                if(!completadoEn) {
                    console.log(`${idx} ${desc} :: ${ 'Pendiente'.red }`);
                }
            });
        }
    }

    toggleCompletada(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id];
            if ( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

}

module.exports = Tareas;