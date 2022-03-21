import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text, View, Button, Image, Dimensions } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.9;

export default function PlayerDetails(){
    return (
        <SafeAreaView style={styles.homeContainer}>
        <Text style={styles.instructions}>Player details screen</Text>
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
    },
    subheader:{
        fontSize:26,
        color:'#888'
    },
    instructions: {
      color: '#888',
      fontSize: 14,
      //marginHorizontal: 15,
    }
  });