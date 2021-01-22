
import { createStackNavigator } from '@react-navigation/stack';
import {TextInput, Button, Text, View, FlatList, Alert, TouchableOpacity } from 'react-native';
import react, {Component} from 'react';
import * as React from 'react';
import {useState} from "react";


import mainScreen from './mainWindow'
import UserDetail from './detailUser'
import  AssoDetail from "../Asso/detail"

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

const SearchStack = createStackNavigator();

function SearchStackScreen({route, navigation}){
    if (route.params.refresh == true)
    {
        useForceUpdate();
        route.params.refresh == false;
    }
    console.log(route.params.refresh);
    return (
    <SearchStack.Navigator>
        <SearchStack.Screen name= "main"  options={{ headerShown: false }} component = {mainScreen}/>
        <SearchStack.Screen name = "Détails du Membre"  initialParams={{ refresh : true}} component= {UserDetail} />
        <SearchStack.Screen name = "Détails de l'association" component= {AssoDetail} options={{headerShown : false}}/>
    
    </SearchStack.Navigator>
    )
}
export default SearchStackScreen;