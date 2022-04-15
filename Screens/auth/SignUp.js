import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, setDoc, doc, getFirestore } from "firebase/firestore";
import { db } from './firebase';
import { auth } from './firebase';

export var user = null;

export default function SignUp(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isValid, setIsValid] = useState(true);
    
    const onSignUp = () => {
        if (name.length == 0 || username.length == 0 || email.length == 0 || password.length == 0) {
            setIsValid({ bool: true, boolSnack: true, message: "Please fill out everything" })
            return;
        }
        if (password.length < 6) {
            setIsValid({ bool: true, boolSnack: true, message: "passwords must be at least 6 characters" })
            return;
        }


        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                user = userCredentials.user;
                console.log("Registering "+user.uid)
                try {
                    setDoc(doc(db, "users", user.uid), {
                        nameDB: name,
                        emailDB: email,
                        usernameDB: username,
                        image: 'default',
                        userType: "unset"
                    });

                } catch {
                    setIsValid({ bool: true, boolSnack: true, message: "Something went wrong" })
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                switch(error.code){
                    case "auth/email-already-in-use":
                        alert("Email already registered to another user!");
                        break;
                    case "auth/invalid-email":
                        alert("Please enter a valid email!");
                        break;
                    case "auth/weak-password":
                        setIsValid({ bool: true, boolSnack: true, message: "Weak password! Use a combination of letters and numbers" });
                        break;
                    }
                console.log(errorCode + errorMessage);
            });



    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TextInput
                    placeholder="Username"
                    value={username}
                    style={styles.textInput}
                    keyboardType="twitter"
                    onChangeText={(username) => setUsername(username.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '').replace(/[^a-z0-9]/gi, ''))}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="name"
                    onChangeText={(name) => setName(name)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="email"
                    onChangeText={(email) => setEmail(email)}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />

                <Button
                    style={styles.button}
                    onPress={() => onSignUp()}
                    title="Sign Up"
                />
            </View>
            <Button
                onPress={() => props.navigation.navigate("Login")}
                title="Already have an account? Sign In."
            />
            <Snackbar
                visible={isValid.boolSnack}
                duration={2000}
                onDismiss={() => { setIsValid({ boolSnack: false }) }}
            >
                {isValid.message}
            </Snackbar>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        justifyContent: "center",
        alignItems: "center"
    },
    logo: {
        width: 305,
        height: 159,
        marginBottom: 20,
    },
    textInput: {
        marginBottom: 10,
        borderColor: 'gray',
        backgroundColor: 'whitesmoke',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8
    },
    button: {
        backgroundColor: 'blue',
        padding: 20,
        borderRadius: 5,
    }

});