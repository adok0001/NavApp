import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text, View, Button, Image, Dimensions } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;

export default function PlayerDetails() {
  const tabBarheight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={styles.homeContainer}>
      <ScrollView
        indicatorStyle="white"
        contentContainerStyle={[
          { paddingBottom: tabBarheight, alignItems: 'center' },
        ]}
      >
        <Image source={require("../assets/jeffrey-f-lin-eO2l1doO9H8-unsplash.jpg")} style={styles.playerPic} />
        <View style={{ flex:3, paddingLeft: 15, justifyContent: "space-around", paddingRight: 20 }}>

          <View syle={{ flex: 1, flexDirection: "row" }}>
            <>
            <Text style={styles.instructions}>Player Name</Text>
            <Text style={styles.playerName}>Tagwa Moyo</Text>
            </><>
            <Text style={styles.instructions}>Position</Text>
            <Text style={styles.playerName}>TS</Text>
            </>
          </View>

          {/* <View style={{flex: 2, flexDirection:"row", justifyContent:"space-around"}}> */}
          <View syle={{ flexDirection: "column" }}>
            <Text style={styles.instructions}>Player Details</Text>
            <Text style={styles.detailsText}>Big game player. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tristique fringilla dui non ullamcorper. Ut non semper lorem. Nunc sit amet quam nisl. Suspendisse potenti. Nunc porttitor ornare magna nec volutpat.
              Sed vel porta ex, in congue dui. Nunc nec egestas eros. Sed vel dolor erat. Cras quam enim, efficitur in ultricies fermentum, fringilla at lectus. Sed a euismod massa.</Text>
          </View>
          <View syle={{ flexDirection: "column" }}>
            <Text style={styles.instructions}>Games Played</Text>
            <Text style={styles.detailsText}>300</Text>
            <Text style={styles.instructions}>Goals Scored</Text>
            <Text style={styles.detailsText}>821</Text>
          </View>
        </View>
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  homeContainer: {
    flex: 1,
    backgroundColor: '#111',
    flexWrap: "wrap",
    //alignItems: 'center',
    justifyContent: 'center',
    //paddingBottom: 10,
  },
  contentContainer: {
    marginTop: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  image: {
    borderRadius: 14,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  smallpic: {
    width: 150,
    height: 150,
  },
  subheader: {
    fontSize: 26,
    color: '#888'
  },
  instructions: {
    color: '#888',
    fontSize: 15,
    //marginHorizontal: 15,
  },
  playerPic: {
    width: 450,
    height: 300,
    marginBottom: 50,
    flex: 2
  },
  playerName: {
    color: "blue",
    fontSize: 25
  },
  detailsText: {
    color: "blue",
    fontSize: 18
  }
});