import React from 'react';
import { Button, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { data } from '../Data';
import { Video, AVPlaybackStatus } from 'expo-av';
import MatchDetails from './MatchDetails';
import TeamDetails from "./TeamDetails";
import PlayerDetails from './PlayerDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { width } = Dimensions.get('screen');

const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;
const HomeStack = createNativeStackNavigator();

function Home({ navigation, route }) {
  const tabBarheight = useBottomTabBarHeight();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});


  return (
    <SafeAreaView style={styles.homeContainer}>
      <ScrollView
        indicatorStyle="white"
        contentContainerStyle={[
          { paddingBottom: tabBarheight, alignItems: 'center' },
        ]}
      >
        {data.map((item) => (
          <View key={item.id} style={{ marginBottom: 14 }}>
            <Video source={{ uri: item.video_url }}
              ref={video}
              style={styles.video}
              useNativeControls
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={status => setStatus(() => status)}

            />
            <Button style={styles.instructions} title={item.homeTeam + " vs " + item.awayTeam}
              onPress={() => navigation.navigate("MatchInfo",{ id:item.id, match:item})} />
            <Text style={styles.instructions}>Comp: {item.matchType} Time: {item.matchTime}</Text>
          </View>
        ))}


        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() => status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()}
        />

        <Button title="Upload Screen" onPress={() => navigation.navigate("CreatePost")} />
        <Text style={styles.instructions}>Post: {route.params?.post}</Text>
        <Image source={{ uri: route.params?.media }} style={styles.image} />

      </ScrollView>
    </SafeAreaView>
  );
}

export default function HomeScreen() {
  return (
    <HomeStack.Navigator>   
      <HomeStack.Screen name="Home" component={Home} options={{
        headerTitle: "Match Day", headerStyle: {},
        headerTitleStyle: { fontWeight: 'bold', fontSize: 25, },
        //,headerTintColor:"white", headerTransparent:true headerBackground: ()=> <Image style={{width: 500, height: 100,}} source={require('./assets/thomas-serer-r-xKieMqL34-unsplash.jpg')} />,
      }} />
      <HomeStack.Screen name="MatchInfo" component={MatchDetails} options={{headerShown:false}} />
      <HomeStack.Screen name="TeamInfo" component={TeamDetails} options={{headerShown:false}} />
      <HomeStack.Screen name="PlayerInfo" component={PlayerDetails} options={{headerShown:false}} />
    </HomeStack.Navigator>
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

