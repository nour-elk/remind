import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {TextInput, Button, Text, View, FlatList, Alert, TouchableOpacity,Image } from 'react-native';
import {useState,useEffect } from "react";
import Api from '../../../../services/dataService';
import react, {Component} from 'react';
import * as React from 'react';
import {S3} from 'aws-sdk';
import * as ImagePicker from 'expo-image-picker';
import * as fs from 'expo-file-system'



function AddAssos({route, navigation}){
    const [Name , setName] = useState('');
    const [Description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const[file, setFile] = useState({})

    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
        setFile({
          uri: result.uri,
          name: "random",
          type: result.type,
       });
      
      }
    };  
  
    const uploadImageOnS3 = async (file, ID) => {
      const s3bucket = new S3({
        accessKeyId: 'AKIA2EWC25SSF42E5RZW',
        secretAccessKey: '697267055780',
        Bucket: 'image-nour-remind',
        signatureVersion: 'v4',
      });
   let contentType = 'image/jpeg';
      let contentDeposition = 'inline;filename="' + file.name + '"';
      const arrayBuffer = await fs.readAsStringAsync(file.uri,  {encoding : fs.EncodingType.Base64});
      
      Api.sendImage(ID, arrayBuffer, "ASSOCIATION", "ID").then((Data) => {
        console.log(Data);
        navigation.navigate('main', {refresh : true})
      })
    }
    const addAssosButton = () => {

        
        Api.submitCreateAsso(route.params.mail, Name, Description).then((Data) =>{
          
  
          if (Data == "Association created successfully")
          {
            alert("Association created successfully");
            uploadImageOnS3(file, String(Name).toLowerCase());
           
          }
          else 
          {
            alert("Error or already exists");
          }
        } )
  
    }
  
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
     <TextInput style={{height:50}} placeholder = 'Name' onChangeText = {Name => setName(Name)}/>
     <TextInput style={{marginBottom: 30 }} placeholder = 'Description' onChangeText = {Description => setDescription(Description)}/>
     <Button style={{marginTop: 30 }}  title="Choisir Votre image" 
     color="#7a25ff"
     onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    
     <Button style={{marginTop: 30 }} onPress={ addAssosButton}
     title ='Ajouter Association ou Club '
     color="#7a25ff" />
    </View>
    )
  }
  
  export default AddAssos;