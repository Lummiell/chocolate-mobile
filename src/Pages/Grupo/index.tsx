import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, AsyncStorage, Alert } from "react-native";
import {
  Appbar,
  Subheading,
  Title,
  Paragraph,
  IconButton,
  Text,
  Caption,
  Button,
  Chip,
  ActivityIndicator,
} from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../services/API";
import { MaterialIcons as Icon } from "@expo/vector-icons";
interface Params {
  id: string;
}
interface Participante {
  _id: string;
  Nome: string;
}
interface Grupo {
  CriadoEm: Date;
  Descricao: string;
  Participantes: Participante[];
  _id: string;
  DataEncontro: Date;
  Titulo: string;
  ValorMin: Number;
  ValorMax: Number;
  Criador: Participante;
  Pares: { Remetente: Participante; Destinatario: Participante }[];
}

const Grupo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeparams = route.params as Params;
  const [Grupo, setGrupo] = useState<Grupo>({} as Grupo);
  const [carregando, setCarregando] = useState(true);
  const [participa, setparticipa] = useState(true);
  const [gerencia, setgerencia] = useState(false);
  function loadGrupo() {
    setCarregando(true);
    api.get(`/Grupos/${routeparams.id}`).then((response) => {
      setGrupo(response.data);
    });
  }

  useEffect(() => {
    setCarregando(true);
    api.get(`/Grupos/${routeparams.id}`).then((response) => {
      setGrupo(response.data);
    });
  }, []);

  useEffect(() => {
    if (Grupo.Participantes) {
      AsyncStorage.getItem("@userid").then((userid) => {
        if (Grupo.Participantes.length === 0) {
          setparticipa(false);
        } else {
          let usuarioparticipa = Grupo.Participantes.map(
            (item) => item._id
          ).includes(userid as string);
          setparticipa(usuarioparticipa);
        }
      });
    }
  }, [Grupo]);
  useEffect(() => {
    if (Grupo.Criador) {
      AsyncStorage.getItem("@userid").then((userid) => {
        let usuarioGerencia = Grupo.Criador._id === userid;
        setgerencia(usuarioGerencia);
        setCarregando(false);
      });
    }
  }, [Grupo, participa]);
  function handleParticipar() {
    AsyncStorage.getItem("@userid").then((userid) => {
      api
        .post(`/Grupos/${routeparams.id}/InserirParticipante`, {
          id: userid,
        })
        .then(() => {
          loadGrupo();
        });
    });
  }
  function handleSortear(){
    api.post(`/Grupos/${routeparams.id}/GerarPares`).then(() => {
      loadGrupo();
    });
  }
  function handleVerPar(){
    AsyncStorage.getItem('@userid').then((userid)=>{
      api.get(`/Grupos/${routeparams.id}/${userid}`).then(response=>{
      Alert.alert('Par',`O nome do seu par é ${response.data.Nome} `)
      })
    })
    
  }

  return (
    <>
      <Appbar>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Grupo" />
      </Appbar>
      <SafeAreaView style={styles.corpo}>
        {carregando ? (
          <>
            <ActivityIndicator style={{ paddingTop: 64 }} size="large" />
          </>
        ) : (
          <>
            <View style={styles.flexRow}>
              <Title style={{ flex: 2 }}>{Grupo.Titulo}</Title>
              {participa ? (
                <>
                  <View style={[styles.flexRow, { flex: 1 }]}>
                    <IconButton icon="check" style={{ flex: 1 }} />
                    <Caption style={{ flex: 3 }}>
                      Você participa desse grupo
                    </Caption>
                  </View>
                </>
              ) : (
                <>
                  {Grupo.Pares.length > 0 ? (
                    <>
                      <Caption style={{ flex: 1 }}>Grupo fechado</Caption>
                    </>
                  ) : (
                    <Button
                      style={{ flex: 1 }}
                      mode="contained"
                      icon="plus-box-outline"
                      onPress={handleParticipar}
                    >
                      Participar
                    </Button>
                  )}
                </>
              )}
            </View>
            <Subheading>
              Criado em {new Date(Grupo.CriadoEm).toLocaleDateString()} por{" "}
              {Grupo.Criador.Nome}
            </Subheading>
            <View style={[styles.flexRow, { paddingVertical: 8 }]}>
              <View style={{ flex: 1 }}>
                <Caption style={styles.flexRow}>
                  <Icon name="remove" />
                  Preço mínimo
                </Caption>
                <Subheading>R${Grupo.ValorMin}</Subheading>
              </View>
              <View style={{ flex: 1 }}>
                <Caption style={styles.flexRow}>
                  <Icon name="add" />
                  Preço máximo
                </Caption>
                <Subheading>R${Grupo.ValorMax}</Subheading>
              </View>
            </View>
            <View style={{ marginVertical: 8 }}>
              <Caption>Descrição</Caption>
              <Text>{Grupo.Descricao}</Text>
            </View>
            <View style={styles.flex}>
              <View style={{ flex: 2 }}>
                <Subheading>Lista de participantes</Subheading>
                <View style={styles.flexwrap}>
                  {Grupo.Participantes.map((item) => (
                    <Chip mode="outlined" key={item._id}>
                      {item.Nome}
                    </Chip>
                  ))}
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.flexRow}>
                  <IconButton icon="calendar" />
                  <Text>
                    {new Date(Grupo.DataEncontro).toLocaleDateString()}
                  </Text>
                </View>
                {Grupo.Participantes.length >= 3 ? (
                  <>
                    {Grupo.Pares.length > 0 ? (
                      <>
                        <View style={styles.flexRow}>
                          <IconButton
                            icon="check-circle-outline"
                            color="green"
                          />
                          <Text>Sorteado!</Text>
                        </View>
                        <Button mode='contained'onPress={handleVerPar} >Ver par</Button>
                      </>
                    ) : (
                      <>
                        <View style={styles.flexRow}>
                          <IconButton icon="clock-outline" />
                          <Text> Grupo aguardando sorteio</Text>
                        </View>
                        {gerencia ? (
                          <>
                            <Button mode='contained' icon="gift-outline" onPress={handleSortear}>
                              Sortear
                            </Button>
                          </>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <Text>
                      Esse grupo não tem participantes suficientes (3) para
                      realizar o sorteio de pares.
                    </Text>
                  </>
                )}
              </View>
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  corpo: {
    padding: 16,
    flex: 1,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flex: {
    flexDirection: "row",
  },
  flexwrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
export default Grupo;
