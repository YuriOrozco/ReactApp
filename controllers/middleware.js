import { realm } from '../db/dbrest'
import Message from '../models/Message'

//metodo para crear un registro
export const createRegistry = (payload) => {
    //definimos variables para extraer los datos
    const { registry, model } = payload;
    //definimos un nuevo mensaje
    let msg = new Message;
    //si el registro es falso, retorna un mensaje y un estado
    if (!registry) {
        msg.result = false;
        msg.message = "Datos incorrectos"
        return msg;
    }
    //se genera un id para el registro nuevo
    registry.id = generatedId(model);
    //se revisa si el registro ya e
    if (checkIfRegistryExist(registry.id, model)) {
        msg.result = false;
        msg.message = "El registro ya existe";
        return msg;
    }//sino existe, intenta guardar el registro
    try {
        realm.write(() => {
            msg.result = realm.create(model, registry.getRealmObject())
        })
        msg.message = "el registro se guardó correctamente"
    } catch (e) {
        //si se genera un error, lo muestra
        console.log("Error: " + e.message);
        msg.result = false;
        msg.message = "error al guardar en la base de datos"
    } finally {
        return msg;
    }
}
//genera el ID de los registros, recibe un modelo
const generatedId = (model) => {
    const payload = {
        model: model,
    }
    //extrae todos los registros
    let registries = getAllRegistries(payload).result;
    //si su tamaño es 0, quiere decir que es el primer registro y retorna un id de 1
    if (registries.length == 0) return 1;
    //ordena los registros
    let sortRegistries = registries.sorted('id', true);
    let firstRegistry = sortRegistries[0];
    //retorna el id+1
    return firstRegistry['id'] + 1;
}

//metodo para consultar todos los registros
export const getAllRegistries = (payload) => {
    //se define una variable para el modelo
    const { model } = payload;
    //definimos un mensaje nuevo
    let msg = new Message;
    try {
        //se guardan todos los resultados en el resultado del mensaje
        msg.result = realm.objects(model);
        msg.message = "Se recuperaron los registros correspondientes"
    } catch (e) {
        //si se produjo algun error, se imprime 
        console.log("error: " + e.message);
        msg.result = false;
        msg.message = "error al consultar la base de datos";
    } finally {
        return msg;
    }
}
//checa si un registro ya existe
const checkIfRegistryExist = (id: number, model) => {
    //si el metodo nos regresa algo quiere decir que si existe
    let registry = getRegistryById(id, model).result;
    //retorna el registro si es diferente de null
    return registry != null;
}

//metodo para extraer un registro mediante el id
export const getRegistryById = (id: Number, model) => {
    //definimos un nuevo mensaje y un modelo
    let msg = new Message();
    const payload = {
        model: model,
    };
    //obtenemos todos los registros
    let registry = getAllRegistries(payload).result;
    //filtramos los registros para obtener el del id
    let findRegistry = registry.filtered(`id=${id}`);
    //si el resultado ess igual a cero, es decir que el registro no existe
    if (findRegistry.length == 0) {
        msg.result = null;
        msg.message = "El registro no se encontró en la base de datos";
    } else {
        //sino se extrae el registro
        msg.result = findRegistry[0];
        msg.message = "el registro se recuperó correctamente";
    }
    return msg;
}

//metodo para borrar un registro
export const deleteRegistry = (payload) => {
    let msg = new Message();
    const { registry, model } = payload;
    //obtenemos el id del registro
    let id = registry.id;
    //si el id es indefinido o nulo
    if (!id) {
        msg.result = false;
        msg.message = 'Registro Inválido';
        return msg;
    }
    //obtenemos el id mediante el id
    let findRegistry = getRegistryById(id, model).result;
    //si el resultado es indefinido, no se encontro el registro
    if (!findRegistry) {
        msg.result = false;
        msg.message = `Registro con id=${id} no encontrado`;
        return msg;
    }
    try {
        //borra el registro de la base de datos
        realm.write(() => {
            realm.delete(findRegistry);
          });
          msg.result = true;
          msg.message = `Se eliminó el registro con id=${id} correctamente`;
    } catch (e) {
        //si se ha generado algun error, lo imprime
        console.log(e);
        msg.result = false;
        msg.message = `No se pudo eliminar el registro con id=${id}: ${e.message}`;
    } finally {
        return msg;
    }
}
//metodo para actualizar un registro
export const updateRegistry = (payload) => {
    const { registry, model } = payload
    let msg = new Message();
    //si el registro es indefinido quiere decir que el registro es invalido
    if (!registry) {
        msg.result = false;
        msg.message = 'Registro Inválido';
        return msg;
    }
    //obtenemos el registro mediante el id
    let findRegistry = getRegistryById(registry.id, model).result;
    //si el registro es indefinido, quiere decir que no se encontro
    if (!findRegistry) {
        msg.result = false;
        msg.message = `Registro con id=${registry.id} no encontrado`;
        return msg;
    }
    try {
        //editamos el registro
        realm.write(() => {
            registry.updateObjectInfo(findRegistry);
        });
        msg.result = true;
        msg.message = `Se actualizó el registro con id=${registry.id} correctamente`;
    } catch (e) {
        console.log(e)
        msg.result = false;
        msg.message = `No se pudo actualizar el registro con id=${registry.id}: ${e.message}`;
    } finally {
        return msg;
    }
}