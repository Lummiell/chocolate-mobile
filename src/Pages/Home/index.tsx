import React from "react";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { View, StyleSheet, Text, AsyncStorage, ScrollView } from "react-native";
import {
  Appbar,
  Title,
  Paragraph,
  Card,
  Surface,
  Button,
  IconButton,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  function handleLogout() {
    AsyncStorage.clear();
    navigation.goBack();
  }
  return (
    <>
      <Appbar>
        <Appbar.Action
          style={styles.topright}
          icon="logout"
          onPress={handleLogout}
        />
      </Appbar>
      <View style={{ flexDirection: "row", 
      alignItems: "center",
      paddingTop:8
      }}>
        <Icon name="home" size={36} />
        <Title style={{ fontSize: 24 }}> Home</Title>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  topright: {
    flex: 1,
    position: "absolute",
    right: 0,
  },
});
export default Home;
