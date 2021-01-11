
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';


import ProfileScreen from './mainWindow'
import SecondaryProfileScreen from './secondary'
import PhotoProfileScreen from './photoconfig'


const ProfileStack = createStackNavigator(); 
function ProfileStackScreen({route}) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name= "profile"  options={{ headerShown: false }} initialParams={{ mail: route.params.mail , refresh : true}} component = {ProfileScreen}/>
      <ProfileStack.Screen name= "Parametres" initialParams={{ mail: route.params.mail}} component = {SecondaryProfileScreen}/>
      <ProfileStack.Screen name ="photoParam" initialParams={{ mail: route.params.mail }}component ={PhotoProfileScreen}/>
    </ProfileStack.Navigator>
  );
}

export default ProfileStackScreen;