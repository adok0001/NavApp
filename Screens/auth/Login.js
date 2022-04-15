import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from './firebase';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export var currentUser;

export default function Login({navigation, route}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            currentUser = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage);
            switch(errorCode){
                case "auth/invalid-email":
                case "auth/wrong-password":
                case "auth/internal-error":
                    alert("Invalid email/password")
                    break;
                case "auth/user-not-found":
                    alert("Email not registered to any user!");
                    break;
                case "auth/user-disabled":
                    alert("This account has been disabled");
                    break;
            }
          });
    }

    const passwordReset = () =>{
    sendPasswordResetEmail(auth, email).then(() => {
        alert("Password reset success. Please check your email!");
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode+" "+errorMessage);
    })
}

    return (
        <View style={styles.container}>
            <Text>Please Log In!</Text>
            <TextInput style={styles.textInput} placeholder="Email" onChangeText={(email) => setEmail(email)} />
            <TextInput style={styles.textInput} placeholder="Password" onChangeText={(password) => setPassword(password)} secureTextEntry />
            <Button onPress={() => onSignIn()} title="Login" style={styles.button} />
            <Button onPress={() => passwordReset()} title="Forgot Password" style={styles.button} />
            <Button onPress={() => navigation.navigate("SignUp")} title="Don't have an account? Sign Up" style={styles.button} />            
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        // alignItems: 'center',
    },
    button: {
        backgroundColor: 'blue',
        padding: 20,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
    contentContainer: {
        marginTop: 50,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    textInput: {
        marginBottom: 10,
        borderColor: 'gray',
        backgroundColor: 'whitesmoke',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8
    },
});