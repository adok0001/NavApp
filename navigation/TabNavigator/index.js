import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/AntDesign';

import Home from '../../screens/Home';
import Browse from '../../screens/Browse';
import Library from '../../screens/Library';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Browse':
      iconName = 'appstore-o';
      break;
    case 'Library':
      iconName = 'folder1';
      break;
    default:
      break;
  }

  return <Icon name={iconName} color={color} size={24} />;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({color}) => screenOptions(route, color),
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: '#d9d9d9',
      tabBarStyle: {
        //borderTopColor: 'black',
        backgroundColor: 'black',
        elevation: 0,
      },
    })}
    tabBar={(props) => <CustomTabBar {...props} />}

    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Browse" component={Browse} />
      <Tab.Screen name="Library" component={Library} />
    </Tab.Navigator>
  );
};

export default TabNavigator;