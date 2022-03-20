//import 'react-native-gesture-handler';
import React from 'react';
import { Button, Dimensions, Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { NavigationContainer, TabActions, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabBar, createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
//import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { getHeaderTitle } from '@react-navigation/elements';
import { backgroundColor, textDecorationColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { TouchableWithoutFeedback } from 'react-native-web';
import { data } from './Data';
import {Video, AVPlaybackStatus} from 'expo-av';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('screen');

const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;

function HomeScreen({ navigation, route }) {
  const tabBarheight = useBottomTabBarHeight();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});


  return (
    <SafeAreaView style={styles.homeContainer}>
      {/* <View style={{ flex: 1 }}> */}

      {/* Scrollable container */}
        <ScrollView
          indicatorStyle="white"
          contentContainerStyle={[
            { paddingBottom: tabBarheight, alignItems: 'center' },
          ]}
        >
          {data.map((item) => (
            <View key={item.id} style={{ marginBottom: 14 }}>
              <Image
                style={styles.image}
                source={{ uri: item.video_url }}
                resizeMode="cover"
              />
              <Text style={styles.instructions}>{item.homeTeam} vs {item.awayTeam}</Text>
              <Text style={styles.instructions}>Comp: {item.matchType} Time: {item.matchTime}</Text>
            </View>
          ))}
          <Video source={{uri: "https://wedistill.io/uploads/videos/processed/2/3M2A4273.mp4.mp4"}}
           ref={video}
        style={styles.video}
        useNativeControls
        />
          <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>

          <Button title="Upload Screen" onPress={() => navigation.navigate("CreatePost")} />
          <Text style={styles.instructions}>Post: {route.params?.post}</Text>
          <Image source={{ uri: route.params?.media }} style={styles.image} />

        </ScrollView>
      {/* </View> */}
    </SafeAreaView>
  )
}

function CreatePostScreen({ navigation, route }) {
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

function BroadcastScreen({ navigation, route }) {
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

function GreenScreen({ route, navigation }) {
  const { username, playerNo } = route.params;
  return (
    <View style={styles.container} >
      <Text style={styles.instructions}>The Green Screen</Text>
      <Text style={styles.instructions}>Username: {JSON.stringify(username)} Player Number: {JSON.stringify(playerNo)}</Text>
      <Button title="Re-Green" onPress={() => navigation.push("GreenScreen", { username: "godtamara", playerNo: Math.floor(Math.random() * 100), })} style={styles.button} />
      <Button title='Going back' onPress={() => navigation.goBack()} />
      <Button title="Go back to first screen in Tab" onPress={() => navigation.popToTop()} />
    </View>

  )
}

function LogoTitle() {
  return (
    <Image style={{ width: 50, height: 50 }}
      source={require('./assets/headertitle.jpg')} />
  );
}

const BroadcastStack = createNativeStackNavigator();

function UploadStackScreen() {

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

header: ({ navigation, route, options }) => {
  const title = getHeaderTitle(options, route.name);
  if (title === 'Home') {

  }
  return <MyHeader title={title} style={options.headerStyle} />;
};

const CustomTabBar = (props) => {
  return (
    <BlurView
      style={{ position: 'absolute', bottom: 0, left: 0, right: 0, }}
      tint="dark"
      intensity={100}
      blurRadius={50}
      overlayColor="transparent"
    >
      <BottomTabBar {...props} />
    </BlurView>
  );

};

export default function App(props) {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home'
                  : 'home-outline';
              } else if (route.name === 'Upload') {
                iconName = 'cloud-upload';
              } else if (route.name === 'CreatePost') {
                iconName = "create";
              } else if (route.name === 'GreenScreen') {
                iconName = focused ? "color-palette" : "color-palette-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            //tabBarActiveTintColor: 'tomato',
            tabBarStyle: {
              position: 'absolute',
              borderTopColor: 'black',
              backgroundColor: 'black',
              elevation: 0,
            },
            tabBarBackground: () => (<BlurView tint="dark" intensity={45} style={StyleSheet.absoluteFill} />),
            tabBarBadgeStyle: { backgroundColor: 'blue' },
          })}
        //tabBar={(props) => <CustomTabBar {...props} />}

        //mode="modal" initialRouteName='Home' screenOptions={{ headerStyle: { backgroundColor: 'black' }, headerTintColor: 'white', headerTitleStyle: { fontWeight: 'bold' }, }} >
        >
          <Tab.Screen name="Home" component={HomeScreen}
            options={{
              headerTitle: "Match Day", headerStyle: {},
              //headerTintColor:"white", 
              headerTitleStyle: { fontWeight: 'bold', fontSize: 25, },
              //, headerTransparent:true
              // headerBackground: ()=>
              // <Image style={{width: 500, height: 100,}} 
              // source={require('./assets/thomas-serer-r-xKieMqL34-unsplash.jpg')} />,


            }} />
          {/* <Tab.Screen name="Upload" component={BroadcastScreen} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} /> */}
          <Tab.Screen name="GreenScreen" component={GreenScreen} initialParams={{ username: "tammyado" }} options={({ route }) => ({ title: route.params.name, tabBarBadge: 3 })} />
          <Tab.Screen name="CreatePost" component={UploadStackScreen} options={{
            headerShown: false,
            tabBarLabel: 'Create Post',
            //headerRight: () => (<Button onPress={() => alert("Upload")} title="Upload" color='white'/>), 
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );

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
  image: {
    borderRadius: 14,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
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
