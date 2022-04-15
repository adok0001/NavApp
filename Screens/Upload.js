import React from 'react';
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video } from 'expo-av';
import Firebase from './auth/firebase';
import { firestore } from './auth/firebase';
import { getDownloadURL, getMetadata, getStream, list, ref, uploadBytesResumable } from 'firebase/storage';

export default function Upload({ navigation, route }) {
    const video = React.useRef(null);
    const match = route.params.matchObject;
    const storageRef = ref(firestore);
    // Create a child reference
    const vidRef = ref(firestore, "videos");
    //console.log("\n\n\n\n\n\nSPACE US\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n");
    //console.log(match.link);
    const uploadVid = async () => {
        const uri = match.link;
        let formData = new FormData();
        let fileType = uri.substring(uri.lastIndexOf(".") + 1);
        console.log(fileType);
        formData.append('photo', {
          uri,
          name: `video.${fileType}`,
          type: `${fileType}`,
        });
        let options = {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'multipart/form-data',
              'Content-Type': 'multipart/form-data',

            },
          };
        const response = await fetch(uri, options);
        const blob = await response.blob();
        console.log(formData);
        const task = uploadBytesResumable(vidRef, formData);
        task.on("state_changed", (snapshot) =>{
             // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        }
    }, (error) => {
        // Handle unsuccessful uploads
    console.error(error.code);
    switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          alert("Upload cancelled.");
          break;
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          console.error(error.serverResponse);
          break;
        }      
    }, () => {
        // Handle successful uploads on complete
        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
    });
        
    }

    function homePost() {
      navigation.navigate("HomeStack", {screen:"Home", params: {matchObject: match} });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Video ref={video} style={styles.video}
                source={{ uri: match.link, }}
                useNativeControls
                resizeMode="contain"
                isLooping
                onError={err => console.warn(err)} // Callback when video cannot be loaded
            //onBuffer={console.log('buffering')} // Callback when remote video is buffering
            />
            <Button onPress={()=>homePost()} title="Post" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "orange",
        alignItems: 'center',
    },
    button: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    video: {
        alignSelf: 'center',
        width: 320,
        height: 200,
        flex: 0.9
    },
    textInput: {
        marginBottom: 10,
        borderColor: 'gray',
        backgroundColor: 'whitesmoke',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
    },
    instructions: {
        color: "white",
        fontSize: 16
    }
});