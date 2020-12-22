import { StatusBar } from 'expo-status-bar';
import React , { Component, useState }  from 'react';
import { StyleSheet, Text, TextInput, View, Button} from 'react-native';
import Login from "./src/login"
import SignUp from "./src/signup"
import Dashboard from "./src/dashboard"

var forge = require('node-forge');
let message = "my secret message";

class MainContainer extends Component{
  

  constructor(props){
    super(props);

    //var rsa = forge.pki.rsa;
    
   // var keypair = rsa.generateKeyPair({bits: 512, e: 0x10001});
  

    this.state = {
      email : "",
      isLoggedIn : false,
      window : 0, 
      sessionToken : 0,
      key : 0,
      publicKey : 0,
      privateKey : 0,
    } ;

    //var encrypted = this.state.publicKey.encrypt(message);
    //alert(encrypted);
    //var decrypted = this.state.privateKey.decrypt(encrypted);


     
  }
  getLog = (log) => {
  
    let newState = this.state;
    newState = {isLoggedIn : log.log, window : log.window, email : String(log.email).toLowerCase()};
    this.setState(newState);
  }
  
  

  render () {

    if (this.state.window == 0 )
      return <Login getLog = {this.getLog.bind(this)} > </Login>;
  
    else if (this.state.window == 1 )
      return <SignUp  getLog = {this.getLog.bind(this)}  />

    else if( this.state.window == 2)
      return <Dashboard getLog = {this.getLog.bind(this)} email = {this.state.email} /> 
    }
    
}

export default function App() {

  return (
      <MainContainer/>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
