import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function Signup() {
  return (
    <View style={styles.container} >
      <View style={styles.header} >
        <View style={styles.headerTitle}>
            <Text style={styles.headerText1}>Create </Text>
            <Text style={styles.headerText2}>Account</Text>
        </View>
        <Text style={styles.description}>Fill your information below or register with your mail</Text>
      </View>
        <View style={styles.inputContainer} >
            <TextInput placeholder='Name Surname' style={styles.inputStyle} />
            <TextInput placeholder='Email' style={styles.inputStyle} />
            <TextInput placeholder='Phone Number' style={styles.inputStyle} />
            <TextInput placeholder='Country' style={styles.inputStyle} />
            <TextInput placeholder='Password' style={styles.inputStyle} />
            <TextInput placeholder='Password Confirm' style={styles.inputStyle} />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>
                    Signup
                </Text>
            </TouchableOpacity>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container:{ 
        flex:1,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        gap:10
    },
    header:{
        display:"flex",
        gap:10
    },
    headerTitle:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center"
    },
    headerText1:{
        fontSize:32
    },
    headerText2:{
        color:"blue",
        fontSize:32
    },
    description:{
        textAlign:"left"
    },
    inputStyle:{
        width:"100%",
        borderWidth:1,
        borderRadius:10,
        borderColor:"blue",
        padding:12
    },
    inputErrorStyle:{
        width:"100%",
        borderWidth:1,
        borderRadius:10,
        borderColor:"red",
        padding:12
    },
    inputContainer:{
        display:"flex",
        width:"100%",
        gap:10
    },
    button:{
        backgroundColor:"blue",
        paddingVertical:10,
        borderRadius:10
    },
    buttonText:{
        textAlign:"center",
        color:"white"
    }    

})