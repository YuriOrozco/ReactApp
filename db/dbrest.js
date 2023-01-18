//importamos el modelo 
import Restaurant from '../models/Restaurant'

let Realm = require('realm');

export const realm= new Realm(
    {
        //abrimos la base de datos y definimos el esquema
        path:'db.realmr',
        schema:[
            Restaurant.schema,
        ],
        schemaVersion:1
    }
);