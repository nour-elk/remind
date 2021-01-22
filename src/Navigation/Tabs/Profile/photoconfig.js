import {TextInput, Button, Text, View,ScrollView, FlatList, Alert, TouchableOpacity, Image ,StyleSheet} from 'react-native';
import react, {Component} from 'react';
import * as React from 'react';

import {S3} from 'aws-sdk';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

import  { useState, useEffect } from 'react';
//import * as fs from 'react-native-fs';
import * as fs from 'expo-file-system'

import Api from '../../../../services/dataService'



function PhotoProfileScreen({route, navigation}) {

  const [image, setImage] = useState(null);

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
      const file = {
        uri: result.uri,
        name: "random",
        type: result.type,
     };
     uploadImageOnS3(file);
    }
  };  

  const uploadImageOnS3 = async (file) => {
    const s3bucket = new S3({
      accessKeyId: 'AKIA2EWC25SSF42E5RZW',
      secretAccessKey: '697267055780',
      Bucket: 'image-nour-remind',
      signatureVersion: 'v4',
    });
 let contentType = 'image/jpeg';
    let contentDeposition = 'inline;filename="' + file.name + '"';
    const arrayBuffer = await fs.readAsStringAsync(file.uri,  {encoding : fs.EncodingType.Base64});
    
    Api.sendImage(route.params.mail, arrayBuffer, "USER","Email").then((Data) => {
      console.log(Data);
      if (Data=="Image sent successfully")
      {
        alert("Photo modifiée avec succès")
      }
      
      
    })
    
 };



    return (
      <View style={styles.mainContainer}>
      
      <View style={styles.buttonStyle}>  
      <Button title="Choisir Votre image"  color="#7a25ff" onPress={pickImage} />
      </View>
      {image && <Image source={{ uri: image }} style={styles.image} />}
    

    
    </View>
    );
  }

  export default PhotoProfileScreen;

  const styles= StyleSheet.create({
    mainContainer:{
      flex:1,
      marginTop:30,
      alignItems:'center'

    },
    buttonStyle: {
      marginLeft : 80,
      marginRight: 80,
      marginBottom : 10,
      marginBottom : 10,
      marginTop:20
  },
    image :{
      height:200,
      width:200,
      
      backgroundColor:'gray',
      
    },

  })