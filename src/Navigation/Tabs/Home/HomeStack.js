
import {TextInput, Button, Text, View,ScrollView, FlatList, Alert, TouchableOpacity , StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DropDownPicker from 'react-native-dropdown-picker';
import react, {Component, Fragment} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import * as React from 'react';


import HomeScreen from './mainWindow'
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
            {label: 'Tous les évènements', value: '0', icon: () => <Icon name="bookmark" size={18} color="#f38efa" />},
            
           
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
    <TouchableOpacity  style = {{ flex : 1}}>
   <View style={styles.Header}>
     <View > 
     <Text style= {styles.textHeader}>Home</Text>
     
   </View>
   </View>
   </TouchableOpacity>
  
   <View style={{ flex: 1, marginTop:70,marginBottom:40, marginLeft:180, marginRight:5}}> 
             <Home navigation={navigation}/>
             </View>  
            
            
    <View style={{ flex: 10000, justifyContent:"flex-start"}}> 
    <HomeStack.Navigator >
      <HomeStack.Screen name= "TousEvent"  options={{ headerShown: false }} initialParams={{ mail: route.params.mail , refresh : true}} component = {HomeScreen}/>
      <HomeStack.Screen name = "details" component= {EventDetail} options={{headerShown : false}}/>
    </HomeStack.Navigator>
    </View>
    </View>
    </View>
  );
}

export default HomeStackScreen;

const styles = StyleSheet.create({

    mainContainer :{ 
      
      flex : 1,
    },
  
    Header : {
      flex: 0,
      flexDirection: 'row', 
      borderBottomColor: 'white',
      borderBottomWidth: 2.5,
      backgroundColor : '#7a25ff',
      //backgroundColor : '#34458b',
      height:50,
      
    },
    textHeader :{
      flex : 1,
      fontWeight:"bold",
      fontSize: 20, 
      marginLeft:10,
      color:"#ffffff",
      height :20,
      alignContent:'center',
      textAlignVertical:'center'
    },
})
