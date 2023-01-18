import React from 'react';
import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'


import {
  StyleSheet,
  Text, 
  TextInput, 
  View, 
  TouchableOpacity, 
  ToastAndroid
} from 'react-native'

export default function Login(){
    const screen = useNavigation(); 
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");
    const [repass, setRePass] = useState("");
  
    const handleSubmit = () => {
      let bandera = false;
    //Si no existe ningun error, imprimimos en consola el id del usuario y el username del mismo
    if(pass != repass || pass.length != repass.length){
      ToastAndroid.show("Las contraseñas no coinciden", ToastAndroid.SHORT)
      bandera = false;
            }else{
              bandera=true
            }
      if(bandera)
  {
    auth()
    .createUserWithEmailAndPassword(mail,pass)
    .then(() => {
         ToastAndroid.show("Usuario creado!", ToastAndroid.SHORT)
         screen.navigate("Login");
    })
    .catch((e)=>{
      ToastAndroid.show("No se pudo crear al usuario!", ToastAndroid.SHORT)
      console.log("Error "+e)
    })
  }      }
        


  return (
    <View style={styles.container}>
    <KeyboardAwareScrollView>
      <Text style={styles.label}>Email: </Text>
      <TextInput style={styles.input} value={mail} onChangeText={text => setMail(text)}></TextInput>
      <Text style={styles.label}>Password: </Text>
      <TextInput style={styles.input} secureTextEntry={true} value={pass} onChangeText={text => setPass(text)}></TextInput>
      <Text style={styles.label}>Confirm password: </Text>
      <TextInput style={styles.input} secureTextEntry={true} value={repass} onChangeText={text => setRePass(text)}></TextInput>
      <TouchableOpacity
        style={styles.button}
        onPress={()=>handleSubmit()}>
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
      marginTop: 30,
      justifyContent: "center",
      alignItems: "center",
      height: 45
    }
    });
    
    
