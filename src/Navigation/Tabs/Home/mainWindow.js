import Api from '../../../../services/dataService';
import {TextInput, Button, Text, View,ScrollView, FlatList, Alert, TouchableOpacity ,StyleSheet,Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import react, {Component, Fragment} from 'react';
import {useState} from "react";
import Icon from 'react-native-vector-icons/Feather';
import * as React from 'react';
var imageLink = "https://mk7t0lal8k.execute-api.eu-west-3.amazonaws.com/getImage/";

class EventItem extends Component{
  constructor(props){
    super(props);
  }
  render () {
    const {Event, detailsEvent} = this.props
    return (
      <View style={styles.EventItemContainer}  >
      <TouchableOpacity 
        onPress={() => detailsEvent(Event)}>
      <View style={styles.eventItem}> 
        <Image style={styles.image } source={{uri:imageLink+ Event.imageID}}/>
        <View>
         <Text style ={styles.NomEvent} >{" " + Event.Nom}</Text>  
         <Text style={styles.DescriptionEvent}>{Event.Description}</Text>
         </View>  
       </View>
      </TouchableOpacity>
      </View>
    )

  }
}
function HomeScreen({route, navigation }) {
  var [Event, SetEvent] = useState([]);
  var [Favoris, SetFavoris] = useState([]);
    const getEvents= () => {
       Api.getEvent(route.params.mail).then((Data) => {
        console.log(JSON.stringify(Data.Items))
        
        SetEvent(Data.Items)
  
      })
    };

    const DisplayEvent = (item) => {
      navigation.navigate("details", {mail : route.params.mail, item : item});
    }
    
    if(route.params.refresh == true)
    {
      getEvents();
      route.params.refresh = false;
    }
    
  


    return(
      <View style=  {styles.mainContainer} >      
      <View style = {styles.secondaryBottomContainer}>
        
          
      <FlatList  
        data =  {Event}
        keyExtractor={(item) => item.Nom}
        renderItem = { ( {item}) => <EventItem Event = {item} detailsEvent = {DisplayEvent}/> }
        onEndReachedThreshold={0.7}
        onEndReached={() => {
          console.log("end reached");
          //if (item.favoris)
        }}
      />
      </View>
      </View>

           ) 
   }
   
     export default HomeScreen;

     const styles = StyleSheet.create({
      mainContainer :{ 
        
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
      EventItemContainer :{
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
        borderRadius:100,
        
  
      },
      eventItem :{
        backgroundColor :'#f5edfc',
        flex :1 , 
        flexDirection: 'row',
        
        
      },
      NomEvent:{
        marginTop:10,
        fontWeight : "bold",
        fontSize : 20,
        
        
      },
      DescriptionEvent:{
        fontSize : 12,
        marginLeft:8, 
        marginTop:8
      }
      
    })
   