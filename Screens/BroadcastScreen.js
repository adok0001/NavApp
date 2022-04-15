import React, { useState, useEffect } from 'react';
import { TextInput, Button, Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import * as Sharing from 'expo-sharing';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db, userId } from './auth/firebase';
import * as matchModel from "../Models/Match.json";
import Upload from './Upload';
import * as Network from "expo-network";

const BroadcastStack = createNativeStackNavigator();
const NETWORK_DEFAULT_PROPS = {
    isConnected: false,
    isInternetReachable: false,
    type: ''
};

function LogoTitle() {
    return (
        <Image style={{ width: 50, height: 50 }}
            source={require('../assets/headertitle.jpg')} />
    );
}

export function BroadcastScreen({ navigation, route }) {
    const tabBarheight = useBottomTabBarHeight();
    const match = route.params.matchObject;
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasAudioPermission, setHasAudioPermission] = useState(null);
    const [record, setRecord] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [camera, setCamera] = useState(null);
    const [videoPosted, setVideoPosted] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const video = React.useRef(null);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.granted);

            const audioStatus = await Camera.requestMicrophonePermissionsAsync();
            setHasAudioPermission(audioStatus.granted);

            
        })();
    }, []);

    const takeVideo = async () => {
        if (camera) {
            setIsRecording(true);
            const data = await camera.recordAsync()
            setRecord(data.uri);
            match.link = data.uri;
        }
    }

    const stopVideo = async () => {
        camera.stopRecording();
        setIsRecording(false);
        setVideoPosted(true);
    }

    function postVideo() {
        navigation.navigate("Save", {matchObject: match});
    }

    if (!hasAudioPermission || !hasCameraPermission ) {
        return <Text>Camera and microphone access required</Text>;
    }

    const setNetworkState = async () => {
        const network = await Network.getNetworkStateAsync();
        console.log(network);
        return network.isConnected;
    }

    if(!setNetworkState()){
        alert("Please verify you are connected and have internet access");
        navigation.navigate("Create Post");
    }

    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.cameraContainer}>
                <Camera ref={ref => setCamera(ref)} style={styles.camera} type={type} ratio="1:1">
                    <View style={styles.button}>
                        <Button title="Flip"
                            onPress={() => {
                                setType(type === Camera.Constants.Type.back ?
                                    Camera.Constants.Type.front : Camera.Constants.Type.back);
                            }} />
                    </View>
                    <Button title={isRecording ?  "Stop Video" : "Take video" }  onPress={() => isRecording ? stopVideo() : takeVideo()} />
                </Camera>
                <Text style={styles.instructions}>{match.homeTeam + " vs " + match.awayTeam} </Text>
                <Text style={styles.instructions}>Comp: {match.matchType} Time: {match.matchTime}</Text>
            
            </View>
            {videoPosted && 
            <View style={{flex: 0.5}}>
                <Button title="Post Video" onPress={() => postVideo()} />
            </View>
            }
        </SafeAreaView>

    );
}

export function CreatePostScreen({ navigation, route }) {
    const [homeTeam, setHomeTeam] = React.useState("");
    const [awayTeam, setAwayTeam] = React.useState("");
    const [matchType, setMatchType] = React.useState("");
    const [matchTime, setMatchTime] = useState(new Date(Date.now()));
    const matchEnum = { comp: 'Competitive', casual: 'Friendly' }
    var link = "";
    var currentUserId = userId;
    var match = matchModel;

    //var match = [homeTeam, awayTeam, matchType, matchTime, link, currentUserId];
    

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (<Button onPress={() => navigation.navigate("Upload")} title="Upload" color='white' />)
        })
    });

    useFocusEffect(
        React.useCallback(() => {
            return () => {

            }
        }, [])
    );

    const onChange = (event, value) => {
        setMatchTime(value);
        if (Platform.OS === 'android') {
            setIsPickerShow(false);
        }
    };

    function updateForStream() {
        match.awayTeam = awayTeam;
        match.homeTeam = homeTeam;
        match.link = link;
        match.matchTime = matchTime.toLocaleString();
        match.matchType = matchType;
        match.userId = currentUserId;
        navigation.navigate("Upload", { matchObject: match });
    }

    return (
        <SafeAreaView style={styles.container} >
            <View style={{flex:1}}></View>
            <View style={{flex:5}}>

            <TextInput placeholder="Home Team Name" style={styles.textInput} value={homeTeam} onChangeText={setHomeTeam}
            placeholderTextColor="black"
            />
            <TextInput placeholder="Away Team Name" style={styles.textInput} value={awayTeam} onChangeText={setAwayTeam}
            placeholderTextColor="black"
            />
            <DateTimePicker mode="datetime" value={matchTime} onChange={onChange} is24hour={true} style={styles.datePicker}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            />
            <Picker itemStyle={styles.picker} selectedValue={matchType} onValueChange={(itemValue, itemIndex) => setMatchType(itemValue)}>
                <Picker.Item label="Competitive" value={matchEnum.comp} />
                <Picker.Item label="Friendly" value={matchEnum.casual} />
            </Picker>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => updateForStream()}>
                <Text style={styles.button}>Start Broadcast</Text>
            </TouchableOpacity>
            </View>
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
            <BroadcastStack.Screen name="Save" component={Upload} options={{ headerShown: false }} />

        </BroadcastStack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraContainer: {
        flex: 3,
        marginBottom: 14
        //flexDirection: "row"
    },
    camera: {
        flex: 0.8,
        //aspectRatio: 1,
    },
    buttonContainer: {
        // flex: 0.5,
        backgroundColor: 'white',
        flexDirection: 'row',
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        height: 60,
    },
    button:{
        fontSize: 24,
        //backgroundColor: "white",
        alignItems: "flex-start"
    },
    textInput: {
        marginBottom: 10,
        backgroundColor: 'white',
        padding: 10,
        borderWidth: 1,
        borderRadius: 8,
    },
    datePicker: {
        width: 300,
        // height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white'
    },
    picker:{
        width: 300,
        height: 200,
        backgroundColor: "white"
    },
    instructions: {
        color:"white",
        fontSize: 18,
        justifyContent: "center",
        alignSelf: "center"

    }
});

export default UploadStackScreen;