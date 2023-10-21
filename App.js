import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "./views/Login";
import Register from "./views/Register";
import Prueba from "./views/Prueba";
import Proyectos from "./views/Proyectos";
import NuevoProyecto from "./views/NuevoProyecto";
import { setContext } from "apollo-link-context";


import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev"; 

if (__DEV__) {  
  loadDevMessages();
  loadErrorMessages();
}

const httpLink = createHttpLink({
  uri: "http://192.168.100.10:4000/"
})

const authLink = setContext(async(_,{headers})=>{
  const token = await AsyncStorage.getItem('token')
  console.log("antes de ser enviado",token)

  return{
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink) ,
  cache: new InMemoryCache(),
});
const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Proyectos" component={Proyectos} />
          <Stack.Screen name="NuevoProyecto" component={NuevoProyecto} />

        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
    </ApolloProvider>
  );
}
