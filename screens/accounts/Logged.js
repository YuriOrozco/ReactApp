import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'


export default function Logged(){
  const screen  = useNavigation();
 
    return(
        <View>
            <Text>User logged</Text>
            <Text>Welcome</Text>
            <TouchableOpacity style={styles.button}
            onPress ={() => screen.navigate("Login")}>
        <Text>Log out</Text>
      </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: "#92c5fc",
      borderWidth: 1,
      width: "100%",
      marginTop: 50,
      justifyContent: "center",
      alignItems: "center",
      height: 45
    }
    });