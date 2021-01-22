import {TextInput,Image,  Button, Text, View, FlatList, Alert, TouchableOpacity,StyleSheet  } from 'react-native';
import react, {Component} from 'react';
import {useState} from "react";
import Api from '../../../../services/dataService'
import * as React from 'react';
import MenuDrawer from 'react-native-side-drawer';

import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import { render } from 'react-dom';
import buttonPress from '../../../dashboard'
var imageLink = "https://mk7t0lal8k.execute-api.eu-west-3.amazonaws.com/getImage/";

function getUserProfil(mail) {
  var [Profile, SetProfil] = useState([{Nom: "charging"}]);
  
  Api.getProfil(mail).then((Data) => {
    console.log(JSON.stringify(Data.Item))
    SetProfil(Data.Item)
    
  })
  
  return(Profile)

}
class Profil extends React.Component{

  constructor(props) {
    super(props);

    this.toggleOpen = this.toggleOpen.bind(this);
    this.drawerContent = this.drawerContent.bind(this);
        
    this.state = {
      open: false,
      

    };
  }

 
 
getLog= ()=> {buttonPress  }
  

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  drawerContent = () => {
    return (
        
          <TouchableOpacity onPress={this.toggleOpen} style = {{  borderLeftWidth:1, borderLeftColor :"#c2c2c2", flex : 1, backgroundColor : "white"}}>
            <View style={styles.sideMenuHeader}>
              <Text style= {styles.sideMenuHeaderText}>Configurer Profil</Text>
            </View>

            <View style={styles.sideMenuBody}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Paramètres Photo')} style = {{flex : 0 , flexDirection : "row", marginBottom : 15}} >
            <View style = {{width : 10, height: 10}}/>
              <AntDesignIcons name = "picture" size = {30}/>
            <Text style = {{fontSize: 20}}>  Changer ma photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Paramètres')} style = {{flex : 0 , flexDirection : "row", marginBottom : 15}} >
            <View style = {{width : 10, height: 10}}/>
              <AntDesignIcons name = "lock" size = {37}/>
            <Text style = {{fontSize: 20}}>  Changer mon mot           de passe</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.getLog } style = {{flex : 0 , flexDirection : "row", marginBottom : 15}} >
            <View style = {{width : 10, height: 10}}/>
              <AntDesignIcons name = "logout" size = {27}/>
            <Text style = {{fontSize: 20}}>  Sign out </Text>
          </TouchableOpacity>
          </View>
  
      </TouchableOpacity>
      
    );
  };


  
  render() {
    
    
    return (
      
    <MenuDrawer open={this.state.open} position = "right" drawerContent={this.drawerContent()} drawerPercentage={65} animationTime={85} overlay={true} opacity={0.4}>
      
      <View style={styles.mainContainer}>  
          

          
          <View style={styles.Header}>



            <View style = {{flex: 1,   textAlignVertical: 'center'}}> 
              <Text style = {styles.textHeader}>Profil</Text> 
            </View>

                <View style = {styles.ButtonAdd}>
                  <TouchableOpacity onPress = {this.toggleOpen}>
                    <AntDesignIcons color = 'white' name = "setting" size = {28}/>
                  </TouchableOpacity>
                </View>
          </View>

          <View style = {{flex: 2}}> 
          <TouchableOpacity disabled ={!this.state.open} onPress={this.toggleOpen} style={styles.body}>
            <Image style={styles.image } source={{uri:imageLink+this.props.Profile.imageID}}/>
          <Text style ={styles.text}>{this.props.Profile.Nom}</Text> 
         
          <Text style ={styles.text}>{this.props.Profile.Prenom}</Text>
         <Text style ={styles.text}>INDP {this.props.Profile.Niveau}</Text>
           </TouchableOpacity>
            </View>

           <View style={styles.ItemContainer} >
           <Text style ={styles.titleText}>Contact</Text>
           <TouchableOpacity>
           <Text style ={styles.text}>{this.props.Profile.Phone}</Text>
           <Text style ={styles.text}>{this.props.Profile.Email}</Text>
           </TouchableOpacity>
           </View>


           
          </View>
    </MenuDrawer>
  
  
    

    
    )
  };
}


function ProfileScreen({route, navigation }) {


 return(
      <Profil  Profile={getUserProfil(route.params.mail)}  getLog={route.params.getLog} navigation={navigation}/>
    
 ) 
}

  export default ProfileScreen;

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
    titleText:{

      fontWeight:'bold',
      fontSize:22,
      color:'#7a25ff',
      marginBottom:25,
    },
    animatedBox: {
      flex: 1,
      backgroundColor: "#38C8EC",
      padding: 10
    },
    body: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    image :{
      height:140,
      width:140,
      margin:5,
      backgroundColor:'gray',
      borderRadius: 70
    },
    sideMenuHeader :{
      flex: 0,
      flexDirection: 'row',
      borderBottomColor: 'white',
      borderBottomWidth: 2.5,
      backgroundColor : '#7a25ff',
      height : 50
    },
    sideMenuHeaderText:{
      fontSize : 20,
      fontWeight:"bold",
      marginLeft:5,
      color:"#ffffff",
      alignContent:'center',
      textAlignVertical:'center'

    },
    sideMenuBody:{
      flex:1,
      backgroundColor:'#f7f2fc'
    },
    ItemContainer :{
      flex : 1,
      backgroundColor : "#f5edfc",
      height: 5,
      marginLeft : 15,
      marginRight : 15,
      marginBottom : 100,
      marginTop : 7,
      borderWidth:2,
      borderColor :'#f5edfc',
      borderRadius: 8,
      
      alignItems:'center',
      
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

   
    
})