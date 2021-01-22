import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {TextInput, Button, Text, View, FlatList, Alert, TouchableOpacity, StyleSheet ,Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useState} from "react";
import Api from '../../../../services/dataService'
import react, {Component} from 'react';
import * as React from 'react';

var imageLink = "https://mk7t0lal8k.execute-api.eu-west-3.amazonaws.com/getImage/";

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
        <View style={styles.assoItem}> 
        <Image style={styles.image } source={{uri:imageLink+Asso.imageID}}/>
        <View>
         <Text style ={styles.NomAsso} >{" " + Asso.Nom}</Text>  
         <Text style={styles.DescriptionAsso}>{Asso.Description}</Text>
         </View>  
       </View>
       
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

            <View style = {{flex: 1}}> 
              <Text style = {styles.textHeader}>Clubs</Text> 
            </View>
            
            <View style = {styles.ButtonAdd}>
            <TouchableOpacity onPress={() => navigation.navigate('Créer votre club', {mail : route.params.mail})}>
              <Ionicons color ='white' name={"ios-add-circle-outline"} size={30}  />
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
    
      flex : 1,
    },
  
    Header : {
      flex: 0,
      flexDirection: 'row', 
      borderBottomColor: 'white',
      borderBottomWidth: 2.5,
      backgroundColor : '#7a25ff',
      //backgroundColor : '#34458b',
      height:50,
      
    },
    textHeader :{
      flex : 1,
      fontWeight:"bold",
      fontSize: 20, 
      marginLeft:10,
      color:"#ffffff",
      height :20,
      alignContent:'center',
      textAlignVertical:'center'
    },
    ButtonAdd : {
      flex : 0,
      marginRight:5,
      justifyContent:'center'
    },
    text : {
      fontWeight : "bold",
       fontSize : 20
      },
    secondaryBottomContainer : {
      backgroundColor : "#f5f5f5",  
      flex : 1
    },
    AssoItemContainer :{
      flex : 1,
      backgroundColor : "#ffffff",
      
      marginLeft : 10,
      marginRight : 10,
      marginBottom : 7,
      marginTop : 7,
      borderWidth:2,
      borderColor :'#f5edfc',
      borderRadius: 10,
      
      //borderBottomLeftRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
      width: 0,
        height: 5,
      },
      shadowOpacity: 0.34,
      shadowRadius: 6.27,

      elevation: 10,

    },
    image :{
      height:100,
      width:100,
      margin:6,
      backgroundColor:'#f5edfc',
      resizeMode :'stretch',
      borderRadius:50,
      

    },
    assoItem :{
      backgroundColor :'#f5edfc',
      flex :1 , 
      flexDirection: 'row',
      
      
    },
    NomAsso:{
      marginTop:10,
      fontWeight : "bold",
      fontSize : 20,
      
      
    },
    DescriptionAsso:{
      fontSize : 12,
      marginLeft:8, 
      marginTop:8,
      width:200
    }
    



  })