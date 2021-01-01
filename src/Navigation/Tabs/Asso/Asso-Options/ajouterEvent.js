import {TextInput, Button, Text, View,ScrollView, FlatList, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import * as React from 'react';
import react, {Component, Fragment} from 'react';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';



class Event extends Component{

    constructor(props)
    {
        super(props)
        this.onAddPress=this.onAddPress.bind(this);
        this.setNom = this.setNom.bind(this);
        this.setDescription = this.setDescription.bind(this);  



    this.state = {
        Nom : "",
        DateDeb : "",
        TimeDeb :"",
        DateFin : "",
        TimeFin :"",
        Description : "",
        Localisation :"",
       
    };
};

//Localisation.requestAuthorization();
    setNom = (a) =>{
        this.state.Nom = a;
    }

    setDescription = (a) =>{
            this.state.Description = a;
    }

    onAddPress = () => {
        
    }
    onShowTimePicker = () => {
        
            <DateTimePicker
                      
                      value={this.state.TimeDeb}
                      placeholder="select time"

                      mode="time"
                      is24Hour={true}
                      display="default"
                      onChange={(value) => {this.setState({TimeDeb: value})}}
                        />

    
                       
    }

    render() {
            return (

                <View> 
                     <TextInput placeholder = 'Nom' onChangeText = {text => this.setNom(text)}/>
                     <TextInput placeholder = 'Description' onChangeText = {text => this.setDescription(text)}/>
                    
                <Text>
                    Date début de l'évènement :
                </Text>
                <View style = {{flex : 0 , flexDirection : "column", marginBottom : 15}}>
                    
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
                    onDateChange={(date) => {this.setState({DateDeb: date})}}
                    />
                    
                    

                    </View>
                    <Text>
                    Date fin de l'évènement :
                    </Text>
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
                    onDateChange={(date) => {this.setState({DateFin: date})}}
                    />

                <Button 
                    onPress={ this.onAddPress}
                    title="add"/>
                </View>

            )
    }


}



function addEvent({route, navigation}){

    return(
        <View>
           <Event></Event>
           
       </View>)
   }

export default addEvent;
