import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {TextInput, Button, Text, View,ScrollView, FlatList, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import {useState} from "react";
import Api from '../../../../../services/dataService'
import react, {Component, Fragment} from 'react';
import * as React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { StackRouter } from 'react-navigation';



class EditWindow extends Component{
    constructor(props)
    {
        super(props);
        this.addCategory = this.addCategory.bind(this);
        this.setCategoryTextInput = this.setCategoryTextInput.bind(this); 
        
        //this.props.assoID
        this.state = {
            categoryTextInput : "",
            Asso : this.props.Asso
        }
    }
    setCategoryTextInput = (text) =>{
        this.setState({categoryTextInput: text})
    }

    addCategory = () => {
        console.log(this.state.categoryTextInput);
        Api.addAssoCategory(this.state.categoryTextInput, this.props.assoID).then((Data) =>{
            if(Data == "Success"){
                alert("Catégorie ajoutée")
            }
            else{
                alert("Erreur ou existe déja");
            }
        }
        
        )
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                
                <TextInput style={styles.textStyle} placeholder= "Nom de Catégorie" onChangeText ={text => this.setCategoryTextInput(text)}/>
                <View style ={styles.buttonStyle}>
                <Button title= "Ajouter une Catégorie" 
                color="#7a25ff"
                onPress =  {this.addCategory} />
                </View>
            </View>
        )

    }
}





function addCategory({route, navigation}){

    let controller;
     return(
         <View>
            <EditWindow assoID = {route.params.assoID} Asso = {route.params.Asso}/>
        </View>)
    }

export default addCategory;


const styles = StyleSheet.create({

    mainContainer : {
        padding: 5,
        
        
        },
        buttonStyle :{
            alignItems : 'center',
            marginTop : 20,
            height:18
    
    
        },
        textStyle: {
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,}

    
})
