import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {TextInput, Button, Text, View, FlatList, Alert, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useState} from "react";
import Api from '../../../../services/dataService'
import react, {Component} from 'react';
import * as React from 'react';



function AssoDetail({route, navigation}){


  const iterate = () => {
    for (var key in route.params.item.Architecture){
      <Text>{String(key)} :  {JSON.stringify(route.params.item.Members.key)} </Text>
    }
  }
  const editButton = () => {
    if (route.params.item.Admin.includes(route.params.mail))
    {
      return (
      <TouchableOpacity onPress = {() => navigation.navigate("editAsso", {assoID: route.params.item.ID})}>
          <EvilIcons name = {"pencil"} size = {40}/>
      </TouchableOpacity>)
    }
  }
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        editButton()
      ),
    });
  }, [navigation]);
    return (
      <View>
        {console.log(route.params)}
        <Text>{route.params.item.Nom}</Text>
        <Text>{route.params.item.Description}</Text>
        <Text>Members : </Text>
        { iterate() } 
      </View>
    );
  }

  export default AssoDetail;