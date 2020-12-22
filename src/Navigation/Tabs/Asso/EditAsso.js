import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {TextInput, Button, Text, View, FlatList, Alert, TouchableOpacity } from 'react-native';
import {useState} from "react";
import Api from '../../../../services/dataService'
import react, {Component, Fragment} from 'react';
import * as React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { StackRouter } from 'react-navigation';




class EditWindow extends Component{
    constructor(props)
    {
        super(props);
        this.updateSearch= this.updateSearch.bind(this); 
        this.updateCategory = this.updateCategory.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.setCategoryTextInput = this.setCategoryTextInput.bind(this); 
        this.addMember = this.addMember.bind(this);
        //this.props.assoID
        this.state = {
            items : [],
            selectedItems: null,
            memberCategory : null,
            
            categoryItems : [],
            selectedCategoryItems : null,

            categoryTextInput : ""
          }

        this.updateCategory(this.props.assoID);
    }
    updateSearch = (Search) => {
        if(Search.length > 2){
            Api.getUsers(Search).then((Data) =>{
                var improvedItems = []
                for(var i = 0; i < Data.Items.length; i++)
                    {
                        improvedItems.push(Object.assign({},Data.Items[i], {name: Data.Items[i].NP})) 
                    }
                this.setState({items : improvedItems})
    })}}

    updateCategory = (assoID) => {
        Api.getAssoInfo(assoID).then((Data) =>{
            var result = [];
            var list = Object.keys(Data.Architecture);
            for (var i = 0 ; i<list.length;i++ ) 
                {
                    result.push({name : list[i]})
                }
                console.log("heelo");
                console.log(result);
                

            //some work
            this.setState({categoryItems : result})
        })
    }
    addCategory = () => {
        console.log(this.state.categoryTextInput);
        Api.addAssoCategory(this.state.categoryTextInput, this.props.assoID).then((Data) =>{
            if(Data == "Success"){
                alert("successefully added category")
                this.updateCategory(this.props.assoID);
            }
        }
        
        )
    }
    setCategoryTextInput = (text) =>{
        this.setState({categoryTextInput: text})
    }

    addMember = () =>{
        Api.AddMemberToAsso(this.state.selectedItems.Email, this.state.memberCategory.name, this.props.assoID).then( (Data) => {
        });
        
    }
    render(){
        return(
            <Fragment >
                <Text> Add Member </Text>
                <SearchableDropdown
                    onItemSelect={(item) => {
                    alert(JSON.stringify(item))
                    this.setState({ selectedItems: item });
                    }}
                    containerStyle={{ padding: 5 }}
                    onRemoveItem={(item, index) => {
                    const items = this.state.selectedItems.filter((sitem) => sitem.Email !== item.Email);
                    this.setState({ selectedItems: items });
                    }}
                    itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#ddd',
                    borderColor: '#bbb',
                    borderWidth: 1,
                    borderRadius: 5,
                    }}
                    itemTextStyle={{ color: '#222' }}
                    itemsContainerStyle={{ maxHeight: 140 }}
                    items={this.state.items}
                    defaultIndex={2}
                    resetValue={false}
                    textInputProps={
                    {
                        placeholder: "placeholder",
                        underlineColorAndroid: "transparent",
                        style: {
                            padding: 12,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 5,
                        },
                        onTextChange:  text => {this.updateSearch(text)}
                    }
                    }
                    listProps={
                    {
                        nestedScrollEnabled: true,
                    }
                    }
                    setSort={(item, searchedText)=> item.NP.toLowerCase().includes(searchedText.toLowerCase())}
                />

            <SearchableDropdown
                onItemSelect={(item) => {

                alert(JSON.stringify(item))
                this.setState({ memberCategory: item });

                }}
                containerStyle={{ padding: 5 }}
                onRemoveItem={(item, index) => {
                const items = this.state.selectedItems.filter((sitem) => sitem.name !== item.name);
                this.setState({ memberCategory: items });
                }}
                itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 140 }}
                items={this.state.categoryItems}
                defaultIndex={2}
                resetValue={false}
                textInputProps={
                {
                    placeholder: "placeholder",
                    underlineColorAndroid: "transparent",
                    style: {
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                    },
                    //onTextChange:  text => {this.updateSearch(text)}
                }
                }
                listProps={
                {
                    nestedScrollEnabled: true,
                }
                }
                setSort={(item, searchedText)=> item.name.toLowerCase().includes(searchedText.toLowerCase())}
            />

            <View >
            



            
            </View>
            <Button title= "Ajouter membre" onPress = {this.addMember}/>
            
            

            <Text> Add Category </Text>
            <TextInput placeholder= "Category name" onChangeText ={text => this.setCategoryTextInput(text)}/>
            <Button title= "Ajouter une Categorie" onPress =  {this.addCategory} />



        </Fragment>
        )
    }
}


function EditAsso({route, navigation}){

    let controller;
     return(
         <View>
            <EditWindow assoID = {route.params.assoID}/>
        </View>)
    }
export default EditAsso;