import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import NovoUsuario from "./Pages/NovoUsuario";

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" screenOptions={{
          cardStyle:{
              backgroundColor:'#f0f0f5'
          }
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="NovoUsuario" component={NovoUsuario} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;
