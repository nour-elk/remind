
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import AssoDetail from "./detail"
import AssoScreen from "./mainWindow"
import AddAssos from "./creation"
import EditAsso from "./EditAsso"
import addMember from "./Asso-Options/ajouterMembre"
import addCategory from "./Asso-Options/ajouterCategorie"
import removeMember from "./Asso-Options/retirerMembre"
import removeCategory from "./Asso-Options/retirerCategorie"
import addEvent from "./Asso-Options/ajouterEvent"

const AssoStack = createStackNavigator();

function AssoStackScreen( {route, navigation}) {
  return (
    <AssoStack.Navigator>
        <AssoStack.Screen name= "main"  options={{ headerShown: false }} initialParams={{ mail: route.params.mail, refresh : true}} component = {AssoScreen} />
        <AssoStack.Screen name = "creation" component = {AddAssos}/>
        <AssoStack.Screen name = "detail" component= {AssoDetail} options={{headerShown : false}}/>
        <AssoStack.Screen name = "editAsso" component = {EditAsso}/>
        <AssoStack.Screen name = "addMember" component = {addMember}/>
        <AssoStack.Screen name = "addCategory" component = {addCategory}/>
        <AssoStack.Screen name = "remomveMember" component = {removeMember}/>
        <AssoStack.Screen name = "removeCategory" component = {removeCategory}/>
        <AssoStack.Screen name = "addEvent" component = {addEvent}/> 
    </AssoStack.Navigator>
  );
}

export default AssoStackScreen;