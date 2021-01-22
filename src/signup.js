import  { Component,Fragment } from "react";
import * as React from 'react';
import { StyleSheet, Image, TextInput, View, Button, ScrollView} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import Api from '../services/dataService'

var items = [{id: 1,name: "1ère année SUP'COM",}, { id: 2, name: "2ème année SUP'COM",},{id: 3,name: "3ème année SUP'COM",}]

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
        this.setPhone= this.setPhone.bind(this);

        this.state = {
            Email : "",
            password : "",
            nom : "",
            prenom : "",
            niveau : "",
            phone:"",
            textValue : "",
            selectedItems:[],
            touchable: false,
        };
        
    };

   // envoi des données à la base 
    onSignPress=() => {

        Api.submitSignup(this.state.Email, this.state.password, this.state.nom, this.state.prenom,
                        this.state.niveau,this.state.phone).then((Data) => 
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
    //fct du bouton return 
    onReturnPress = () => {
        this.props.getLog({log : false, window : 0});
    }

    // extraction des données
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
    setPhone = (a) => {
        this.state.phone = a;
        //bouton register désactivé tant que pas toutes les informations remplites
        if ((this.state.Email != "") &&(this.state.password != "" ) && (this.state.nom != "") 
        && (this.state.prenom != "") && (this.state.niveau != ""))
        {
            this.setState({touchable:true});
        }
    }

    render() {
     return (
         <ScrollView style={styles.mainContainer}  keyboardShouldPersistTaps = 'always' >
            

             <View style= {{flex :1}}>
              <View style= {styles.topBarreView}>  
            <View style ={styles.imageFond}>
             <Image 
                    source={require('../src/images/logo.png')} 
                    style={styles.image}
                 /> 
            </View>
              </View> 
              <View style ={{marginTop:100}}>   
            
             <TextInput style = {styles.LoginTextBox} placeholder = 'Email' onChangeText = {text => this.setEmail(text)}/>
             
             <TextInput style = {styles.LoginTextBox} placeholder = 'Password' onChangeText = {text => this.setPassword(text)} />
             
             <TextInput style = {styles.LoginTextBox} placeholder = 'Nom' onChangeText = {text => this.setNom(text)} />
             
             <TextInput style = {styles.LoginTextBox} placeholder = 'Prenom' onChangeText = {text => this.setPrenom(text)} />
             
            
             <SearchableDropdown
            onItemSelect={(item) => {
              this.setState ({niveau:item.id}); 
                         
            }}
            onRemoveItem={(item, index) => {
                const items = this.state.selectedItems.filter((sitem) => sitem.name !== item.name);
                this.setState({ niveau: items.id });
            }}
            itemStyle={styles.SearchableDropdownStyleItem}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={items}
            defaultIndex={2}
            resetValue={false}
            textInputProps={
              {
                placeholder: this.state.placeholder,
                underlineColorAndroid: "transparent",
                style: styles.LoginTextBox,
              }
            }
            listProps={{ nestedScrollEnabled: false }}

        />

             <TextInput style = {styles.LoginTextBox} placeholder = 'Phone' onChangeText = {text => this.setPhone(text)} />

             

             <View style={{margin:7}} />
            <View style = {styles.buttonStyle}>
             <Button 
                color="#7a25ff"  
                onPress={ this.onSignPress}
                title="Register"
                disabled = {!this.state.touchable}
            />
            </View>
            <View style = {styles.buttonStyle}>
            <Button 
            color="#7a25ff"
             onPress ={this.onReturnPress} 
            title="Return" />
            </View>
            </View>
            </View>  
         </ScrollView>
     )
 }
}


const styles = StyleSheet.create(
    {
        mainContainer:{
            flex:1,


        },

        LoginTextBox : {

                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
                marginTop :8,
                marginBottom :8,
                marginLeft:20,
                marginRight:20,
            },
    
        buttonStyle: {
            marginLeft : 110,
            marginRight: 110,
            marginBottom : 10,
            marginBottom : 10
        },

    image : {
        width: 120,
        height: 120,
        marginLeft: "30%",
        marginRight: "30%", 
        marginBottom:"5%",
        marginTop:10,
        borderRadius: 60,
    },
    imageFond:{
        width: 140,
        height: 140,
        marginLeft: "30%",
        marginRight: "30%", 
        marginBottom:"5%",
        borderRadius: 70,
        backgroundColor:"#ffffff",
        alignItems:'center'

    },
    SearchableDropdownStyleItem : {
        padding: 10,
        marginTop: 2,
        backgroundColor: '#ddd',
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft:20,
        marginRight:20,

        },
        topBarreView :{
            backgroundColor:"#0d1440",
            shadowRadius :50,
            height:60,
        }
    }
)