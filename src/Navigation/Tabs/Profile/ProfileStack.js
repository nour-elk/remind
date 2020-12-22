import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';


import ProfileScreen from './mainWindow'
import secondaryProfileScreen from './secondary'


const ProfileStack = createStackNavigator(); 
function ProfileStackScreen({route}) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name= "profile"  options={{ headerShown: false }} initialParams={{ mail: route.params.mail , refresh : true}} component = {ProfileScreen}/>
      <ProfileStack.Screen name= "Parametres"  component = {secondaryProfileScreen}/>
    </ProfileStack.Navigator>
  );
}

export default ProfileStackScreen;