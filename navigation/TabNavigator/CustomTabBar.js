import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';


const CustomTabBar = (props) => {
    return (
        <BlurView 
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0,  }}
         tint="dark"
         intensity={100}
          blurRadius={50}
          overlayColor="transparent"
            >
            <BottomTabBar {...props} />
        </BlurView>
    );

};

export default CustomTabBar;