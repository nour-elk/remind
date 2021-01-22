import {StyleSheet,TextInput, Button, Text, View, FlatList, Alert, TouchableOpacity ,ScrollView,Image} from 'react-native';
import react, {Component} from 'react';
import * as React from 'react';
import {useState} from "react";
import { Ionicons } from '@expo/vector-icons';
import Api from '../../../../services/dataService';


class UserItem extends Component{
  constructor(props){
    super(props);
  }
  render () {
    const {User, detailsUser} = this.props
    return (
      <View style ={styles.itemStyle}>
      <TouchableOpacity
        onPress={() => detailsUser(User)}>

       <Text style={{fontSize:16,marginLeft:10}}>{User.Nom + " " + User.Prenom}</Text> 

      </TouchableOpacity>
      </View>
    )

  }
}



function mainScreen({ navigation }) {
  const [Search , setSearch] = useState('');
  const [Users, searchUsers] = useState([]);


  //refresh si on veut faire un 2ème search
  const updateSearch = (Search) => {
    setSearch(Search);
    if(Search != "")
    {
    Api.getUsers(Search).then((Data) =>{
      console.log(JSON.stringify(Data.Items));
      
      searchUsers(Data.Items);
    })
  }
  }
  // fct pour afficher détail membre
  const DisplayUser = (item) =>{
    navigation.navigate("Détails du Membre", {item : item, refresh : true})
  } 
  console.log("hello")
  return (
    <ScrollView style={{ flex: 1 }}>
        <View style = {{flex :1,marginTop:40,marginLeft:5,marginRight:5 }}>
  
          <View style={{flex:1 , flexDirection:"row"}}>
            <TextInput style= {styles.textInput} 
              placeholder = 'Search' 
              onChangeText = {Search => updateSearch(Search)} 
            />
            <TouchableOpacity onPress={()=>updateSearch(Search)} >
            <Ionicons name={'ios-search'} size={40} color={'#7a25ff'} />
            </TouchableOpacity>
       
          </View>
        
        <View style = {{flex : 3,marginBottom : 15,}}>
          <FlatList  
            data =  {Users}
            renderItem = { ( {item}) => <UserItem User = {item} detailsUser = {DisplayUser}/> }
            
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              console.log("end reached");
            }}
          />
          </View>
          
          <Image 
           source={require('../../../images/search3.png')} 
           style={styles.image}
                 />
        

       </View>

      
    </ScrollView>
  );
}
const styles=StyleSheet.create({
  textInput:{
    marginBottom:5,
    height:50,
    minWidth:300,
    marginRight :10,
    borderColor:'#000000',
    borderWidth:1,
    paddingLeft:5,
  },
  itemStyle:{
    flex : 1,
      backgroundColor : "#f5edfc",
      height: 30,
      marginLeft : 2,
      marginRight : 45,
      marginTop : 2,
      borderWidth:2,
      borderColor :'#f5edfc',
      borderRadius: 8,
      
      
      
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
  image:{

    height:300,
    width:300,
    margin:6,
    marginTop:40,
    //backgroundColor:'#f5edfc',
    resizeMode :'stretch',

  }
}

)

  export default mainScreen;
