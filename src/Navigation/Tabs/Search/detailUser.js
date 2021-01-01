import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet,TextInput, Button, Text, View, FlatList, Alert, TouchableOpacity,Image } from 'react-native';
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
        <View style={styles.main_container}>
          <Image
            style={styles.image}
            source={{uri:"image"}}
          />
          <View style={styles.content_container}>
            <View style={styles.name_container}>
              <Text style={styles.name}>{Asso.Nom}</Text>
            </View>
            <View style={styles.description_container}>
              <Text style={styles.description}>{Asso.Description} </Text>
            </View>
          </View>
        </View>
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
        <View style={styles.main_container}>
          <Image
            style={styles.image}
            source={{uri:"image"}}
          />
          <View style={styles.content_container}>
            <Text style={styles.name}>Prenom : {route.params.item.Nom}</Text>
            <Text style={styles.name}>Nom : {route.params.item.Prenom}</Text>
          </View>
        </View>
        <View style={styles.title_container}>
          <Text style={styles.name}>Les associations de {route.params.item.Nom} : </Text>
        </View>
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
const styles=StyleSheet.create({
  main_container:{
    height:180,
    flexDirection:'row'
  },
  image:{
    height:170,
    width:120,
    margin:5,
    backgroundColor:'gray'
  },
  content_container:{
    flex:1,
    margin:5
  },
  name_container:{
    flex:2,
    flexDirection:'row'
  },
  name:{
    fontWeight:'bold',
    fontSize:20,
    flex:1,
    flexWrap:'wrap',
    paddingRight:5
  },
  description_container:{
    flex:6
  },
  description:{
    color:'#666666',
    fontStyle:'italic'
  },
  text:{
    fontWeight:'bold',
    fontSize:20
  },
  title_container:{
    height:30
  }
})
  export default UserDetail;
