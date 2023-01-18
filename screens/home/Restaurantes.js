import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, Modal, StyleSheet, View, Image } from 'react-native'
import { getAllRegistries } from './../../controllers/middleware'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
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
                //Al nombre del restaurante le asignamos un <pressable> para 
                //poder ir a la info del mismo
                <DataTable.Row key={restaurant.id}>
                    <DataTable.Cell><Pressable onPress={() => onDetail(restaurant)}>
                        <Text>{restaurant.nombre}</Text>
                    </Pressable>
                    </DataTable.Cell>
                    <Icon name="caretright" style={styles.icon} />
                </DataTable.Row>)
        })
        return restaurantsRow
    }
    //metodo para mostrar la informacion detallada de un restaurante
    //Como paarametro recibe un restaurant
    const onDetail = (restaurant) => {
        //mostramos el modal
        setModalVisibility(true)
        //Le mandamos los atributos del restaurant seleccionado
        setNombre(restaurant.nombre)
        setDescripcion(restaurant.descripcion)
        setUbicacion(restaurant.ubicacion)
    }
    return (<>
        <Text>
            Lista de restaurantes
        </Text>
        <SafeAreaView>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Nombre</DataTable.Title>
                </DataTable.Header>
                {dataRowRestaurant(restaurants)}
            </DataTable>
            <Modal visible={modalVisibility}>
                <Text>Detalle del restaurant</Text>
                <View style={styles.container}>

                    <Text style={styles.title}>{nombre}</Text>
                    <Image style={styles.image} source={require('./../../../assets/images/restaurante.jpg')} />
                    <Text style={styles.title2}>Descripcion</Text>
                    <Text style={styles.txt}>{descripcion}</Text>
                    <Text style={styles.title2}>Ubicacion</Text>
                    <IconM name="map-marker" />
                    <Text style={styles.txt}>{ubicacion}</Text>
                    <Pressable style={styles.btn} onPress={() => exit()}>
                        <Text>Salir</Text>
                    </Pressable>
                </View>
            </Modal>
        </SafeAreaView>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center"
    },
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
    image: {
        width: 250,
        height: 250,
        justifyContent: "center",
        alignItems: "center",
    }

})