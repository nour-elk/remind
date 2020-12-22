import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {TextInput, Button, Text, View, FlatList, Alert, TouchableOpacity } from 'react-native';
import {useState} from "react";
import Api from '../../../../services/dataService';
import react, {Component} from 'react';
import * as React from 'react';


function AddAssos({route, navigation}){
    const [Name , setName] = useState('');
    const [Description, setDescription] = useState('');
    const addAssosButton = () => {
  
        Api.submitCreateAsso(route.params.mail, Name, Description).then((Data) =>{
          
  
          if (Data == "Association created successfully")
          {
            alert("Association created successfully");
            navigation.navigate('main', {refresh : true})
          }
          else 
          {
            alert("Error or already exists");
          }
        } )
  
    }
  
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
     <TextInput style={{height:50}} placeholder = 'Name' onChangeText = {Name => setName(Name)}/>
     <TextInput style={{marginBottom: 30 }} placeholder = 'Description' onChangeText = {Description => setDescription(Description)}/>
     <Button style={{marginTop: 30 }} onPress={ addAssosButton}
     title ='Ajouter Association ou Club '/>
    </View>
    )
  }
  
  export default AddAssos;