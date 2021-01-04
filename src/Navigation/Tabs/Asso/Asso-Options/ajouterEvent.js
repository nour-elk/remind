import {TextInput, Button, Text, View,ScrollView, FlatList, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import * as React from 'react';
import react, {Component, Fragment} from 'react';
import DatePicker from 'react-native-datepicker';
//import DateTimePicker from '@react-native-community/datetimepicker';
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

//Localisation.requestAuthorization();
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
    onAddLocation= ()=>{}
    
    AddEvent= ()=> {
        Api.submitCreateEvent(this.props.ID , this.state.Nom, this.state.Description,this.state.DateDeb ,this.state.TimeDeb ,this.state.DateFin,this.state.TimeFin).then((Data) =>{
          
  
            if (Data == "Event created successfully")
            {
              alert("Event created successfully");
              
            }
            else 
            {
              alert("Error or already exists");
            }
          } )
    }

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
                    title="add localisation"/>
                    </View>
                    <View style ={{marginTop : 15,marginLeft : 210,marginRight: 20}}>
                <Button 
                    onPress={ this.AddEvent}
                    title="add event"/>
                    </View>
                    </View>
                
                </ScrollView>

            )
    }


}



function addEvent({route, navigation}){
    //alert (route.params.assoID);

    return(
        <View>
           <Event ID={route.params.assoID}></Event>
           
       </View>)
   }

export default addEvent;
