import {TextInput, Button, Text, View,ScrollView, FlatList, Alert, TouchableOpacity ,StyleSheet} from 'react-native';
import react, {Component} from 'react';
import {useState} from "react";
import * as React from 'react';
import Api from '../../../../services/dataService'

function SecondaryProfileScreen ({route, navigation}) {


  var [Password1, setPassword1]= useState([]);
  var [Password2, setPassword2]= useState([]);
  var [Password , setPassword]= useState([]);
  var [touchable, setTouchable] = useState(true);
  var textValue;
  
  var text;

  const onEditPassword = () => {

    if(Password1 == Password2){
      setTouchable(false);
    Api.EditPassword(route.params.mail, Password, Password1 ).then((Data) => 
      {
        setTouchable(true); 
       alert(JSON.stringify(Data) )
       if (Data == "Success")
       {
           console.log("right");
           console.log(Data);
       }
       else{
           alert ("Wrong ");
           console.log(Data);
       }

      });
    }
    else{
      alert("Passwords do not match")
    }
    
  }


  const  matchPassword =(Password1,Password2)=>{ 
    if (Password1===Password2)
    {text= "Passwords Match"}
    else 
    {
      text= "Passwords do not match "
    }
    return(text);


  }
    return (
      <View style={{ flex: 1 }}>
      <ScrollView >
      <TextInput
       style = {styles.textBox} 
       placeholder = 'Old Password' 
       onChangeText={text => setPassword(text)}
      />
      <TextInput
       style = {styles.textBox} 
       placeholder = 'New Password' 
       onChangeText = {text => setPassword1(text)}
      />
      <TextInput
       style = {styles.textBox} 
       placeholder = 'Repeat New Password' 
       onChangeText = {text => setPassword2(text)} 

      />
      <Text > {matchPassword(Password1,Password2)} </Text>

      <View style = {styles.buttonStyle}>
            < Button  
              color="#7a25ff"
              style = {{marginBottom : 10, marginBottom : 10}}
              onPress={ onEditPassword }
              title="Change Password "
              disabled = {!touchable}
            />
                </View>
      

    </ScrollView>
    </View>
    );
  }

  export default SecondaryProfileScreen;

  const styles = StyleSheet.create(
    {
        
        textBox : {
            marginLeft: 30,
            marginRight: 30,
            height: 40,
            backgroundColor:'#ffffff',
            borderColor: '#000000',
            borderWidth: 0.5,
            paddingLeft: 5,
            marginBottom: 30

        },
        buttonStyle: {
            marginLeft : 110,
            marginRight: 110,
            marginBottom : 10,
            marginBottom : 10,
            marginTop:20
        }
    }
)