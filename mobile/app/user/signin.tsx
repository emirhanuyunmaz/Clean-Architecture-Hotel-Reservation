import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function Signin() {

    const router = useRouter()

    function SignupOnPress(){
        router.push("/user/signup")
    }
  return (
    <View style={styles.container}>
        <View style={styles.headerContainer} >
            <View style={styles.headerTitle}>
                <Text style={styles.title1} >Welcome</Text>
                <Text style={styles.title2}>Back</Text>
            </View>
            <Text>We missed you login to continue your journey with us.</Text>
        </View>

        <View style={styles.inputContainer}>
            <TextInput placeholder='Email' style={styles.input} />
            <TextInput placeholder='Password' style={styles.input} />
            <TouchableOpacity>
                <Text style={styles.link} >
                    Forget Password
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText} >
                    LOGIN
                </Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={SignupOnPress} style={styles.signupStyle} >
            <Text style={styles.signupTextStyle} >Signup</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:10
    },
    headerContainer:{
        gap:10,
        justifyContent:"center",
        alignItems:"center"
    },
    headerTitle:{
        flexDirection:"row",
        gap:10
    },
    title1:{
        fontSize:32
    },
    title2:{
        fontSize:32,
        color:"blue"
    },
    description:{
    
    },
    inputContainer:{
        width:"100%",
        gap:10,
        marginTop:10
    },
    input:{
        width:"100%",
        borderWidth:1,
        borderColor:"blue",
        borderRadius:10,
        padding:16
    },
    link:{
        color:"gold",
        fontWeight:"bold",
        fontSize:16,
        marginVertical:10,
        marginHorizontal:10,
        textDecorationLine:"underline"
    },
    button:{
        padding:10,
        borderRadius:10,
        backgroundColor:"blue"
    },
    buttonText:{
        textAlign:"center",
        color:"white"
    },
    signupStyle:{
        marginTop:10,
        padding:10
    },
    signupTextStyle:{
        color:"blue"
    }
})