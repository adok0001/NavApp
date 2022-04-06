import React, { useState, useEffect } from 'react';
import { TextInput, Button, Image, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';


const BroadcastStack = createNativeStackNavigator();

function LogoTitle() {
    return (
        <Image style={{ width: 50, height: 50 }}
            source={require('../assets/headertitle.jpg')} />
    );
}


export function BroadcastScreen({ navigation, route }) {
    const tabBarheight = useBottomTabBarHeight();
    const { post } = route.params;
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasAudioPermission, setHasAudioPermission] = useState(null);
    const [record, setRecord] = useState(null);
    const [camera, setCamera] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const video = React.useRef(null);

    useEffect(() => {
        (async () => {
            const { cameraStatus } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus === 'granted');

            const { audioStatus } = await Camera.requestMicrophonePermissionsAsync();
            setHasAudioPermission(audioStatus === 'granted');

        })();
    }, []);

    const takeVideo = async () => {
        if (camera) {
            const data = await camera.recordAsync({
                maxDuration: 10
            })
            setRecord(data.uri);
            console.log(data.uri);
        }
    }

    const stopVideo = async () => {
        camera.stopRecording();
    }

    if (hasCameraPermission === null || hasAudioPermission === null) {
        return <View />;
    }

    if (hasCameraPermission === true) {
        return <Text>Camera and microphone access required</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
                  <ScrollView
        indicatorStyle="white"
        contentContainerStyle={[
          { paddingBottom: tabBarheight, alignItems: 'center' },
        ]}
      >
            <View style={styles.cameraContainer}>
                <Camera ref={ref => setCamera(ref)} style={styles.camera} type={type}>
                    <View style={styles.button}>
                        <Button title="Flip" style={styles.instructions}
                        onPress={() => {
                                setType(type === Camera.Constants.Type.back ?
                                    Camera.Constants.Type.front : Camera.Constants.Type.back);
                            }}  />
                    </View>
                    <Button title="Take video" onPress={() => takeVideo()} />
                    <Button title="Stop Video" onPress={() => stopVideo()} />
                </Camera>
            </View>
            <Video ref={video} style={styles.video} 
                source={{ uri: record, }}
                useNativeControls
                resizeMode="contain"
                isLooping
            />
</ScrollView>
        </SafeAreaView>
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
            {/* <Button title='Titular update' onPress={() => navigation.setOptions({ headerTitle: "New Post" })} /> */}

        </SafeAreaView>


    );

}

const UploadStackScreen = () => {

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
        alignItems: 'center',
    },
    cameraContainer: {
        flex: 1,
        flexDirection: "row"
    },
    logo: {
        width: 305,
        height: 159,
        marginBottom: 20,
    },
    camera: {
        flex: 1,
        aspectRatio: 1,
    },
    instructions: {
        color: '#888',
        //   fontSize: 18,
        //marginHorizontal: 15,

    },

    button: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
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
        flex:1
    }
});
export default UploadStackScreen;