import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, Text, View, FlatList, Button } from "react-native";
import { Video } from "expo-av";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function MatchDetails({ navigation, route }) {
    const item = route.params.match;
    const video = React.useRef(null);
    const tabBarheight = useBottomTabBarHeight();

    return (
        <SafeAreaView style={styles.homeContainer}>
                <View key={item.id} style={{ marginBottom: 14, alignItems:"center" }}>
                    <Video source={{ uri: item.link }}
                        ref={video}
                        style={styles.video}
                        useNativeControls
                        resizeMode="contain"
                    />
                    <React.Fragment>
                        <Text style={styles.teamName} onPress={() => navigation.navigate("TeamInfo", { team: item.homeTeam })} >
                            {item.homeTeam} vs
                            <Text style={styles.teamName} onPress={() => navigation.navigate("TeamInfo", { team: item.awayTeam })} >
                             {" "+item.awayTeam} 
                             </Text>
                             </Text>
                        <Text style={styles.instructions}>Comp: {item.matchType} Time: {item.matchTime}</Text>
                    </React.Fragment>
                </View>

                <View style={{ flexDirection: "row" , alignItems: "center"}}>
                    <>
                    <FlatList
                        data={[
                            { key: 'Devin' },
                            { key: 'Dan' },
                            { key: 'Dominic' },
                            { key: 'Jackson' },
                            { key: 'James' },
                            { key: 'Joel' },
                            { key: 'John' },
                            { key: 'Jillian' },
                            { key: 'Jimmy' },
                            { key: 'Julie' },
                        ]}
                        renderItem={({ item }) => <Text style={styles.instructions}>{item.key}</Text>}
                        ListHeaderComponent={<Text style={styles.subheader} onPress={() => navigation.navigate("TeamInfo", { team: item.homeTeam })}>{item.homeTeam}</Text>
                    }
                        />
                    </>
                    
                    <>
                    <FlatList
                        data={[
                            { key: 'Devin' },
                            { key: 'Dan' },
                            { key: 'Dominic' },
                            { key: 'Jackson' },
                            { key: 'James' },
                            { key: 'Joel' },
                            { key: 'John' },
                            { key: 'Jillian' },
                            { key: 'Jimmy' },
                            { key: 'Julie' },
                        ]}
                        renderItem={({ item }) => <Text style={styles.instructions} onPress={() => navigation.navigate("PlayerInfo", { team: item.awayTeam })}>{item.key}</Text>}
                        ListHeaderComponent={<Text style={styles.subheader} onPress={() => navigation.navigate("TeamInfo", { team: item.awayTeam })}>{item.awayTeam}</Text>}
                    />
                    </>
                </View>

            
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
    video: {
        alignSelf: 'center',
        width: 320,
        height: 200,
    },
    instructions: {
        color: 'grey',
        fontSize: 16,
        marginHorizontal: 15,

    },
    teamName: {
        fontSize: 18,
        color: "white"
    },
    subheader:{
        fontSize:20,
        marginHorizontal: 15,
        alignItems: "center",
        color:'white'
    }
});