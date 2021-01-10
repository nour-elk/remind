import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {TextInput, Button, Text, View, FlatList, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useState} from "react";
import Api from '../../../../services/dataService'
import react, {Component} from 'react';
import * as React from 'react';

Array.prototype.unique = function() {
  var a = this.concat();
  for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
          if(a[i] === a[j])
              a.splice(j--, 1);
      }
  }

  return a;
};


class AssoItem extends Component{
    constructor(props){
      super(props);
    }
    render () {
      const {Asso, detailsAsso} = this.props
      return (
        <View style={styles.AssoItemContainer} >
        <TouchableOpacity 
          onPress={() => detailsAsso(Asso)}>
  
         <Text style ={{fontWeight : "bold",
       fontSize : 20
      }} >{" " + Asso.Nom}</Text> 
  
        </TouchableOpacity>
        </View>
      )
  
    }
  }
  

function AssoScreen({route, navigation}) {
    var [Asso, SetAssos] = useState([]);
    const getAsso= () => {
       Api.getAssos(route.params.mail).then((Data) => {
         console.log(Data)
         
        SetAssos(Data.Items)
      })
    };
    const DisplayAsso = (item) => {
      navigation.navigate("detail", {mail : route.params.mail, item : item});
    }
    if(route.params.refresh == true)
    {
      getAsso();
      route.params.refresh = false;
    }
    /*<Icon 
                name='ios-american-football'
                type='ionicon'
                color='#517fa4'
                />*/
    return (
      <View style=  {styles.mainContainer} >  
    
          <View style={styles.Header}>

            <View style = {{flex: 1, alignItems:'center'}}> 
              <Text style = {styles.textHeader}>Clubs</Text> 
            </View>
            
            <View style = {styles.ButtonAdd}>
            <TouchableOpacity onPress={() => navigation.navigate('creation', {mail : route.params.mail})}>
              <Ionicons name={"ios-add-circle-outline"} size={30}  />
            </TouchableOpacity> 
            </View>
          </View>
  
          <View style = {styles.secondaryBottomContainer}>
          
          <FlatList  
            data =  {Asso}
            keyExtractor={(item) => item.Nom}
            renderItem = { ( {item}) => <AssoItem Asso = {item} detailsAsso = {DisplayAsso}/> }
            onEndReachedThreshold={0.7}
            onEndReached={() => {
              console.log("end reached");
            }}
          />
          
          </View>
      </View>
    );
  }

  export default AssoScreen;


  const styles = StyleSheet.create({
    mainContainer :{ 
      marginTop: 30,
      flex : 1,
    },
    Header : {
      flex: 0,
      flexDirection: 'row', 
      borderBottomColor: 'black',
      borderBottomWidth: 1,
    },
    secondaryBottomContainer : {
      backgroundColor : "#f5f5f5",  
      flex : 1
    },
    textHeader :{
      flex : 1,
      fontWeight:"bold",
      fontSize: 20, 
  
      height :20,
      color:"#7a25ff",
    },
    ButtonAdd : {
      flex : 0,
    },
    AssoItemContainer :{
      flex : 1,
      backgroundColor : "#ffffff",
      marginLeft : 10,
      marginRight : 10,
      marginBottom : 4,
      marginTop : 4,
      borderWidth:1,
      borderRadius:3,
      shadowColor: "#000",
      shadowOffset: {
      width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10,

    }



  })