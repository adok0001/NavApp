import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text, View, Button, Image, Dimensions, TouchableOpacity } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;

function header(route){
  const team = route.params.team;
  return (
    <Text style={{fontSize:30, color:'black'}}> {team} </Text>
    )
}

export default function TeamDetails({navigation, route}) {
    //const team = route.params.team;
    const video = React.useRef(null);
    const tabBarheight = useBottomTabBarHeight();

    return(
        <SafeAreaView style={styles.homeContainer}>
        <ScrollView
          indicatorStyle="white"
          contentContainerStyle={[{ paddingBottom: tabBarheight, alignItems: 'center' } ]}
        >
            <Image style={styles.image} source={require('../assets/jannik-skorna-mY2ZHBU6GRk-unsplash.jpg')} />
            <Text style={styles.subheader}>Team Info</Text>
            <Text style={styles.instructions}>This is our team! We are striving harder to be the best, constantly improving body and mind.</Text>
            
            <Text style={styles.subheader}>Player List</Text>
            <ScrollView contentContainerStyle={[{alignItems:'center'}]} horizontal={true}>
            <TouchableOpacity onPress={() => navigation.navigate("PlayerInfo")}>
            <Image style={styles.smallpic} source={require('../assets/jannik-skorna-mY2ZHBU6GRk-unsplash.jpg')} />
            </TouchableOpacity>
            <Image style={styles.smallpic} source={require('../assets/thomas-serer-r-xKieMqL34-unsplash.jpg')} />
            <Image style={styles.smallpic} source={require('../assets/joppe-spaa-TsYzva0e2pQ-unsplash.jpg')} />
            <Image style={styles.smallpic} source={require('../assets/jannik-skorna-mY2ZHBU6GRk-unsplash.jpg')} />
            </ScrollView>
            
            <Text style={styles.subheader}>Media</Text>
            <ScrollView contentContainerStyle={[{alignItems:'center'}]} horizontal={true}>
            <Image style={styles.smallpic} source={require('../assets/jannik-skorna-mY2ZHBU6GRk-unsplash.jpg')} />
            <Image style={styles.smallpic} source={require('../assets/joppe-spaa-TsYzva0e2pQ-unsplash.jpg')} />
            <Image style={styles.smallpic} source={require('../assets/thomas-serer-r-xKieMqL34-unsplash.jpg')} />
            <Image style={styles.smallpic} source={require('../assets/jannik-skorna-mY2ZHBU6GRk-unsplash.jpg')} />
            </ScrollView>


      </ScrollView>
      </SafeAreaView>
    )
}


const styles = StyleSheet.create({

    homeContainer: {
      flex: 1,
      backgroundColor: '#111',
      alignItems: 'center',
      //justifyContent: 'center',
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
        resizeMode: 'contain'
    },
    subheader:{
        fontSize:22,
        fontWeight: 'bold',
        color:'white'
    },
    instructions: {
      color: 'white',
      fontSize: 15,
      //marginHorizontal: 15,
    }
  });