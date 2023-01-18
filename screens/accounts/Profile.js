import React from "react";
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'

export default function Profile(){
    return(
        <View style={styles.container}>
            <Icon name = "user" size={70} style={styles.Icon}/>
            <Text style={styles.txt}>Hola de nuevo! @usuario</Text>
            <Text style={styles.text}>Editar contraseña</Text>
            
            <Text style={styles.text}>Cambiar nombre</Text>
        </View>

    )
}
const styles = StyleSheet.create({
    text:{
        width: "40%",
        backgroundColor: "#92c5fc",
      
      textAlign: "center",
      marginTop: 30,
      justifyContent: "center",
      alignItems: "center",
      height: 45,
      fontSize:18

    },
    container:{
        width: "100%",
        height: "100%",
        alignItems: "center"
    },
    Icon:{
        paddingTop: 30
    },
    txt:{
        fontSize: 20,
        paddingBottom: 2
    }
   
})