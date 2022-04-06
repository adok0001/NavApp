import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { getHeaderTitle } from '@react-navigation/elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStackScreen from "./Screens/Home";
import UploadStackScreen from "./Screens/BroadcastScreen";
import MatchDetails from './Screens/MatchDetails';
import { GreenScreen } from './GreenScreen';
import SearchScreen from './Screens/SearchScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const RootHome = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeStack') {
            iconName = focused ? 'home'
              : 'home-outline';
          } else if (route.name === 'Upload') {
            iconName = 'cloud-upload';
          } else if (route.name === 'CreatePost') {
            iconName = "create";
          } else if (route.name === 'GreenScreen') {
            iconName = focused ? "color-palette" : "color-palette-outline";
          } else if (route.name === "SearchScreen") {
            iconName = "search";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          position: 'absolute',
          borderTopColor: 'black',
          backgroundColor: 'black',
          elevation: 0,
        },
        tabBarBackground: () => (<BlurView tint="dark" intensity={45} style={StyleSheet.absoluteFill} />),
        tabBarBadgeStyle: { backgroundColor: 'blue' },
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{headerShown:false, tabBarLabel:"Home"}} />
      <Tab.Screen name="SearchScreen" component={SearchScreen} options={{headerShown:false, tabBarLabel:"Search"}} />
      {/* <Tab.Screen name="GreenScreen" component={GreenScreen} initialParams={{ username: "tammyado" }} options={({ route }) => ({ title: route.params.name, tabBarBadge: 3 })} /> */}
      <Tab.Screen name="CreatePost" component={UploadStackScreen} options={{
        headerShown: false,
        tabBarLabel: 'Create Post',
        //headerRight: () => (<Button onPress={() => alert("Upload")} title="Upload" color='white'/>), 
      }} />
    </Tab.Navigator>

  )
}

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="rootHome" component={RootHome} options={{ headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {

  return (
    <SafeAreaProvider>
      <Navigation/>
    </SafeAreaProvider>
  );

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    // alignItems: 'center',
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
