import React from "react";
import { StyleSheet, Text, View, StatusBar} from "react-native";
import { AppLoading } from "expo";
import { useFonts, Roboto_400Regular,Roboto_500Medium } from "@expo-google-fonts/roboto";
import Routes from "./src/routes";
import { Provider as PaperProvider,DefaultTheme } from "react-native-paper";

const theme={
  ...DefaultTheme,
}
export default function App() {
  let [fontsLoaded] = useFonts({ Roboto_400Regular,Roboto_500Medium });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <PaperProvider>
      <StatusBar barStyle="light-content" backgroundColor={DefaultTheme.colors.primary} />
      
      <Routes />
      
    </PaperProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
// });
