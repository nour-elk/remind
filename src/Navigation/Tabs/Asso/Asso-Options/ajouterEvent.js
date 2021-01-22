import {TextInput, Button, Text, View,ScrollView, FlatList, Alert, TouchableOpacity, StyleSheet,Image } from 'react-native';
import * as React from 'react';
import  { useState, useEffect } from 'react';
import react, {Component, Fragment} from 'react';
import DatePicker from 'react-native-datepicker';
import {S3} from 'aws-sdk';
import * as fs from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MapView , { PROVIDER_GOOGLE } from 'react-native-maps';
import Api from '../../../../../services/dataService';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";



class Event extends React.Component{

    constructor(props)
    {
        super(props)
        
        this.setNom = this.setNom.bind(this);
        this.setDescription = this.setDescription.bind(this); 
        this.onAddLocation=this.onAddLocation.bind(this);
        this.setDateDeb=this.setDateDeb.bind(this);
        this.setTimeDeb1=this.setTimeDeb1.bind(this);
        this.setTimeFin=this.setTimeFin.bind(this);
        this.setDateFin=this.setDateFin.bind(this);
        this.AddEvent = this.AddEvent.bind(this);
        this.getAddress = this.getAddress.bind(this);


    
    this.state = {
        Nom : "",
        DateDeb : "",
        TimeDeb1 :"Horaire",
        DateFin : "",
        TimeFin :"Horaire",
        Description : "",
        Localisation :"",
        isDatePickerVisible1 : false,
        isDatePickerVisible2 : false,
        listViewDisplayed: true,
        assoID : this.props.assoID, 
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta:0.2,
            longitudeDelta:0.33,
            },
           
        address:"",
        searchText:"",
        
        search: "",
        currentLat: "",
   currentLng: "",
       
    };
    

};

