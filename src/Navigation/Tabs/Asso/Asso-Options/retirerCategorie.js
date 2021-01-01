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
        this.categories = [];
        this.updateCategory = this.updateCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        //this.props.assoID
        this.state = {
            items : [],
            selectedItems: [],
            memberCategory : [],
            categoryItems: [],
            categoryTextInput : "",
            Asso : this.props.Asso
        }
        this.updateCategory(this.props.assoID);
    }
    updateCategory = (assoID) => {
        console.log(assoID);
        Api.getAssoInfo(assoID).then((Data) =>{
            var result = [];
            var list = Object.keys(Data.Architecture);
            for (var i = 0 ; i<list.length;i++ ) 
                {
                    result.push({name : list[i]})
                }
            this.setState({Asso : Data});
            this.setState({categoryItems : result})
            this.categories = result;
        })
    }
    removeCategory = () => {

    }
    render () {
        return (
        <Fragment>
            <SearchableDropdown
                    onItemSelect={(item) => {this.setState({ memberCategory: item });}}
                    containerStyle={{ padding: 5 }}
                    onRemoveItem={(item, index) => {
                        const items = this.state.selectedItems.filter((sitem) => sitem.name !== item.name);
                        this.setState({ memberCategory: items });
                    }}
                    itemStyle={styles.SearchableDropdownStyleItem}
                    itemTextStyle={{ color: '#222' }}
                    itemsContainerStyle={{ maxHeight: 140 }}
                    items={this.state.categoryItems}
                    defaultIndex={2}
                    resetValue={false}
                    textInputProps={
                    {
                        placeholder: "Category",
                        underlineColorAndroid: "transparent",
                        style: {padding: 12,borderWidth: 1,borderColor: '#ccc',borderRadius: 5,},
                    }}
                    listProps={{nestedScrollEnabled: true,}}
                    />
                    
                    
                    <Button title= "Retirer une categorie" onPress =  {this.removeCategory}  />

        </Fragment>
        )       
        }
    }









function removeCategory({route, navigation}){

     return(
         <View>
            <EditWindow assoID = {route.params.assoID} Asso = {route.params.Asso}/>
        </View>)
    }

export default removeCategory;


const styles = StyleSheet.create({

    SearchableDropdownStyleItem : {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#ddd',
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 5,
        }

    
})