import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./Pages/Home";
import Perfil from "./Pages/Perfil";
import Grupo from "./Pages/Grupo";
import CriarGrupo from "./Pages/CriarGrupo";
import Login from "./Pages/Login";
import NovoUsuario from "./Pages/NovoUsuario";
import Busca from './Pages/Busca'

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
        <Stack.Screen name='Perfil' component={Perfil}/>
        <Stack.Screen name='Grupo' component={Grupo}/>
        <Stack.Screen name='CriarGrupo' component={CriarGrupo}/>
        <Stack.Screen name='Busca' component={Busca}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;
