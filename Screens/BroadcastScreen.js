import React from 'react';
import { TextInput, Button, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';



const BroadcastStack = createNativeStackNavigator();

function LogoTitle() {
    return (
        <Image style={{ width: 50, height: 50 }}
            source={require('../assets/headertitle.jpg')} />
    );
}


export function BroadcastScreen({ navigation, route }) {
    const { post } = route.params;
    let [selectedImage, setSelectedImage] = React.useState(null);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage({ localUri: pickerResult.uri });
    };

    let openShareDialogAsync = async () => {
        if (!(await Sharing.isAvailableAsync())) {
            alert(`Uh oh, sharing isn't available on your platform`);
            return;
        }

        await Sharing.shareAsync(selectedImage.localUri);
    };

    if (selectedImage !== null) {
        return (
            <View style={styles.container}>
                <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
                <Button title="Share Photo" onPress={() => navigation.navigate("Home", { media: selectedImage.localUri, post: post, })} style={styles.button} />
                <Button title="Choose another Photo" onPress={() => setSelectedImage(null)} style={styles.button} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://i.imgur.com/TkIrScD.png' }} style={styles.logo} />
            <Text style={styles.instructions}>
                To share a photo from your phone with a friend, just press the button below!
            </Text>

            <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
                <Text style={styles.buttonText}>Pick a photo</Text>
            </TouchableOpacity>
            <Button title="Green" onPress={() => navigation.navigate("GreenScreen", { username: "godtamara", playerNo: 8, })} style={styles.button} />
            <Button title='Going back' onPress={() => navigation.goBack()} />
            <Button title="New route Home" onPress={() => navigation.push('Home')} />
            <Button title="Go back to first screen in Tab" onPress={() => navigation.popToTop()} />
        </View>
    );
}

export function CreatePostScreen({ navigation, route }) {
    const [postText, setPostText] = React.useState("");

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (<Button onPress={() => navigation.navigate("Upload")} title="Upload" color='white' />)
        })
    });

    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setPostText('');
            }
        }, [])
    );


    return (
        <SafeAreaView style={styles.container} >
            <TextInput placeholder="What's on your mind?" style={styles.post} value={postText} onChangeText={setPostText}
                keyboardAppearance='dark' placeholderTextColor="white" returnKeyType='go'
            />
            <Button title="Post Text" onPress={() => navigation.navigate({ name: "Home", params: { post: postText }, merge: true, })} />
            <Button title="Post with Video" onPress={() => navigation.navigate({ name: "Upload", params: { post: postText }, merge: true, })} />
            <Button title='Titular update' onPress={() => navigation.setOptions({ headerTitle: "New Post" })} />

        </SafeAreaView>


    );

}

const UploadStackScreen=()=> {

    return (
        <BroadcastStack.Navigator>
            <BroadcastStack.Screen name="Create Post" component={CreatePostScreen} options={{ headerShown: false }} />
            <BroadcastStack.Screen name="Upload" component={BroadcastScreen}
                options={{
                    headerTitle: (props) => <LogoTitle {...props} />,
                    marginTop: 100,
                }}

            />
        </BroadcastStack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#111',
      // alignItems: 'center',
    },
    homeContainer: {
      //flex: 1,
      backgroundColor: '#111',
      alignItems: 'center',
      //justifyContent: 'center',
      //paddingBottom: 10,
    },
    logo: {
      width: 305,
      height: 159,
      marginBottom: 20,
    },
    instructions: {
      color: '#888',
   //   fontSize: 18,
      //marginHorizontal: 15,
  
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
    post: {
      width: "100%",
      height: 200,
      padding: 10,
      backgroundColor: 'black',
      color: 'white',
      padding: 20,
      borderBottomColor: "blue"
    },
    contentContainer: {
      marginTop: 50,
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    video: {
      alignSelf: 'center',
      width: 320,
      height: 200,
    }
  });
export default UploadStackScreen;