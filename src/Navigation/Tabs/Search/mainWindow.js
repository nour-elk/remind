import {StyleSheet,TextInput, Button, Text, View, FlatList, Alert, TouchableOpacity } from 'react-native';
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
        <View style = {{flex :1,marginTop:40,marginLeft:5,marginRight:5 }}>
  
          <View style={{flex:1}}>
            <TextInput style= {styles.textInput} 
              placeholder = 'Search' 
              onChangeText = {Search => updateSearch(Search)} 
            />
            <Button  
              color='#7a25ff' 
              title='Search'
              onPress={()=>updateSearch(Search)} 
            />        
          </View>
        
        <View style = {{flex : 4}}>
          <FlatList  
            data =  {Users}
            renderItem = { ( {item}) => <UserItem User = {item} detailsUser = {DisplayUser}/> }
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              console.log("end reached");
            }}
          />

        </View>
       </View>

      
    </View>
  );
}
const styles=StyleSheet.create({
  textInput:{
    marginBottom:5,
    height:50,
    borderColor:'#000000',
    borderWidth:1,
    paddingLeft:5,
  },
  button:{
  }
}

)

  export default mainScreen;
