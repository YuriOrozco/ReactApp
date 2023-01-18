import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput, Text, Modal, StyleSheet, View } from 'react-native'
import { getAllRegistries, createRegistry, deleteRegistry, updateRegistry } from './../../controllers/middleware'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import Restaurant from '../../models/Restaurant'
import { DataTable } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign'
import IconM from 'react-native-vector-icons/FontAwesome'


export default function Favoritos({ navigation }) {
    //Declaramos las variables de estado
    const [restaurants, setRestaurant] = useState(getAllRegistries({ model: 'Restaurant' }).result)
    const [modalVisibility, setModalVisibility] = useState(false)
    const [nombre, setNombre] = useState();
    const [descripcion, setDescripcion] = useState()
    const [ubicacion, setUbicacion] = useState()
    //metodo para ocultar el modal
    const exit = () => {
        setModalVisibility(false)
    }
    const dataRowRestaurant = (restaurants) => {
        const restaurantsRow = restaurants.map((restaurant) => {
            return (
                //Listamos los nombres de los restaurantes dentro de la bd
                //a cada uno le asignamos botones con las acciones editar y eliminar
                <DataTable.Row key={restaurant.id}>
                    <DataTable.Cell>
                        <Text>{restaurant.nombre}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                        <Pressable onPress={() => onDelete(restaurant)}>
                            <Text>Eliminar</Text>
                        </Pressable>

                    </DataTable.Cell>
                    <DataTable.Cell>
                        <Pressable onPress={() => onUpdate(restaurant)}>
                            <Text>Editar</Text>
                        </Pressable>
                    </DataTable.Cell>
                    <Icon name="edit" style={styles.icon} />
                </DataTable.Row>)
        })
        return restaurantsRow
    }
    //editar un restaurant
    //como parametro recibe un resstaurant
    const onUpdate = (restaurant) => {
        //mostramos el modal y mostramos los datos del registro a modificar
        setModalVisibility(true)
        setNombre(restaurant.nombre)
        setDescripcion(restaurant.descripcion)
        setUbicacion(restaurant.ubicacion)
        //extraemos el id del registro
        id = restaurant.id
        //extraemos cada uno de esus atributos
        restaurant.nombre = nombre
        restaurant.descripcion = descripcion
        restaurant.ubicacion = ubicacion
    }
    //Guardamos el registro editado
    //como parametro recibe el id del registro a editar
    const handleSaveEdit = (x) => {
        //Creamos un objeto de tipo restaurante
        const res = new Restaurant()
        //le definimos sus atributos
        res.id = x
        res.nombre = nombre
        res.descripcion = descripcion
        res.ubicacion = ubicacion
        //mandamos el registro al metodo para editar
        updateRegistry({ registry: res, model: 'Restaurant'})
        //ocultamos el modal y limpiamos los inputs
        setModalVisibility(false)
        setNombre("")
        setDescripcion("")
        setUbicacion("")
    }
    //Eliminar un registro
    //recibe un restaurante como parametro
    const onDelete = (restaurant) => {
        //mandamos al metodo para eliminar todo el objeto
        deleteRegistry({ registry: restaurant, model: 'Restaurant' })
       //actualizamos la tabla
        setRestaurant(getAllRegistries({ model: 'Restaurant' }).result)
    }

    return (<>
        <SafeAreaView>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Nombre</DataTable.Title>
                </DataTable.Header>
                {dataRowRestaurant(restaurants)}
            </DataTable>
            <Modal visible={modalVisibility}>
                <Text>Detalle del restaurant</Text>
                <Text style={styles.title2}>Nombre</Text>
                <TextInput value={nombre} onChangeText={setNombre}/>
                <Text style={styles.title2}>Descripcion</Text>
                <TextInput value={descripcion} onChangeText={setDescripcion}/>
                <Text style={styles.title2}>Ubicacion</Text>
                <IconM name="map-marker"/>
                <TextInput value={ubicacion} onChangeText={setUbicacion}/>
                <Pressable style={styles.btn} onPress={() => handleSaveEdit(id)}>
                    <Text>Guardar edicion</Text>
                </Pressable>
                <Pressable style={styles.btn} onPress={() => exit()}>
                    <Text>Salir</Text>
                </Pressable>
            </Modal>
        </SafeAreaView>
        </> )
}
const styles = StyleSheet.create({

    title: {
        fontWeight: "bold",
        fontSize: 30,
        margin: 5,
        color: "#000000"
    },
    title2: {
        fontWeight: "bold",
        fontSize: 18,
        margin: 5,
        color: "#000000"
    },
    txt: {
        fontSize: 16,
        marginLeft: 10,
    },
    btn: {
        backgroundColor: "#aaaaaa",
        borderWidth: 1,
        width: "15%",
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
        height: 45,
        marginLeft: 10,
    },
    icon: {
        marginLeft: 'auto',
        color: "#000000",
        marginRight: 20
    },

})