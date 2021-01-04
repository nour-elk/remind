import { NavigationContainer } from '@react-navigation/native';
import {TextInput, Button, Text, View,ScrollView, FlatList, Alert, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DropDownPicker from 'react-native-dropdown-picker';
import react, {Component, Fragment} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import * as React from 'react';


import HomeScreen from './mainWindow'
import secondaryHomeScreen from './secondary'
import EventDetail from './details'

class Home extends Component{

    constructor(props){
        super(props)
    this.state = {
        eventType: '0'
    }
}
    render ()
    {
        return(
    <DropDownPicker
        items={[
            {label: 'Tous les évènements', value: '0', icon: () => <Icon name="bookmark" size={18} color="#900" />, hidden: true},
            {label: 'Favoris', value: '1', icon: () => <Icon name="star" size={18} color="#900" />},
           
        ]}
        defaultValue={this.state.eventType}
        containerStyle={{height: 40}}
        style={{backgroundColor: '#fafafa'}}
        itemStyle={{
            justifyContent: 'flex-start'
        }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        onChangeItem={item => {this.setState({
            eventType: item.value,
        })
        if (item.value=='1')
            this.props.navigation.navigate("Favoris")
            else
            if (item.value=='0')
            this.props.navigation.navigate("TousEvent")

    }

    }
    />)
}
}


const HomeStack = createStackNavigator(); 
function HomeStackScreen({route,navigation}) {
  return (
    <View style={{ flex: 1}}> 
    <View  style={{ flex: 1}}>
    <TouchableOpacity  style = {{  borderLeftWidth:1, borderLeftColor :"#c2c2c2", flex : 1, backgroundColor : "white"}}>
   <View style={{ marginTop: 30 , flex: 0,flexDirection: 'row',borderBottomColor: 'black',borderBottomWidth: 1,height : 32.2}}>
     <Text style= {{fontSize : 20}}>Home</Text>
   </View>
   </TouchableOpacity>
   </View>
   <View style={{ flex: 1, marginTop:80,marginBottom:40, marginLeft:165}}> 
             <Home navigation={navigation}/>
             </View>  
            
            
    <View style={{ flex: 10000, justifyContent:"flex-start"}}> 
    <HomeStack.Navigator >
      <HomeStack.Screen name= "TousEvent"  options={{ headerShown: false }} initialParams={{ mail: route.params.mail , refresh : true}} component = {HomeScreen}/>
      <HomeStack.Screen name= "Favoris"  options={{ headerShown: false }} component = {secondaryHomeScreen}/>
      <HomeStack.Screen name = "details" component= {EventDetail} options={{headerShown : false}}/>
    </HomeStack.Navigator>
    </View>
    </View>
  );
}

export default HomeStackScreen;
