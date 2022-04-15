import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
import Login from './Screens/auth/Login';
import SignUp from './Screens/auth/SignUp';
import Settings from './Screens/SettingsScreen';
import { render } from 'react-dom';
import { auth } from './Screens/auth/firebase';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

class RootHome extends Component {
  constructor(props) {
    super();
    this.state =
      { loaded: false }

  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false, loaded: true
        })
      } else {
        console.log("signed uid - "+user.uid)
        this.setState({ loggedIn: true, loaded: true })
      }

    });
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={styles.container}>
          <Text style={styles.instructions}>Loading!</Text>
        </View>
      )
    }
    if (!loggedIn) {
      return (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      )
    } else {

      return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'HomeStack') {
                iconName = focused ? 'home'
                  : 'home-outline';
              } else if (route.name === 'CreatePost') {
                iconName = focused ? "create" : "create-outline";
              } else if (route.name === 'Settings') {
                iconName = focused ? "settings" : "settings-outline";
              } else if (route.name === "SearchScreen") {
                iconName = focused ? "search" : "search-outline";
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
          <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{ headerShown: false, tabBarLabel: "Home" }} />
          {/* <Tab.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false, tabBarLabel: "Search" }} /> */}
          <Tab.Screen name="CreatePost" component={UploadStackScreen} options={{
            headerShown: false,
            tabBarLabel: 'Create Post',
            //headerRight: () => (<Button onPress={() => alert("Upload")} title="Upload" color='white'/>), 
          }} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>

      )
    }

  }

}

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="rootHome" component={RootHome} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default function App() {

  return (
    <SafeAreaProvider>
      <Navigation />
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
