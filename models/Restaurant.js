export default class Restaurant{
     //definimos el modelo
    id: number;
    nombre: string;
    descripcion: string;
    ubicacion: string;
     //establecemos un constructor
    constructor(id=1, nombre='', descripcion='', ubicacion=''){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.ubicacion = ubicacion;
    }
    //definimos metodos, en este caso devuelve un objeto de tipo restaurante
    getRealmObject(){
        return{
            id: this.id,
            nombre: this.nombre,
            descripcion: this.descripcion,
            ubicacion: this.ubicacion
        }
    }
//metodo para actualizar la informacion de un registro
    updateObjectInfo(restaurant:any){
        if(!restaurant)
        return;
        restaurant['nombre']=this.nombre;
        restaurant['descripcion']=this.descripcion;
        restaurant['ubicacion']=this.ubicacion;
    }
    //metodo para copiar un objeto
    clone(){
        return new Restaurant(this.id, this.nombre, this.descripcion, this.ubicacion)
    }
}
//definimos el esquema de la base de datos
    const RestaurantSchema={
        name: 'Restaurant',
        primaryKey:'id',
        properties:{
            id:'int',
            nombre: 'string',
            descripcion: 'string',
            ubicacion: 'string',
        }
    }

    Restaurant.schema = RestaurantSchema