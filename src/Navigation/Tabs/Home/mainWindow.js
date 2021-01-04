import Api from '../../../../services/dataService';
import {TextInput, Button, Text, View,ScrollView, FlatList, Alert, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import react, {Component, Fragment} from 'react';
import {useState} from "react";
import Icon from 'react-native-vector-icons/Feather';
import * as React from 'react';


class EventItem extends Component{
  constructor(props){
    super(props);
  }
  render () {
    const {Event, detailsEvent} = this.props
    return (
      <View  >
      <TouchableOpacity 
        onPress={() => detailsEvent(Event)}>

       <Text style ={{fontWeight : "bold",
     fontSize : 20
    }} >{" " + Event.Nom}</Text> 

      </TouchableOpacity>
      </View>
    )

  }
}
function HomeScreen({route, navigation }) {
  var [Event, SetEvent] = useState([]);
    const getEvents= () => {
       Api.getEvent(route.params.mail).then((Data) => {
         //alert(Data.Items.Object.Nom)
         //console.log (Data.Items.Object.Nom)
        SetEvent(Data.Items.Object)
      })
    };

    const DisplayEvent = (item) => {
      navigation.navigate("details", {mail : route.params.mail, item : item});
    }
    getEvents();
  


    return(
            
      <View >
          
      <FlatList  
        data =  {Event}
        keyExtractor={(item) => item.Nom}
        renderItem = { ( {item}) => <EventItem Event = {item} detailsEvent = {DisplayEvent}/> }
        onEndReachedThreshold={0.7}
        onEndReached={() => {
          console.log("end reached");
        }}
      />
      
      </View>

           ) 
   }
   
     export default HomeScreen;
   