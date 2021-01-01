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
        this.updateSearch= this.updateSearch.bind(this); 
        this.updateCategory = this.updateCategory.bind(this);
        this.updateCategoryItem = this.updateCategoryItem.bind(this);
        this.removeMemberCategory = this.removeMemberCategory.bind(this);
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
            this.categories = result;
        })
    }

    updateCategoryItem = () =>{
        var keptKeys = []
        console.log("heli")
        console.log(this.state.Asso)
        console.log("heli2")
        console.log(this.categories)
        for(var i=0; i < this.categories.length ;i++){
            
            if(this.state.Asso.Architecture[this.categories[i].name].includes( this.state.selectedMemberToRemove.Email.toLowerCase() )){
                keptKeys.push(this.categories[i]);
            }
        }
        this.setState({categoryItems : keptKeys});
    }
    removeMemberCategory = () => {
        console.log(this.props.assoID)
        try{
        Api.RemoveMember(this.state.selectedMemberToRemove.Email, this.state.selectedCategoryMemberToRemove.name,this.props.assoID , this.state.categoryItems.length).then((Data) => {
            if(Data == "Success") {
                alert("Member removed successfully")
                this.setState({selectedCategoryMemberToRemove : ""})
                this.updateCategory(this.props.assoID);}
            else{
                alert("Failed");
            }
        })
        }
        catch(e){
            alert("Failed due to error");
        }
         
    }
    render(){
        return(
            <Fragment>
                <Text> Remove member </Text>
                <SearchableDropdown
                    onItemSelect={(item) => {this.setState({ selectedMemberToRemove: item });
                                            this.updateCategoryItem()}}
                    containerStyle={{ padding: 5 }}
                    onRemoveItem={(item, index) => {
                        const items = this.state.selectedItems.filter((sitem) => sitem.Email !== item.Email);
                        this.setState({ selectedMemberToRemove: [] });
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
                    setSort={(item, searchedText)=> item.NP.toLowerCase().includes(searchedText.toLowerCase())&& item.ASSO.includes(this.props.assoID) }
                    />
                    
                    <SearchableDropdown
                    onItemSelect={(item) => {this.setState({ selectedCategoryMemberToRemove: item });}}
                    containerStyle={{ padding: 5 }}
                    onRemoveItem={(item, index) => {
                        const items = this.state.selectedItems.filter((sitem) => sitem.name !== item.name);
                        this.setState({ selectedCategoryMemberToRemove: ""});
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
                    setSort={(item, searchedText)=>  item.name.toLowerCase().includes(searchedText.toLowerCase())}
                    />
                    
                    
                    <Button title= "Virer un membre" onPress =  {this.removeMemberCategory}  />

            </Fragment>
        )
    }
}






function removeMember({route, navigation}){

    let controller;
     return(
         <View>
            <EditWindow assoID = {route.params.assoID} Asso = {route.params.Asso}/>
        </View>)
    }

export default removeMember;


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