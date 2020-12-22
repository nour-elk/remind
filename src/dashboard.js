import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Button} from 'react-native';
import show from './Navigation/Navigation'


export default class Dashboard extends Component{
    constructor(props)
    {
        super(props)
        this.buttonPress = this.buttonPress.bind(this);
        this.email = this.props.email;
        
    }

    buttonPress = () => {
        this.props.getLog( {log : false, window : 0, email : ""});
    }
    render() {
     return (
         <View style = {{flex : 1}}>
         {show(this.email)}
        <View style = {styles.buttonStyle}>
         <Button onPress = {this.buttonPress} style = {styles.buttonStyle}
            title="Sign out"
        />
        </View>
    </View>
    
     )
 }
}

const styles = StyleSheet.create(
    {
        container   : {
            flex :1,
            marginTop : 0.5,
        },
        buttonStyle: {
            marginLeft : 110,
            marginRight: 110
        }
    }
)