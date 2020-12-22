import {TextInput, Button, Text, View, FlatList, Alert, TouchableOpacity } from 'react-native';
import react, {Component} from 'react';
import * as React from 'react';
import {useState} from "react";
import Api from '../../../../services/dataService';


class UserItem extends Component{
  constructor(props){
    super(props);
  }
  render () {
    const {User, detailsUser} = this.props
    return (
      <TouchableOpacity
        onPress={() => detailsUser(User)}>

       <Text>{User.Nom + " " + User.Prenom}</Text> 

      </TouchableOpacity>
    )

  }
}



function mainScreen({ navigation }) {
  const [Search , setSearch] = useState('');
  const [Users, searchUsers] = useState([]);

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
  const DisplayUser = (item) =>{
    navigation.navigate("detailUser", {item : item, refresh : true})
  } 
  console.log("hello")
  return (
    <View style={{ flex: 1 }}>
        <View style = {{flex : 0 ,height : 40}}/>
        <View style = {{flex :1  }}>
  
          <View style={{ flex: 1, flexDirection: 'row'}}>
            <TextInput style= {{flex:1}} placeholder = 'Search' onChangeText = {Search => updateSearch(Search)} />          
          </View>
        </View>
        <View style = {{flex : 16}}>
        <FlatList  
            data =  {Users}
            renderItem = { ( {item}) => <UserItem User = {item} detailsUser = {DisplayUser}/> }
            onEndReachedThreshold={0.7}
            onEndReached={() => {
              console.log("end reached");
            }}
          />

        </View>
      
    </View>
  );
}

  export default mainScreen;