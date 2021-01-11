import {TextInput,Image,  Button, Text, View, FlatList, Alert, TouchableOpacity,StyleSheet  } from 'react-native';
import react, {Component} from 'react';
import {useState} from "react";
import Api from '../../../../services/dataService'
import * as React from 'react';
import MenuDrawer from 'react-native-side-drawer';

import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import { render } from 'react-dom';
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

   /*var [Profile, SetProfil] = useState([{Nom: "charging"}]);
  const getProfil= () => {
    Api.getProfil(route.params.mail).then((Data) => {
      SetProfil(Data.Item)
      
    })
  };

  if(route.params.refresh == true)
  {
    getProfil();
    console.log("test");
    console.log(Profile);
    route.params.refresh = false;
  };
*/ 
 
  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  drawerContent = () => {
    return (
        
          <TouchableOpacity onPress={this.toggleOpen} style = {{  borderLeftWidth:1, borderLeftColor :"#c2c2c2", flex : 1, backgroundColor : "white"}}>
            <View style={{ marginTop: 30 , flex: 0,flexDirection: 'row',borderBottomColor: 'black',borderBottomWidth: 1,height : 32.2}}>
              <Text style= {{fontSize : 20}}>Configurer Profil</Text>
            </View>


          <TouchableOpacity onPress={() => this.props.navigation.navigate('photoParam')} style = {{flex : 0 , flexDirection : "row", marginBottom : 15}} >
            <View style = {{width : 10, height: 10}}/>
              <AntDesignIcons name = "picture" size = {30}/>
            <Text style = {{fontSize: 20}}>  changer ma photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Parametres')} style = {{flex : 0 , flexDirection : "row", marginBottom : 15}} >
            <View style = {{width : 10, height: 10}}/>
              <AntDesignIcons name = "lock" size = {30}/>
            <Text style = {{fontSize: 20}}>  changer mon mot de passe</Text>
          </TouchableOpacity>
  
      </TouchableOpacity>
      
    );
  };


  
  render() {
    
    
    return (
      
    <MenuDrawer open={this.state.open} position = "right" drawerContent={this.drawerContent()} drawerPercentage={65} animationTime={250} overlay={true} opacity={0.4}>
     
      <View style={styles.mainContainer}>  
          <View style={styles.Header}>



            <View style = {{flex: 1,  alignItems:'center', textAlignVertical: 'center'}}> 
              <Text style = {styles.textHeader}>Profil</Text> 
            </View>

                <View style = {styles.ButtonAdd}>
                  <TouchableOpacity onPress = {this.toggleOpen}>
                    <AntDesignIcons name = "setting" size = {28}/>
                  </TouchableOpacity>
                </View>
          </View>
        
          <TouchableOpacity disabled ={!this.state.open} onPress={this.toggleOpen} style={styles.body}>
            <Image style={styles.image } source={{uri:imageLink+this.props.Profile.imageID}}/>
          <Text style ={styles.text}>{this.props.Profile.Nom}</Text> 
         
          <Text style ={styles.text}>{this.props.Profile.Prenom}</Text>
         <Text style ={styles.text}>INDP {this.props.Profile.Niveau}</Text>
           </TouchableOpacity>
           <Button 
          title="configurer profil"
          onPress={() => navigation.navigate('Parametres')}
         />
          </View>
    </MenuDrawer>
  
  
    

    
    )
  };
}


function ProfileScreen({route, navigation }) {


 return(
      <Profil  Profile={getUserProfil(route.params.mail)} navigation={navigation}/>
    
 ) 
}

  export default ProfileScreen;

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
  textHeader :{
    flex : 1,
    fontWeight:"bold",
    fontSize: 20, 
    color:"#7a25ff",
    height :20,
    alignContent:'center'
  },
  ButtonAdd : {
    flex : 0,
  },
  text : {
    fontWeight : "bold",
     fontSize : 20
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
      height:170,
      width:120,
      margin:5,
      backgroundColor:'gray'
    }
   
    
})