// extraction données
    setNom = (a) =>{
        this.state.Nom = a;
    }

    setDescription = (a) =>{
            this.state.Description = a;
    }
    setDateDeb = (a) =>{
        this.setState({ DateDeb : a})
    }
    setDateFin = (a) =>{
      this.setState({ DateFin : a})
    }
    setTimeDeb1 = (a) =>{
      this.setState({TimeDeb1: a});
      Alert(a);
    }
    setTimeFin = (a) =>{
        this.setState({TimeFin : a});
        Alert(a);
    }
    // acces à google API
    getAddress(){
        //function to get address using current lat and lng
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.region.latitude+"," +this.state.region.longitude +"&key=AIzaSyAnNoReLkgZdFdUe_eQG-ZZZMQcdISFCgY" ).then((response) => response.json()).then((responseJson) => {
          console.log("ADDRESS GEOCODE is BACK!! => " +
        JSON.stringify(responseJson));
           this.setState(
             { address:         JSON.stringify(responseJson.results[0].formatted_address)
              .replace(/"/g, "")
             });
           });
        }

    setAdress=()=>{
        Api.getAddress(this.state.region.latitude,this.state.region.longitude).then((Data)=> {this.setState({ address:  Data})
            alert(Data)})
    }
 
    // ajouter event à la base
    AddEvent= ()=> {
        Api.submitCreateEvent(this.props.ID , this.state.Nom, this.state.Description,this.state.DateDeb ,this.state.TimeDeb ,this.state.DateFin,this.state.TimeFin,this.state.address).then((Data) =>{
          
  
            if (Data == "Event created successfully")
            {
              alert("Evènement créé avec succès");
              this.props.uploadImageOnS3(this.props.file, String(this.state.Nom).toLowerCase());
              this.props.navigation.navigate('Home', {refresh : true})
              
            }
            else 
            {
              alert("Erreur ou existe déja");
            }
          } )

    }
    // localisation du map
    getLocation= () => {
        return(
            new promise((resolve,reject)=>
            {navigator.geolocation.getCurrentPosition(
                (data)=>resolve(data.coords),
                (err)=>reject(err),
                
            );
            }
        )
        ) 
    }
    geocodeLocationByName = (locationName) => {
        return new Promise(
            (resolve, reject) => {
                Geocoder.from(locationName)
                    .then(json => {
                        const addressComponent = json.results[0].address_components[0];
                        resolve(addressComponent);
                        
                    })
                    .catch(error => reject(error));
            }
        );
    }
    // localisation initiale
    getInitialState() {
        getLocation().then(
            (data) => {
                console.log(data);
                this.setState({
                    region: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003
                    }
                });
            }
        );
    }

    getCoordsFromName(loc) {
        this.setState({
            region: {
                latitude: loc.lat,
                longitude: loc.lng,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003
            }
        });
    }

    onMapRegionChange(region) {
        this.setState({ region });
        
    }


    render() {
            return (
                <ScrollView>
                <View> 
                     <TextInput placeholder = 'Nom' onChangeText = {text => this.setNom(text)}/>
                     <TextInput style ={{height:80 }} placeholder = 'Description' onChangeText = {text => this.setDescription ( text)}/>
                    
                <Text>
                    Date début de l'évènement :
                </Text>
                <View style = {{flex : 0 , flexDirection : "row", marginBottom : 15}}>
                    
                <DatePicker
                     style={{width: 200}}
                    date={this.state.DateDeb}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2020-05-01"
                    maxDate="2025-10-01"
                    confirmBtnText="Confirmiii"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                      },
                      dateInput: {
                    marginLeft: 36
                      }
                    }}
                    onDateChange={(date) => this.setDateDeb(date)}
                    />
                       
                
                    
                    <TouchableOpacity  onPress= {()=> {this.setState({isDatePickerVisible1 :true}) }}>
                    <Text> {String(this.state.TimeDeb1)} </Text> 
                    <DateTimePickerModal
                        isVisible={this.state.isDatePickerVisible1}
                        mode="time"
                        onConfirm={(date) => {console.log(date); 
                          this.setState({TimeDeb1: date, isDatePickerVisible1: false})}}
                        onCancel = {  () => { this.setState({isDatePickerVisible1: false})} }
                    />
                         

                    </TouchableOpacity >

                    </View>
                    <Text>
                    Date fin de l'évènement :
                    </Text>
                    <View style = {{flex : 0 , flexDirection : "row", marginBottom : 15}}>
                     <DatePicker
                     style={{width: 200}}
                    date={this.state.DateFin}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2020-05-01"
                    maxDate="2025-10-01"
                    confirmBtnText="Confirmiii"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                      },
                      dateInput: {
                    marginLeft: 36
                      }
          // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setDateFin( date)}}
                    />
                     <TouchableOpacity  onPress= {()=> {this.setState({isDatePickerVisible2 :true}) }}>
                    <Text> {String(this.state.TimeFin)} </Text> 
                    <DateTimePickerModal
                        isVisible={this.state.isDatePickerVisible2}
                        mode="time"
                        format ="dd mmmm | hh:mm"
                        onConfirm={(time) => {console.log(time); 
                          this.setState({TimeFin: time, isDatePickerVisible2: false})}}
                        onCancel = {  () => { this.setState({isDatePickerVisible2: false})} }
                         />
                         

                    </TouchableOpacity >

                
                </View>
                </View>

                <View style ={{marginLeft : 90,marginRight: 90, marginBottom:20}}>
                <Button 
                    onPress={ this.props.pickImage}
                    color="#7a25ff"
                    title="ajouter photo de l'évènement"/>
                    </View>
                    
                <View style={{alignItems: 'center'}}>  
                {this.props.image && <Image source={{ uri: this.props.image }} style={{ marginBottom : 20 ,width: 200, height: 200 }} />}    
                </View>  


                <MapView        style={{flex: 1, height:300, width:360, alignContent:"center"}}
                provider={PROVIDER_GOOGLE}
                showsUserLocation ={true}
                initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421}}  
                onRegionChange={(reg)=> this.setState({region:reg })}
               
                >
                <MapView.Marker
                 coordinate={{ "latitude": this.state.region.latitude,   
                 "longitude": this.state.region.longitude }}
                      title={"Your Location"}
                      draggable ={true}
                      />
                
                </MapView>
                <View >
                       
                <GooglePlacesAutocomplete
                currentLocation={true}
                enableHighAccuracyLocation={true}
                listViewDisplayed={this.state.listViewDisplayed}
                autoFocus={true}
                ref={(c) => (this.state.searchText = c)}
                placeholder='Search'
                onPress={(data, details = null) => {
                    this.setState({
                        listViewDisplayed: false,
                        address: data.description,
                        currentLat: details.geometry.location.lat,
                        currentLng: details.geometry.location.lng,
                        region: {
                          latitudeDelta,
                          longitudeDelta,
                          latitude: details.geometry.location.lat,
                          longitude:details.geometry.location.lng,
                                },
                   });
                 this.state.searchText.setAddressText("");
                 this.getInitialState(this.state.region)
                     alert(data, details);
                     
                  }}
              returnKeyType={'search'}
                  fetchDetails={true}
      
                query={{
                 key: 'AIzaSyAnNoReLkgZdFdUe_eQG-ZZZMQcdISFCgY',
                  language: 'en',
                 types: 'geocode'
            }}
           />
</View>
                <TextInput
                onChangeText={(text) =>{ this.setState({ address: text });
                    
                    }}
                value={this.state.address}
                />
                <View style = {{flex : 0 , flexDirection : "column", marginTop : 15, marginBottom:10}}>
                    <View style ={{marginLeft : 90,marginRight: 90, marginBottom:20}}>
                <Button 
                    onPress={this.onAddLocation }
                    color="#7a25ff"
                    title="ajouter localisation"/>
                    </View>
                    <View style ={{marginTop : 15,marginLeft : 210,marginRight: 20}}>
                <Button 
                    onPress={ this.AddEvent}
                    color="#7a25ff"
                    title="ajouter évènement"/>
                    </View>
                    </View>
                
                </ScrollView>

            )
    }


}



function addEvent({route, navigation}){
    //alert (route.params.assoID);
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
  
    const uploadImageOnS3 = async (file,ID) => {
      const s3bucket = new S3({
        accessKeyId: 'AKIA2EWC25SSF42E5RZW',
        secretAccessKey: '697267055780',
        Bucket: 'image-nour-remind',
        signatureVersion: 'v4',
      });
   let contentType = 'image/jpeg';
      let contentDeposition = 'inline;filename="' + file.name + '"';
      console.log(file);
      const arrayBuffer = await fs.readAsStringAsync(file.uri,  {encoding : fs.EncodingType.Base64});
      Api.sendImage(ID, arrayBuffer, "EVENT","ID").then((Data) => {
        console.log(Data);
        
      })
      
    }

    return(
        <View>
           <Event image ={image} file={file} navigation={navigation} uploadImageOnS3={uploadImageOnS3} pickImage ={pickImage} ID={route.params.assoID}></Event>
           
       </View>)
   }

export default addEvent;
