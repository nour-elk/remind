
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import AssoDetail from "./detail"
import AssoScreen from "./mainWindow"
import AddAssos from "./creation"
import addMember from "./Asso-Options/ajouterMembre"
import addCategory from "./Asso-Options/ajouterCategorie"
import removeMember from "./Asso-Options/retirerMembre"
import removeCategory from "./Asso-Options/retirerCategorie"
import addEvent from "./Asso-Options/ajouterEvent"
import HomeStackScreen from "../Home/HomeStack"

const AssoStack = createStackNavigator();

function AssoStackScreen( {route, navigation}) {
  return (
    <AssoStack.Navigator>
        <AssoStack.Screen name= "main"  options={{ headerShown: false }} initialParams={{ mail: route.params.mail, refresh : true}} component = {AssoScreen} />
        <AssoStack.Screen name = "Créer votre club" component = {AddAssos}/>
        <AssoStack.Screen name = "detail" component= {AssoDetail} initialParams={{refresh : true}} options={{headerShown : false}}/>
        <AssoStack.Screen name = "Ajouter Membre" component = {addMember}/>
        <AssoStack.Screen name = "Ajouter Catégorie" component = {addCategory}/>
        <AssoStack.Screen name = "Virer Membre" component = {removeMember}/>
        <AssoStack.Screen name = "Retirer Catégorie" component = {removeCategory}/>
        <AssoStack.Screen name = "Ajouter évènement" component = {addEvent} initialParams={{ mail: route.params.mail}}/> 
        <AssoStack.Screen name="Home" component={HomeStackScreen} initialParams={{ mail: route.params.mail , refresh : true}} options={{headerShown : false}} />  
    </AssoStack.Navigator>
  );
}

export default AssoStackScreen;