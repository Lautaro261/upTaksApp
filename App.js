import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";
import Login from './view/Login';
import Registro from './view/Registro';

const Stack = createStackNavigator();


const App = ()=> {

  return (
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen 
        name="Login"
        component={Login}
        options={{
          title:"Iniciar Sesión",
          headerShown: false /* se quita la barra superior */
        }}
        />

          <Stack.Screen 
        name="Registro"
        component={Registro}
        options={{
          title:"Registro",
          headerShown: false /* se quita la barra superior */
        }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
    </>
    
  );
}

const styles = StyleSheet.create({
  
});


export default App