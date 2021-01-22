import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuDrawer from 'react-native-side-drawer'
import PropTypes from 'prop-types';
import {TextInput, Button, Text, View, FlatList, TouchableOpacity,StyleSheet,Image,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import {useState} from "react";
import Api from '../../../../services/dataService'
import react, {Component} from 'react';
import * as React from 'react';

var imageLink = "https://mk7t0lal8k.execute-api.eu-west-3.amazonaws.com/getImage/";

const MyView = (props) => {
  const { children, hide, style } = props;
  if (hide) {
    return null;
  }
  return (
    <View {...this.props} style={style}>
      { children }
    </View>
  );
};





class AssoDetailC extends React.Component{
  constructor(props) {
    super(props);

    this.toggleOpen = this.toggleOpen.bind(this);
    this.drawerContent = this.drawerContent.bind(this);
    this.quitterAsso=this.quitterAsso.bind(this);
    this.alertQuitterAsso=this.alertQuitterAsso.bind(this);
    
    this.state = {
      open: false,
      
    };
  }

   
  quitterAsso=()=>{
    var textalert= "Vous avez quitter  " + String(this.props.route.params.item.ID)
    Api.QuitterAsso (this.props.route.params.mail,this.props.route.params.item.ID).then((Data) => {
      if(Data == "Success") {
          alert(textalert);
          
      }
      else{
        alert("Vous êtes admin de cet association. Veuillez réessayer plutard.");
        console.log(Data);

      }

    this.props.navigation.navigate("main",{mail: this.props.route.params.mail,refresh :true});
    })

  };

  alertQuitterAsso =()=> {
    Alert.alert("Etes vous surs de vouloir quitter l'association ? " ,
    "",
    [
      {
        text: "Annuler",
        onPress: () => console.log("Cancel Pressed"),
        
      },
      { text: "Oui", onPress: this.quitterAsso }
    ],
    );
    

  };
  
  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

      
   drawerContent = () => {
    return (
        
          <TouchableOpacity onPress={this.toggleOpen} style = {{  borderLeftWidth:1, borderLeftColor :"#c2c2c2", flex : 1, backgroundColor : "white"}}>
            <View style={styles.sideMenuHeader}>
              <Text style= {styles.sideMenuHeaderText}>Options</Text>
            </View>

     <View style= {styles.sideMenuBody }>   
    <MyView hide ={!this.props.route.params.item.Admin.includes(this.props.route.params.mail)}>
          <TouchableOpacity onPress = {() => {this.props.navigation.navigate("Ajouter Membre", {assoID : this.props.route.params.item.ID , Asso : this.props.route.params.item})}}
                            style = {{flex : 0 , flexDirection : "row", marginBottom : 15 }} >
            <View style = {{width : 10, height: 10}}/>
              <FeatherIcons name = "user-plus" size = {30} />
            <Text style = {{fontSize: 20}}>  Ajouter membre</Text>
          </TouchableOpacity>
          

          <TouchableOpacity onPress = {() => {this.props.navigation.navigate("Virer Membre", {assoID : this.props.route.params.item.ID , Asso : this.props.route.params.item})}}                             
                            style = {{flex : 0 , flexDirection : "row", marginBottom : 15}} >
            <View style = {{width : 10, height: 10}}/>
              <FeatherIcons name = "user-x" size = {30}/>
            <Text style = {{fontSize: 20}}>  Retirer membre</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => {this.props.navigation.navigate("Ajouter Catégorie", {assoID : this.props.route.params.item.ID , Asso : this.props.route.params.item})}}
                            style = {{flex : 0 , flexDirection : "row", marginBottom : 15}} >
            <View style = {{width : 10, height: 10}}/>
              <EntypoIcons name = "tag" size = {30}/>
            <Text style = {{fontSize: 20}}>  Ajouter catégorie</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => {this.props.navigation.navigate("Retirer Catégorie", {assoID : this.props.route.params.item.ID , Asso : this.props.route.params.item})}}
                            style = {{flex : 0 , flexDirection : "row", marginBottom : 15}} >
            <View style = {{width : 10, height: 10}}/>
              <EntypoIcons name = "untag" size = {30}/>
            <Text style = {{fontSize: 20}}>  Retirer categorie</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => {this.props.navigation.navigate("Ajouter évènement",{assoID : this.props.route.params.item.ID})}}
                            style = {{flex : 0 , flexDirection : "row", marginBottom : 15}} >
            <View style = {{width : 10, height: 10}}/>
            <EntypoIcons name = "flag" size = {30}/>
            <Text style = {{fontSize: 20}}>  ajouter évènement </Text>
          </TouchableOpacity>



    </MyView>
          <TouchableOpacity onPress ={this.alertQuitterAsso} style = {{flex : 0 , flexDirection : "row", marginBottom : 15}} >
            <View style = {{width : 10, height: 10}}/>
              <AntDesignIcons name = "close" size = {30}/>
            <Text style = {{fontSize: 20}}>  Quitter l'association</Text>
          </TouchableOpacity>
          
      </View>  
      </TouchableOpacity>
      
    );
  };

    render(){
    return (

    <MenuDrawer open={this.state.open} position = "right" drawerContent={this.drawerContent()} drawerPercentage={65} animationTime={250} overlay={true} opacity={0.4}>
      <View style={styles.mainContainer}>  
          <View style={styles.Header}>

              <View style = {styles.ButtonAdd}>
                <TouchableOpacity style = {{width : 40}} onPress={() => this.props.navigation.navigate('main')}>
                  <FeatherIcons name={"arrow-left"} size={30} color = {"white"}/>
                </TouchableOpacity> 
              </View>
            

            <View style = {{flex: 1,  textAlignVertical: 'center'}}> 
              <Text style = {styles.textHeader}>{this.props.route.params.item.Nom}</Text> 
            </View>

                <View style = {styles.ButtonAdd}>
                  <TouchableOpacity onPress = {this.toggleOpen}>
                    <EvilIcons name = {"pencil"} size = {40} color = {"white"} />
                  </TouchableOpacity>
                </View>
          </View>
        
          <TouchableOpacity disabled ={!this.state.open} onPress={this.toggleOpen} style={styles.body}>
          <Image style={styles.image } source={{uri:imageLink+this.props.route.params.item.imageID}}/>
            <Text style ={styles.textTitle}>{this.props.route.params.item.Nom}</Text>
            <Text style ={styles.textDescription}>{this.props.route.params.item.Description}</Text>
            <Text style ={styles.text}>{this.props.route.params.item.nbr}  Membres</Text>
      
            
          </TouchableOpacity>
      </View>
    </MenuDrawer>

    )
    }
  }

/*


*/

function AssoDetail({route, navigation}){
  return (
    <AssoDetailC navigation = {navigation} route = {route}/>
  )
}

  export default AssoDetail;


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
    animatedBox: {
      flex: 1,
      backgroundColor: "#38C8EC",
      padding: 10
    },
    body: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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
       marginBottom:80,
      },
      textDescription:{
        color:'#666666',
        fontStyle:'italic',
        marginBottom:45,
        padding:10,
        marginLeft:10,
      },
    text : {
      //fontWeight : "bold",
       fontSize : 18,
       marginBottom:8,
      },

  })