import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { auth } from './auth/firebase';
import { deleteUser } from 'firebase/auth';

export default function Settings({navigation, route}) {
   const user = auth.currentUser;
   console.log(user.uid);
    const onSignOut = async () => {
        try {
          auth.signOut();
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <View style={styles.container}>
          <TextInput placeholder='email' />
          <TextInput placeholder='email' />
          <TextInput placeholder='email' />


          {user && (
            <Text style={styles.buttonText}>
              {user.email} signed in
            </Text> 
          )
          }
          {/* {
          deleteUser(user).then(() => {
            // User deleted.
          }).catch((error) => {
            // An error ocurred
          })
          } */}
          <Button onPress={() => onSignOut()} title="Logout" style={styles.button} />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        alignItems: 'center',
        justifyContent: "center"
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
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
});