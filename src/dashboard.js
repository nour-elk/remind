import React, { Component } from "react";
import { StyleSheet,StatusBar, Text, TextInput, View, Button} from 'react-native';
import show from './Navigation/Navigation'


export default class Dashboard extends Component{
    constructor(props)
    {
        super(props)
        this.buttonPress = this.buttonPress.bind(this);
        this.email = this.props.email;
        
    }
    // fct du sign out
    buttonPress = () => {
        this.props.getLog( {log : false, window : 0, email : ""});
        
    }
    render() {
     return (
         <View style ={styles.container}>
        <View style ={styles.header} >
            <StatusBar backgroundColor='#43128f' barStyle ='light-content'/>
        </View>   
         <View style = {{flex : 1}}>
         {show(this.email,this.buttonPress)}
        
    </View>
    </View>
    
     )
 }
}

const styles = StyleSheet.create(
    {
        container   : {
            flex :1,
            
        },
        header :{
            
            backgroundColor :'#6018cf',
            
        }
    }
)