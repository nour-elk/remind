import * as React from 'react';
import {TextInput, Button, Text, View,ScrollView, StyleSheet, TouchableOpacity,Image } from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import {useState} from "react";
import Api from '../../../../services/dataService';

var imageLink = "https://mk7t0lal8k.execute-api.eu-west-3.amazonaws.com/getImage/";

function EventDetail({route, navigation}){

  var [name, SetName] = useState([]);
  const addEventFav =() => {
    Api.addEventFav(route.params.item.ID,route.params.mail).then((Data) => {
     if (Data == "Success")
     {
       alert("évènement ajouté à favoris avec succès")
       SetName("ios-heart")
     }
     else{ if (Data == "Success delete")
     {
       alert("évènement retiré de favoris")
       SetName("ios-heart-dislike")
     }
     else{
       alert(Data)

     }}

    })




  }
    return (
      <View style={{flex:1}}>

      <View style={styles.header}>
      <TouchableOpacity onPress = {addEventFav}>
          <Ionicons color = '#f38efa' name = {name} size = {28}/>
      </TouchableOpacity>
      </View>

      <View style ={styles.body}>
            <Image style={styles.image } source={{uri:imageLink+route.params.item.imageID}}/>
            <Text style ={styles.textTitle}>{route.params.item.Nom}</Text>
            <Text style ={styles.textDescription}>{route.params.item.Description}</Text>
            <Text style ={styles.text}>{"Début le: "+route.params.item.DateDeb }</Text>
            <Text style ={styles.text}>{"Fin le: "+ route.params.item.DateFin }</Text>
            <Text style ={styles.text}>{"Adresse: " + route.params.item.Adresse}</Text>
            <Text style ={styles.text}>{"Association d'organisation:  "+String(route.params.item.Asso).toUpperCase()}</Text>

      </View>
      </View>
    )
  }
  
    export default EventDetail;

    const styles= StyleSheet.create({

      header:{

        marginTop:20,
        marginLeft:320,

      },
      body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      image :{
        height:100,
        width:100,
        margin:6,
        backgroundColor:'#f0f0e9',
        resizeMode :'stretch',
        borderRadius:50,
        
  
      },

        textTitle : {
          fontWeight : "bold",
           fontSize : 25,
           marginBottom:20,
          },
        text : {
          //fontWeight : "bold",
           fontSize : 15,
           marginBottom:5,
          },
          textDescription:{
            color:'#666666',
            fontStyle:'italic',
            marginBottom:8,
            fontSize : 18,

          },
    })