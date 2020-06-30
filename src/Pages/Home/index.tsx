import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  AsyncStorage,
  FlatList,
  Text,
  SafeAreaView,
} from "react-native";
import {
  Appbar,
  Title,
  Paragraph,
  Card,
  Surface,
  Button,
  IconButton,
  Avatar,
  Divider,
  Portal,
  FAB,
} from "react-native-paper";
import api from "../../services/API";

import { useNavigation, useRoute } from "@react-navigation/native";

interface Grupo {
  CriadoEm: Date;
  Descricao: string;
  _id: string;
  DataEncontro: Date;
  Titulo: string;
  Participantes: string[];
}

const Home = () => {
  const [userGroups, setUserGroups] = useState<Grupo[]>();
  const [GroupsWUser, setGroupsWUser] = useState<Grupo[]>();
  const [fabAberto, setFabAberto] = useState(false);
  const navigation = useNavigation();
  function handleLogout() {
    AsyncStorage.clear();
    navigation.goBack();
  }

  useEffect(() => {
    AsyncStorage.getItem("@userid").then((item) => {
      api.get(`/Grupos?Criador=${item}`).then((response) => {
        setUserGroups(response.data);
      });
    });
  }, []);
  useEffect(() => {
    AsyncStorage.getItem("@userid").then((item) => {
      api.get(`/Grupos?Participante=${item}`).then((response) => {
        setGroupsWUser(response.data);
      });
    });
  }, []);
  function handleNavigateToGrupo(id:string){
    
    navigation.navigate('Grupo',{id})
  }
   function handleNavigatetoCriarGrupo(){
    navigation.navigate('CriarGrupo')
   }
   function handleNavigatetoBusca(){
    navigation.navigate('Busca')
   }
  return (
    <>
      <Appbar>
        <Appbar.Action icon="account-circle" />
        <Appbar.Content title="Home" />
        <Appbar.Action icon="logout" onPress={handleLogout} />
      </Appbar>

      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
        <Title style={styles.title}>Grupos que você participa</Title>

        <FlatList
          data={GroupsWUser}
          style={{ flex: 1 }}
          renderItem={(item) => (
            <Card style={styles.card}
            onPress={()=>{handleNavigateToGrupo(item.item._id)}}>
              <Card.Title title={item.item.Titulo} />
              <Card.Content>
                <Text numberOfLines={2}>{item.item.Descricao}</Text>
                <Text>Participantes: {item.item.Participantes.length}</Text>
              </Card.Content>
            </Card>
          )}
          keyExtractor={(item) => item._id}
          horizontal
        />
        <Title style={styles.title}>Grupos que você gerencia</Title>

        <FlatList
          data={userGroups}
          style={{ flex: 1 }}
          renderItem={(item) => (
            <Card style={styles.card}
            onPress={()=>{handleNavigateToGrupo(item.item._id)}}>
              <Card.Title title={item.item.Titulo} />
              <Card.Content>
                <Text numberOfLines={2}>{item.item.Descricao}</Text>
                <Text>Participantes: {item.item.Participantes.length}</Text>
              </Card.Content>
            </Card>
          )}
          keyExtractor={(item) => item.Titulo}
          horizontal
        />
        
          <FAB.Group
            open={fabAberto}
            icon="plus"
            actions={[
              { icon: "magnify", label: "Procurar Grupos", onPress: handleNavigatetoBusca },
              { icon: "account-multiple-plus", label: "Criar Grupo", onPress: handleNavigatetoCriarGrupo }

            ]}
          onStateChange={(open)=>{setFabAberto(open.open)}}
          visible={true}/>
        
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    width: 200,
    height: 150,
  },
  title: {
    paddingTop: 5,
  },
});
export default Home;
