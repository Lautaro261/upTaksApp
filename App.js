import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./views/Login";
import Register from "./views/Register";
import Prueba from "./views/Prueba";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';


import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev"; 

if (__DEV__) {  
  loadDevMessages();
  loadErrorMessages();
}

const client = new ApolloClient({
  uri: 'http://192.168.100.10:4000/',
  cache: new InMemoryCache(),
  credentials: 'include'
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

        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
    </ApolloProvider>
  );
}
