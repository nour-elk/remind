import {TextInput, Button, Text, View,ScrollView, FlatList, Alert, TouchableOpacity, Image } from 'react-native';
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
      
    })
    //const arrayBuffer = decode(base64);
 /*s3bucket.createBucket(() => {
      const params = {
        Bucket: 'image-nour-remind',
        Key: file.name,
        Body: arrayBuffer,
        ContentDisposition: contentDeposition,
        ContentType: 'base64',
    };
 s3bucket.upload(params, (err, data) => {
      if (err) {
        console.log(err)
        console.log('error in callback');
      }
    console.log(data)
    console.log('success');
    console.log("Respomse URL : "+ data.Location);
    });
  });*/
 };



    return (
      <View style={{ flex: 1 }}>
      <ScrollView >
      
      <Button title="Choisir Votre image" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    

    </ScrollView>
    </View>
    );
  }

  export default PhotoProfileScreen;

  /*

  const chooseImage = async () => {
    ImagePicker.launchImageLibrary({
    mediaType :'photo', 
    storageOptions: {
        skipBackup: true,
        path: 'images',
      },  
    
    
},  async (response) => {
  if (response.didCancel) {
    console.log("No image not selected");
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
    } else {
        const file = {
            uri: response.uri,
            name: response.fileName,
            type: 'image/jpeg',
         };
         uploadImageOnS3(file);
        }
})
    };
  */