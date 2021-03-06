import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {TextInput, Button, Text, View,ScrollView, FlatList, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import {useState} from "react";
import Api from '../../../../services/dataService'
import react, {Component, Fragment} from 'react';
import * as React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { StackRouter } from 'react-navigation';
import { SafeAreaView } from 'react-native-safe-area-context';




class EditWindow extends Component{
    constructor(props)
    {
        super(props);
        this.updateSearch= this.updateSearch.bind(this); 
        this.updateCategory = this.updateCategory.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.setCategoryTextInput = this.setCategoryTextInput.bind(this); 
        this.addMember = this.addMember.bind(this);
        this.removeMember = this.removeMember(this);
        
        //this.props.assoID
        this.state = {
            items : [],
            selectedItems: null,
            memberCategory : null,
            
            categoryItems : [],
            selectedCategoryItems : null,

            memberItems : [],
            selectedMemberToRemove : null,

            CategoryMemberRemoveItems : [],
            selectedCategoryMemberToRemove : [],
            categoryTextInput : "",

            Asso : this.props.Asso
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
                this.setState({items : improvedItems});
    })}}
    updateSearchRemove = (Search) => {
        if(Search.length > 2){
            Api.getUsers(Search).then((Data) =>{
                var improvedItems = []
                for(var i = 0; i < Data.Items.length; i++)
                    {
                        improvedItems.push(Object.assign({},Data.Items[i], {name: Data.Items[i].NP})) 
                    }
                this.setState({memberItems : improvedItems});
    })}}

    updateCategory = (assoID) => {
        Api.getAssoInfo(assoID).then((Data) =>{
            var result = [];
            var list = Object.keys(Data.Architecture);
            for (var i = 0 ; i<list.length;i++ ) 
                {
                    result.push({name : list[i]})
                }
            this.setState({categoryItems : result})
            this.setState({Asso : Data});
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

    removeMember = () => {

    }

    
    render(){
        return(
            
            <View style = {{flex :1}}>
                <ScrollView style = {{flex : 1}}>
                    <Text> Add Member </Text>
                    <View style = {{flex : 0}}>
                    <Fragment>
                <SafeAreaView style = {{flex : 1}}>
                    <SearchableDropdown
                    onItemSelect={(item) => {this.setState({ selectedItems: item });}}
                    containerStyle={{ padding: 5 }}
                    onRemoveItem={(item, index) => {
                        const items = this.state.selectedItems.filter((sitem) => sitem.Email !== item.Email);
                        this.setState({ selectedItems: items });
                    }}
                    itemStyle={ styles.SearchableDropdownStyleItem }
                    itemTextStyle={{ color: '#222' }}
                    itemsContainerStyle={{ maxHeight: 140 }}
                    items={this.state.items}
                    defaultIndex={2}
                    resetValue={false}
                    textInputProps={
                    {
                        placeholder: "Member",
                        underlineColorAndroid: "transparent",
                        style: {padding: 12,borderWidth: 1,borderColor: '#ccc',borderRadius: 5,},
                        onTextChange:  text => {this.updateSearch(text)}
                    }
                    }
                    listProps={{nestedScrollEnabled: true,}}
                    setSort={(item, searchedText)=> item.NP.toLowerCase().includes(searchedText.toLowerCase())}
                />

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
                    setSort={(item, searchedText)=> item.name.toLowerCase().includes(searchedText.toLowerCase())}
                    />
                </SafeAreaView>
                    </Fragment>
                    </View>
                    <View >
                



                
                    </View>
                    <Button title= "Ajouter membre" onPress = {this.addMember}/>
                
                    <Text> Add Category </Text>
                    <TextInput placeholder= "Category name" onChangeText ={text => this.setCategoryTextInput(text)}/>
                    <Button title= "Ajouter une Categorie" onPress =  {this.addCategory} />

                    <Text> Remove member </Text>
                    <SearchableDropdown
                    onItemSelect={(item) => {this.setState({ selectedMemberToRemove: item });}}
                    containerStyle={{ padding: 5 }}
                    onRemoveItem={(item, index) => {
                        const items = this.state.selectedItems.filter((sitem) => sitem.Email !== item.Email);
                        this.setState({ selectedMemberToRemove: null });
                    }}
                    itemStyle={ styles.SearchableDropdownStyleItem }
                    itemTextStyle={{ color: '#222' }}
                    itemsContainerStyle={{ maxHeight: 140 }}
                    items={this.state.memberItems}
                    defaultIndex={2}
                    resetValue={false}
                    textInputProps={
                    {
                        placeholder: "Member",
                        underlineColorAndroid: "transparent",
                        style: {padding: 12,borderWidth: 1,borderColor: '#ccc',borderRadius: 5,},
                        onTextChange:  text => {this.updateSearchRemove(text)}
                    }
                    }
                    listProps={{nestedScrollEnabled: true,}}
                    setSort={(item, searchedText)=> item.NP.toLowerCase().includes(searchedText.toLowerCase())&& item.ASSO.includes(this.props.assoID) }
                    />
                    
                    <SearchableDropdown
                    onItemSelect={(item) => {this.setState({ selectedCategoryMemberToRemove: item });}}
                    containerStyle={{ padding: 5 }}
                    onRemoveItem={(item, index) => {
                        const items = this.state.selectedItems.filter((sitem) => sitem.name !== item.name);
                        this.setState({ selectedCategoryMemberToRemove: null });
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
                    setSort={(item, searchedText)=> this.state.Asso.Architecture[item.name].includes(selectedMemberToRemove.Email)  && item.name.toLowerCase().includes(searchedText.toLowerCase())}
                    />
                    
                    
                    <Button title= "Virer un membre" onPress =  {this.removeMember} />



            </ScrollView>
        </View>
        
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
