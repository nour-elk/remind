import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet,TextInput, Button, Text, View, FlatList, Alert, TouchableOpacity,Image,ScrollView } from 'react-native';
import {useState} from "react";
import Api from '../../../../services/dataService'
import react, {Component} from 'react';
import * as React from 'react';

var imageLink = "https://mk7t0lal8k.execute-api.eu-west-3.amazonaws.com/getImage/";

// component association 
class AssoItem extends Component{
    constructor(props){
      super(props);
    }
    render () {
      const {Asso, detailsAsso} = this.props
      return (
        <View style={styles.assoContainer}>
          <TouchableOpacity  
          onPress={() => detailsAsso(Asso)}>
          <Image
            style={styles.imageAsso}
            source={{uri:imageLink+Asso.imageID}}
          />
          
              <Text style={styles.nameAsso}>{Asso.Nom}</Text>
            
              
              </TouchableOpacity>

        </View>
      )
  
    }
  }



  function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}


function UserDetail({route, navigation}){
  var [Asso, SetAssos] = useState([]);
  const getAsso= () => {
     Api.getAssos(route.params.item.Email).then((Data) => {
       console.log(Data)
       
      SetAssos(Data.Items)
    })
  };

  // fct pour afficher détaills association du membre 
  const DisplayAsso = (item) => {
    navigation.navigate("Détails de l'association", {mail : route.params.item.Email, item : item});
  }
  if(route.params.refresh == true)
  {
    getAsso();
    route.params.refresh = false;
  }

    return (
      <ScrollView > 
          
        <View style={styles.main_container}>
          <Image
            style={styles.image}
            source={{uri:imageLink+route.params.item.imageID}}
          />
          
            <Text style={styles.name}>{route.params.item.Nom}</Text>
            <Text style={styles.name}>{route.params.item.Prenom}</Text>
            <Text style={styles.name}>INDP {route.params.item.Niveau}</Text>
        
        
          <Text style={styles.titleText}>Les associations de {route.params.item.Nom} : </Text>
          </View>

          
        <FlatList  
            data =  {Asso}
            keyExtractor={(item) => item.Nom}
            renderItem = { ( {item}) => <AssoItem Asso = {item} detailsAsso = {DisplayAsso}/>}
            onEndReachedThreshold={0.7}
            style ={styles.secondContainer}
            horizontal={false}
            numColumns={3}
            onEndReached={() => {
              console.log("end reached");
             

            }}
          />
          <View style ={{marginTop:30}}/>
        <View style={styles.ItemContainer} >
           <Text style ={styles.titleText}>Contact</Text>
           <TouchableOpacity>
           <Text style ={styles.name}>{route.params.item.Phone}</Text>
           <Text style ={styles.name}>{route.params.item.Email}</Text>
           </TouchableOpacity>
           </View>
          
          
      </ScrollView>
    );
  }
const styles=StyleSheet.create({
  main_container:{
    
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop:20,
    flex:1,
    
  },
  image:{
    height:140,
      width:140,
      margin:5,
      backgroundColor:'gray',
      borderRadius: 70
  },
  titleText:{

    fontWeight:'bold',
    fontSize:25,
    color:'#7a25ff',
    marginBottom:10,
  },
  titleContact:{

    fontWeight:'bold',
    fontSize:22,
    color:'#7a25ff',
    marginBottom:25,
  },

  name:{
    fontWeight:'bold',
    fontSize:20,
    
    flexWrap:'wrap',
    
  },
  secondContainer:{
    flex:1,
    flexDirection:'row',

  },
  nameAsso:{
    fontWeight:'bold',
    fontSize:20,
    marginLeft:15,
    

  },
  assoContainer:{
    flex:1,
    flexDirection:'column',
    width:120,
    alignItems:'center'

  },
  textDescription:{
    color:'#666666',
    fontStyle:'italic',
    //marginLeft:25,
  },
  imageAsso:{
    height:80,
    width:80,
    margin:5,
    backgroundColor:'gray',
    borderRadius: 40

  },
  ItemContainer :{
    flex : 1,
    backgroundColor : "#f5edfc",
    height:130,
    marginLeft : 15,
    marginRight : 15,
    marginBottom : 20,
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
  export default UserDetail;
