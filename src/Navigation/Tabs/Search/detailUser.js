import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {TextInput, Button, Text, View, FlatList, Alert, TouchableOpacity } from 'react-native';
import {useState} from "react";
import Api from '../../../../services/dataService'
import react, {Component} from 'react';
import * as React from 'react';

class AssoItem extends Component{
    constructor(props){
      super(props);
    }
    render () {
      const {Asso} = this.props
      return (
        <Text>{Asso}</Text>
      )
  
    }
  }

  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}


function UserDetail({route, navigation}){

    return (
      <View>
        {console.log(route.params.item)}
        <Text>Prenom : {route.params.item.Nom}</Text>
        <Text>Nom : {route.params.item.Prenom}</Text>
        <Text>Assos: </Text>
        <FlatList  
            data =  {route.params.item.ASSO}
            renderItem = { ( {item}) => <AssoItem  Asso = {item} /> }
            onEndReachedThreshold={0.7}
            onEndReached={() => {
              console.log("end reached");
            }}
          />
      </View>
    );
  }

  export default UserDetail;