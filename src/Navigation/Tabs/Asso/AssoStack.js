import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import AssoDetail from "./detail"
import AssoScreen from "./mainWindow"
import AddAssos from "./creation"
import EditAsso from "./EditAsso"

const AssoStack = createStackNavigator();

function AssoStackScreen( {route, navigation}) {
  return (
    <AssoStack.Navigator>
        <AssoStack.Screen name= "main"  options={{ headerShown: false }} initialParams={{ mail: route.params.mail, refresh : true}} component = {AssoScreen} />
        <AssoStack.Screen name = "creation" component = {AddAssos}/>
        <AssoStack.Screen name = "detail" component= {AssoDetail} options={({ route }) => ({ title: route.params.item.Nom })}/>
        <AssoStack.Screen name = "editAsso" component = {EditAsso}/>
    </AssoStack.Navigator>
  );
}

export default AssoStackScreen;