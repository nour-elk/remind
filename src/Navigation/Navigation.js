import * as React from 'react';
import {TextInput, Button, Text, View, FlatList, Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {useState} from "react";
import Api from '../../services/dataService'
import react, {Component} from 'react';

//Local imports
import AssoStackScreen from "./Tabs/Asso/AssoStack";
import SearchStackScreen from "./Tabs/Search/SearchStack";
import ProfileStackScreen from "./Tabs/Profile/ProfileStack";
import HomeStackScreen from "./Tabs/Home/HomeStack";





const Tab = createBottomTabNavigator();

var email ;
var refresh;
function returnsMail() {
  return  email;
}
export default function show(mail,callback) {
  email = mail;
  refresh= false;
  
  return (
    <NavigationContainer>
        <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => { 
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
            ? 'ios-information-circle'
            : 'ios-information-circle-outline';
            refresh= true;
          } else if (route.name === 'Search') {
            iconName = focused
            ? 'ios-search'
            : 'ios-search';
          }
          else if (route.name === 'Profile') {
            iconName = focused
            ? 'ios-person'
            : 'ios-person';
          }
          else if (route.name === 'Asso') {
            iconName = focused
            ? 'ios-share'
            : 'ios-share';
          }
    
      return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{ activeTintColor: '#f38efa', inactiveTintColor: 'black',}}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} initialParams={{ mail: mail , refresh : refresh}}/>
        <Tab.Screen name="Search" component= {SearchStackScreen} initialParams = {{refresh: true}}/>
        <Tab.Screen name="Profile" component= {ProfileStackScreen} initialParams={{ mail: mail , getLog : callback}}/>
        <Tab.Screen name="Asso"  component= {AssoStackScreen} initialParams={{ mail: mail }}/>
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}
