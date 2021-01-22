
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';


import ProfileScreen from './mainWindow'
import SecondaryProfileScreen from './secondary'
import PhotoProfileScreen from './photoconfig'


const ProfileStack = createStackNavigator(); 
function ProfileStackScreen({route}) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name= "profile"  options={{ headerShown: false }} initialParams={{ mail: route.params.mail,getLog: route.params.getLog,  refresh : true}} component = {ProfileScreen}/>
      <ProfileStack.Screen name= "Paramètres" initialParams={{ mail: route.params.mail}} component = {SecondaryProfileScreen}/>
      <ProfileStack.Screen name ="Paramètres Photo" initialParams={{ mail: route.params.mail }}component ={PhotoProfileScreen}/>
    </ProfileStack.Navigator>
  );
}

export default ProfileStackScreen;