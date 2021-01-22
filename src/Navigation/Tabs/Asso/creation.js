import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {TextInput, Button, Text, View, FlatList, Alert, TouchableOpacity,Image,StyleSheet } from 'react-native';
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
            alert("Association crée avec succès");
            uploadImageOnS3(file, String(Name).toLowerCase());
           
          }
          else 
          {
            alert("Erreur ou existe déja");
          }
        } )
  
    }
  
    return (
      <View style={styles.mainContainer}>
     <TextInput style={styles.text} placeholder = 'Nom du club' onChangeText = {Name => setName(Name)}/>
     <TextInput style={styles.text} placeholder = 'Description du club ' onChangeText = {Description => setDescription(Description)}/>
     <View style={styles.buttonStyle} >
     <Button  title="Choisir Votre image" 
     color="#7a25ff"
     onPress={pickImage} />
     </View>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.buttonStyle}>
     <Button  onPress={ addAssosButton}
     title ='Ajouter Association ou Club '
     color="#7a25ff" />
     </View>
    </View>
    )
  }
  
  export default AddAssos;

  const styles = StyleSheet.create({
    mainContainer :{ 
    
      flex : 1,
      
      alignItems: 'center' 
    },
    text:{
      height:50
    },
    buttonStyle :{
      marginTop: 20,
      
      height:50
    },
    image :{
      width: 200,
      height: 200
    }
  
    
  })