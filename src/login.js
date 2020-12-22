import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Button, Image} from 'react-native';
import Api from '../services/dataService'

export default class Login extends Component{
    constructor(props)
    {
        super(props)
        this.onLoginPress= this.onLoginPress.bind(this);
        this.onSignPress=this.onSignPress.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);


        this.state = {
            Email : "-",
            password : "-",
            textValue : ""
        };
    };

    onLoginPress = () => {
     Api.submitLogin(this.state.Email, this.state.password).then((Data) => 
       {
        var resultat ;  
        this.state.textValue = Data
        alert(JSON.stringify(Data) )
        if (Data == "Success")
        {
            resultat = {log: true, window : 2, email: this.state.Email};
        }
        else{
            resultat = {log: false, window : 0};
        }

        this.props.getLog(resultat);

       });
       
    }

    onSignPress=() => {
        this.props.getLog({log : false, window : 1, email : ""});
    }
    setEmail = (a) =>{
        this.state.Email = a;
    }
    setPassword = (a) => {
        this.state.password= a;
    }

    render() {
     return (
         <View style = {{flex : 1}}>
            
             <View style={styles.container} />
             <Image source={require('../src/images/logo.png')} 
                style={{  width: 130,
                    height: 130,
                    marginLeft: "30%",
                    marginRight: "30%", 
                    marginTop : "5%"}} />
             <View style = {{marginBottom : "30%"}} />
             <View style= {{flex :1}}>
            
             <TextInput style = {styles.LoginTextBox} placeholder = 'Email' onChangeText = {text => this.setEmail(text)}/>
             
             <TextInput style = {styles.LoginTextBox} placeholder = 'Password' onChangeText = {text => this.setPassword(text)} />
             
             <View style={{margin:7}} />
            <View style = {styles.buttonStyle}>
             <Button  style = {{marginBottom : 10,
            marginBottom : 10}}
                onPress={ this.onLoginPress}
                title="Log in"
            />
            </View>
            <View style = {styles.buttonStyle}>
            <Button style = {{marginBottom : 10,
            marginBottom : 10}}
             onPress ={this.onSignPress} 
            title="Sign up" />
            </View>
            </View>
            <Text> {this.state.textValue} </Text>
         </View>
     )
 }
}


const styles = StyleSheet.create(
    {
        container   : {
            marginTop: "15%"
            },
        LoginTextBox : {
            marginLeft: 30,
            marginRight: 30,
            height: 40,
            borderColor: '#000000',
            borderWidth: 0.5,
            paddingLeft: 5,
            marginBottom: 30

        },
        buttonStyle: {
            marginLeft : 110,
            marginRight: 110,
            marginBottom : 10,
            marginBottom : 10
        }
    }
)