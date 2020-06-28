import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  TextInput,
  Appbar,
  Surface,
  Title,
  Paragraph,
  Button,
} from "react-native-paper";
import api from "../../services/API";
const NovoUsuario = () => {
  const navigation = useNavigation();
  const [Nome, setNome] = useState("");
  const [Email, setEmail] = useState("");
  const [Usuario, setUsuario] = useState("");
  const [Senha, setSenha] = useState("");
  const [Loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  function handleNovoUsuario() {
    setLoading(true);

    api
      .post("/Alunos", {
        Nome,
        Email,
        Observacoes: null,
        Login: { Usuario, Senha },
      })
      .then((response) => {
        Alert.alert("Conta criada!", "Faça login e aproveite!");
        setLoading(false);
        navigation.goBack();
      })
      .catch((error) => {
        setErro(error.toString());
      });
  }
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : undefined}
      >
        <Appbar>
          <Appbar.Action
            icon="chevron-left"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </Appbar>

        <View style={styles.body}>
          <View style={styles.Titulo}>
            <Title>Crie sua conta!</Title>
          </View>
          <View style={styles.FormLogin}>
            <TextInput
              style={styles.inputForm}
              label="Nome completo"
              mode="outlined"
              onChangeText={setNome}
            />
            <TextInput
              style={styles.inputForm}
              label="E-mail"
              mode="outlined"
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.inputForm}
              label="Login"
              mode="outlined"
              onChangeText={setUsuario}
            />
            <TextInput
              style={styles.inputForm}
              label="Senha"
              mode="outlined"
              secureTextEntry
              onChangeText={setSenha}
            />
            <Button
              icon="plus-box"
              mode="contained"
              onPress={handleNovoUsuario}
            >
              Cadastrar-se
            </Button>
            <Text style={{color:'#A00'}}>{erro}</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 42,
  },
  Titulo: {
    flex: 1,
  },
  FormLogin: {
    flex: 5,
  },
  inputForm: {
    marginBottom: 8,
  },
});
export default NovoUsuario;
