import {TextInput, Button, Text, View, FlatList, Alert, TouchableOpacity } from 'react-native';
import react, {Component} from 'react';
import {useState} from "react";
import Api from '../../../../services/dataService'
import * as React from 'react';



function ProfileScreen({route, navigation }) {
  var [Profil, SetProfil] = useState([{Nom: "charging"}]);
  const getProfil= () => {
    Api.getProfil(route.params.mail).then((Data) => {
      console.log(JSON.stringify(Data.Item))
      SetProfil(Data.Item)
    })
  };
  if(route.params.refresh == true)
  {
    getProfil();
    console.log("test");
    route.params.refresh = false;
  }
 


  return (
    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profil screen</Text>
      <View>
       <Text style ={{fontWeight : "bold",
       fontSize : 20
      }}>{
        Profil.Nom}</Text> 
        <Text style ={{fontWeight : "bold",
       fontSize : 20
      }}>{
        Profil.Prenom}</Text>
        <Text style ={{fontWeight : "bold",
       fontSize : 20
      }}>{
        Profil.Niveau}</Text>
        
        </View>

      <Button 
        title="configurer profil"
        onPress={() => navigation.navigate('Parametres')}
      />
    </View>
    

    
    
  );
}

  export default ProfileScreen;