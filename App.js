import 'react-native-gesture-handler';
import React from 'react';
import { Button, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation, route }) {
  React.useEffect(() => {
    if (route.params?.post) {

    }
  }, [route.params?.post]);

  return (
    <SafeAreaView style={styles.homeContainer}>
    <ScrollView style={{marginHorizontal:5}}
    // style={styles.homeContainer}>
    >
      <Text 
      style={styles.instructions}
      >
        Home Screen</Text>
      <Image source={require('./assets/joppe-spaa-TsYzva0e2pQ-unsplash.jpg')}
      style={styles.image}
      />
      <Image source={require('./assets/jannik-skorna-mY2ZHBU6GRk-unsplash.jpg')}
      style={styles.image}
      />
      <Image source={require('./assets/thomas-serer-r-xKieMqL34-unsplash.jpg')}
      style={styles.image}
      />
      {/* <Image source={{uri:'https://unsplash.com/photos/8-s5QuUBtyM',cache: 'only-if-cached' }} style={styles.image} /> */}
      <Button title="Upload Screen" onPress={() => navigation.navigate("Upload")} />
      <Button title="The Green Screen" onPress={() => navigation.navigate("GreenScreen", {name:"Blue Screen"})} />

      <Text style={styles.instructions}>Post: {route.params?.post}</Text>
    </ScrollView>
    </SafeAreaView>
  )
}

function CreatePostScreen({ navigation, route }) {
  const [postText, setPostText] = React.useState("");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (<Button onPress={() => navigation.navigate("Upload")} title="Upload" color='white' />)
    })
  })
  
  return (
    <View style={styles.container}>
      <TextInput placeholder="What's on your mind?" style={styles.post} value={postText} onChangeText={setPostText} />
      <Button title="Post Text" onPress={() => navigation.navigate({ name: "Home", params: { post: postText }, merge: true, })} />
      <Button title="Post with Video" onPress={() => navigation.navigate({ name: "Upload", params: { post: postText }, merge: true, })} />
      <Button title='Titular update' onPress={() => navigation.setOptions({ headerTitle: "New Post" })} />
    </View>
  );

}

function BroadcastScreen({ navigation }) {
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
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
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

function UploadStackScreen(){
  return(
    <BroadcastStack.Navigator>
      <BroadcastStack.Screen name="Create Post" component={CreatePostScreen} />
      <BroadcastStack.Screen name="Upload" component={BroadcastScreen} />
    </BroadcastStack.Navigator>
  )
}

export default function App(props) {

  return (
    <NavigationContainer>
      <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size}) => {
          let iconName;
          if (route.name === 'Home'){
            iconName = focused ? 'home'
            : 'home-outline';
          } else if (route.name === 'Upload') {
            iconName = 'cloud-upload';
          } else if (route.name === 'CreatePost'){
            iconName = "create";
          } else if (route.name === 'GreenScreen'){
            iconName = focused ?  "color-palette" : "color-palette-outline";
          }

          return <Ionicons name={iconName} size={size} color={color}/>;
        },
        //tabBarActiveTintColor: 'tomato',
      })}
      //mode="modal" initialRouteName='Home' screenOptions={{ headerStyle: { backgroundColor: 'black' }, headerTintColor: 'white', headerTitleStyle: { fontWeight: 'bold' }, }} >
        >
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false}} />
        {/* <Tab.Screen name="Upload" component={BroadcastScreen} options={{ headerTitle: (props) => <LogoTitle {...props} /> }} /> */}
        <Tab.Screen name="GreenScreen" component={GreenScreen} initialParams={{ username: "tammyado" }} options={({ route }) => ({ title: route.params.name, tabBarBadge: 3 }) } />
        <Tab.Screen name="CreatePost" component={UploadStackScreen} options={{
          headerShown: false,
          //headerRight: () => (<Button onPress={() => alert("Upload")} title="Upload" color='white'/>), 
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
  },  homeContainer: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    
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
    backgroundColor: 'white',
  },
  image:{
    width: 400,
    height: 250,
    marginTop: 5,
    marginBottom: 20,
    padding: 20,
    //flexShrink: 1,
    //flex: 0.5
  }
});
