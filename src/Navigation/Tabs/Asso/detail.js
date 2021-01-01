import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MenuDrawer from 'react-native-side-drawer'
import PropTypes from 'prop-types';
import {TextInput, Button, Text, View, FlatList, Alert, TouchableOpacity,StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import {useState} from "react";
import Api from '../../../../services/dataService'
import react, {Component} from 'react';
import * as React from 'react';

const MyView = (props) => {
  const { children, hide, style } = props;
  if (hide) {
    return null;
  }
  return (
    <View {...this.props} style={style}>
      { children }
    </View>
  );
};





class AssoDetailC extends React.Component{
  constructor(props) {
    super(props);

    this.toggleOpen = this.toggleOpen.bind(this);
    this.drawerContent = this.drawerContent.bind(this);
    
    
    this.state = {
      open: false
    };
  }

   


 
  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };
//  </MyView>
      
   drawerContent = () => {
    return (
        
          <TouchableOpacity onPress={this.toggleOpen} style = {{  borderLeftWidth:1, borderLeftColor :"#c2c2c2", flex : 1, backgroundColor : "white"}}>
            <View style={{ marginTop: 30 , flex: 0,flexDirection: 'row',borderBottomColor: 'black',borderBottomWidth: 1,height : 32.2}}>
              <Text style= {{fontSize : 20}}>Options</Text>
            </View>

          
    <MyView hide ={!this.props.route.params.item.Admin.includes(this.props.route.params.mail)}>
          <TouchableOpacity onPress = {() => {this.props.navigation.navigate("addMember", {assoID : this.props.route.params.item.ID , Asso : this.props.route.params.item})}}
                            style = {{flex : 0 , flexDirection : "row", marginBottom : 15 }} >
            <View style = {{width : 10, height: 10}}/>
              <FeatherIcons name = "user-plus" size = {30}/>
            <Text style = {{fontSize: 20}}>  Ajouter membre</Text>
          </TouchableOpacity>
          

          <TouchableOpacity onPress = {() => {this.props.navigation.navigate("remomveMember", {assoID : this.props.route.params.item.ID , Asso : this.props.route.params.item})}}                             
                            style = {{flex : 0 , flexDirection : "row", marginBottom : 15}} >
            <View style = {{width : 10, height: 10}}/>
              <FeatherIcons name = "user-x" size = {30}/>
            <Text style = {{fontSize: 20}}>  Retirer membre</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => {this.props.navigation.navigate("addCategory", {assoID : this.props.route.params.item.ID , Asso : this.props.route.params.item})}}
                            style = {{flex : 0 , flexDirection : "row", marginBottom : 15}} >
            <View style = {{width : 10, height: 10}}/>
              <EntypoIcons name = "tag" size = {30}/>
            <Text style = {{fontSize: 20}}>  Ajouter catégorie</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => {this.props.navigation.navigate("removeCategory", {assoID : this.props.route.params.item.ID , Asso : this.props.route.params.item})}}
                            style = {{flex : 0 , flexDirection : "row", marginBottom : 15}} >
            <View style = {{width : 10, height: 10}}/>
              <EntypoIcons name = "untag" size = {30}/>
            <Text style = {{fontSize: 20}}>  Retirer categorie</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => {this.props.navigation.navigate("addEvent"),{}}}
                            style = {{flex : 0 , flexDirection : "row", marginBottom : 15}} >
            <View style = {{width : 10, height: 10}}/>
            <EntypoIcons name = "flag" size = {30}/>
            <Text style = {{fontSize: 20}}>  ajouter évènement </Text>
          </TouchableOpacity>



    </MyView>
          <TouchableOpacity style = {{flex : 0 , flexDirection : "row", marginBottom : 15}} >
            <View style = {{width : 10, height: 10}}/>
              <AntDesignIcons name = "close" size = {30}/>
            <Text style = {{fontSize: 20}}>  Quitter l'association</Text>
          </TouchableOpacity>
          
  
      </TouchableOpacity>
      
    );
  };

    render(){
    return (

    <MenuDrawer open={this.state.open} position = "right" drawerContent={this.drawerContent()} drawerPercentage={65} animationTime={250} overlay={true} opacity={0.4}>
      <View style={styles.mainContainer}>  
          <View style={styles.Header}>

              <View style = {styles.ButtonAdd}>
                <TouchableOpacity style = {{width : 40}} onPress={() => this.props.navigation.navigate('main')}>
                  <FeatherIcons name={"arrow-left"} size={30}/>
                </TouchableOpacity> 
              </View>
            

            <View style = {{flex: 1,  textAlignVertical: 'center'}}> 
              <Text style = {styles.textHeader}>{this.props.route.params.item.Nom}</Text> 
            </View>

                <View style = {styles.ButtonAdd}>
                  <TouchableOpacity onPress = {this.toggleOpen}>
                    <EvilIcons name = {"pencil"} size = {40}/>
                  </TouchableOpacity>
                </View>
          </View>
        
          <TouchableOpacity disabled ={!this.state.open} onPress={this.toggleOpen} style={styles.body}>
            <Text>{this.props.route.params.item.Nom}</Text>
            <Text>{this.props.route.params.item.Description}</Text>
            <Text>Members : </Text>
          </TouchableOpacity>
      </View>
    </MenuDrawer>

    )
    }
  }

/*


*/

function AssoDetail({route, navigation}){
  return (
    <AssoDetailC navigation = {navigation} route = {route}/>
  )
}

  export default AssoDetail;


  const styles = StyleSheet.create({
    mainContainer :{ 
      marginTop: 30,
      flex : 1,
    },
    Header : {
      flex: 0,
      flexDirection: 'row', 
      borderBottomColor: 'black',
      borderBottomWidth: 1,
    },
    textHeader :{
      flex : 1,
      fontWeight:"bold",
      fontSize: 20, 
      color:"black",
      height :20
    },
    ButtonAdd : {
      flex : 0,
    },
    animatedBox: {
      flex: 1,
      backgroundColor: "#38C8EC",
      padding: 10
    },
    body: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  })