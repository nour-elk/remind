import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View, Button, Image} from 'react-native';
import Api from '../services/dataService'

export default class Login extends Component{
    constructor(props)
    {
        super(props)
        this.onSignPress=this.onSignPress.bind(this);
        this.onReturnPress= this.onReturnPress.bind(this); 
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setNom = this.setNom.bind(this);
        this.setPrenom = this.setPrenom.bind(this);
        this.setNiveau = this.setNiveau.bind(this);


        this.state = {
            Email : "",
            password : "",
            nom : "",
            prenom : "",
            niveau : "",

            textValue : ""
        };
    };


    onSignPress=() => {
        Api.submitSignup(this.state.Email, this.state.password, this.state.nom, this.state.prenom,
                        this.state.niveau).then((Data) => 
       {
        var resultat; 
        alert(JSON.stringify(Data) );
        if (Data == "User created successfully")
        {
            resultat = {log : false, window : 0, email : this.state.Email};
            this.props.getLog(resultat);
        }
        else
        {
            alert(JSON.stringify(Data));

        }
        
    });

    }
    onReturnPress = () => {
        this.props.getLog({log : false, window : 0});
    }
    setEmail = (a) =>{
        this.state.Email = a;
    }
    setPassword = (a) => {
        this.state.password= a;
    }
    setNom = (a) => {
        this.state.prenom = a;
    }
    setPrenom = (a) => {
        this.state.nom = a;
    }
    setNiveau = (a) => {
        this.state.niveau = a;
    }

    render() {
     return (
         <View style = {{flex : 1}}>
            
             <View style={styles.container} />
             <View style= {{flex :1}}>
            
             <TextInput style = {styles.LoginTextBox} placeholder = 'Email' onChangeText = {text => this.setEmail(text)}/>
             
             <TextInput style = {styles.LoginTextBox} placeholder = 'Password' onChangeText = {text => this.setPassword(text)} />
             
             <TextInput style = {styles.LoginTextBox} placeholder = 'Nom' onChangeText = {text => this.setNom(text)} />
             
             <TextInput style = {styles.LoginTextBox} placeholder = 'Prenom' onChangeText = {text => this.setPrenom(text)} />
             
             <TextInput style = {styles.LoginTextBox} placeholder = 'Niveau' onChangeText = {text => this.setNiveau(text)} />
             
             <View style={{margin:7}} />
            <View style = {styles.buttonStyle}>
             <Button   style = {{marginBottom : 10,
            marginBottom : 10}}
                onPress={ this.onSignPress}
                title="Register"
            />
            </View>
            <View style = {styles.buttonStyle}>
            <Button styles= {{marginBottom : 10,
            marginBottom : 10}}
             onPress ={this.onReturnPress} 
            title="Return" />
            </View>
            </View>
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