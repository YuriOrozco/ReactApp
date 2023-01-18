import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {View, TextInput, StyleSheet,Text } from 'react-native'
import {getAllRegistries, createRegistry} from './../../controllers/middleware'
import Restaurant from '../../models/Restaurant'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'

export default function Anadir() {
     //Declaramos las variables de estado
    const [restaurant, setRestaurant] = useState(getAllRegistries({ model: 'Restaurant' }).result)
    const [nombre, setNombre] = useState();
    const [descripcion, setDescripcion] = useState()
    const [ubicacion, setUbicacion] = useState()
    //Guarda un restaurante
    const handleSaveData = () => {
        //Creamos un restaurante nuevo
        const res = new Restaurant()
        //Le definimos sus atributos mediante las variables de estado
            res.nombre = nombre
            res.descripcion = descripcion
            res.ubicacion = ubicacion
            //llamamos el metodo para crear un nuevo registro
            //mandamos los parametros correspondientes
            createRegistry({registry: res, model: 'Restaurant'})
            //Limpiamos los inputs
            setNombre("")
            setDescripcion("")
            setUbicacion("")
        }

    return (
        //Creamos un pequeño 'formulario' para poder registrar restaurantes
        <View style={styles.container}>
            <Text style={styles.title}>NUEVO RESTAURANTE</Text>
            <Text style={styles.text}>Nombre</Text>
            <TextInput style={styles.input} value={nombre} onChangeText={setNombre}></TextInput>
            <Text style={styles.text}>Descripción</Text>
            <TextInput style={styles.input} value={descripcion} onChangeText={setDescripcion}></TextInput>
            <Text style={styles.text}>Ubicación</Text>
            <TextInput style={styles.input} value={ubicacion} onChangeText={setUbicacion}></TextInput>
            <Pressable style={styles.button} onPress={()=> handleSaveData()}>
                <Text style={styles.label}>Registrar restaurante</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        margin: 2.5,
        color: "#000"

    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
        margin: 10,
        color: "#000000",
        marginLeft: 45
    },
    input: {
        borderWidth: 1,
        borderColor: "#000000",
        height: 45,
        width: "95%",
        paddingHorizontal: 10,
        color: "#000",
        margin: 10
    },
    button: {
        backgroundColor: "#92c5fc",
        borderWidth: 1,
        width: "80%",
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
        height: 45,
        marginLeft: 40
    }
})