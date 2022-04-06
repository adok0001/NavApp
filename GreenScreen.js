import React from 'react';
import { Button, Text, View } from 'react-native';

export function GreenScreen({ route, navigation }) {
  const { username, playerNo } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>The Green Screen</Text>
      <Text style={styles.instructions}>Username: {JSON.stringify(username)} Player Number: {JSON.stringify(playerNo)}</Text>
      <Button title="Re-Green" onPress={() => navigation.navigate("GreenScreen", { username: "godtamara", playerNo: Math.floor(Math.random() * 100), })} style={styles.button} />
      <Button title='Going back' onPress={() => navigation.goBack()} />
      <Button title="Go back to first screen in Tab" onPress={() => navigation.popToTop()} />
    </View>

  );
}
