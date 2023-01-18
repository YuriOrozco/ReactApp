import React from 'react';
import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


import {
  StyleSheet,
  Text, 
  TextInput, 
  View, 
  Image, 
  TouchableOpacity, 
  ToastAndroid
} from 'react-native'

export default function Login(){
    const screen = useNavigation(); 
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
  
    const handleSubmit = () => {
      let bandera = false;
    //Si no existe ningun error, imprimimos en consola el id del usuario y el username del mismo
    if(isValidateMail() && isValidatePass()){
          bandera = true;
            }else if(!isValidateMail()&& isValidatePass){
              ToastAndroid.show("Campos obligatorios", ToastAndroid.SHORT)
             bandera=false
            }
      if(bandera)
  {
    auth()
    .signInWithEmailAndPassword(mail, pass)
    .then(() => {
         ToastAndroid.show("Bienvenido", ToastAndroid.SHORT)
         screen.navigate("Logged");
         
    })
    .catch((e)=>{
      ToastAndroid.show("Email o password incorrectos", ToastAndroid.SHORT)
      console.log("Error "+e)
    })
  }      }
        
    
      //funcion que retorna el valor del arreglo cuando es vacio
      const isEmpty = (array) =>{
        return array.length===0;
    }
  
   //Funcion para validar el usuario
   function isValidateMail() {
    //Se crea un arreglo en el cual se pondran el tipo de errores
    let errors = []
    //Si en el input no hay nada
    if (mail === undefined || mail === "") {
        //se le agrega el dato al arreglo
        errors.push("Email field is required")
    }
    //Mandamos el arreglo
    return isEmpty(errors);
  }
  //Funcion que valida el password
  function isValidatePass() {
    //Creamos un arreglo en el cual se pondran el tipo de errores
    let errors = []
    //Si el input esta vacio
    if (pass === undefined || pass === "") {
        //Se le agrega el dato al arreglo
        errors.push("Password field is required")
    }
    //regresa el arreglo a la funcion isEmp
    return isEmpty(errors);
  }
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={require('./../../../assets/images/logo.jpeg')} />
      </View>
      <KeyboardAwareScrollView>
      <Text style={styles.label}>Email: </Text>
      <TextInput style={styles.input} value={mail} onChangeText={text => setMail(text)}></TextInput>
      <Text style={styles.label}>Password: </Text>
      <TextInput style={styles.input} secureTextEntry={true} value={pass} onChangeText={text => setPass(text)}></TextInput>
      <TouchableOpacity
        style={styles.button}
        onPress={()=>handleSubmit()}>
        <Text style={styles.label}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={()=>screen.navigate("Register")}>
        <Text style={styles.label}>Register</Text>
      </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#34496e",
      paddingVertical: 20,
      paddingHorizontal: 30
    },
    label: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold",
      marginVertical: 10
    },
    input: {
      borderWidth: 1,
      borderColor: "#FFF",
      height: 45,
      width: "100%",
      paddingHorizontal: 10,
      color: "#FFF"
    },
    logo: {
      width: 240,
      height: 240,
      position: 'relative',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    button: {
      backgroundColor: "#92c5fc",
      borderWidth: 1,
      width: "100%",
     marginTop: 20,
      justifyContent: "center",
      alignItems: "center",
      height: 45
    }
    });
    
    
