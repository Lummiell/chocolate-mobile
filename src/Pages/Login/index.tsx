import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  TextInput,
  Appbar,
  Surface,
  Title,
  Paragraph,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import api from "../../services/API";
const Login = () => {
  const navigation = useNavigation();
  const [Usuario, setUsuario] = useState("");
  const [Senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro,setErro] = useState('')
  function handleNovoUsuario() {
    navigation.navigate("NovoUsuario");
  }
  function handleLogin() {
      setErro('')
      
      setLoading(true)
      api.post("/Login/GerarToken", {  Usuario, Senha }).then(resposta=>{
          
        if (resposta.data.auth) {
            
            AsyncStorage.setItem('@token',resposta.data.token)
            AsyncStorage.setItem('@userid',resposta.data.userid)
            setLoading(false);
            navigation.navigate('Home')
          } else {
            setLoading(false);
            setErro("Erro de login. Verifique seus dados.");
          }
      })
      .catch(erro=>{
        setLoading(false);
        setErro("Erro de aplicação. " + erro.toString());
      })
    
  }
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : undefined}
      >
        <Appbar>
          <Appbar.Content title='Login'/>
        </Appbar>
        <View style={styles.body}>
          <View style={styles.Titulo}>
            <Title>Amigo chocolate!🍫</Title>
            <Paragraph>Pra você que é generoso ou não.</Paragraph>
          </View>
          <View style={styles.FormLogin}>
            <TextInput
              style={styles.inputForm}
              placeholder="Digite seu nome de usuário"
              label="Login"
              onChangeText={setUsuario}
              mode="outlined"
              autoCorrect={false}
              autoCapitalize={'none'}
            />
            <TextInput
              style={styles.inputForm}
              placeholder="Digite sua senha"
              label="Senha"
              mode="outlined"
              onChangeText={setSenha}
              secureTextEntry
              autoCorrect={false}
            />

            {loading ? (
              <ActivityIndicator animating={true} />
            ) : (<>
              <Button style={{marginBottom:10}} icon="login" mode="contained" onPress={handleLogin}>
                Entrar
              </Button>
              <Button icon="account-plus" mode="outlined" onPress={handleNovoUsuario}>
                Criar conta
              </Button>
             </> 
            )}
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
    flex: 2,
  },
  inputForm: {
    marginBottom: 8,
  },
  topright: {
    position: "absolute",
    right: 0,
  },
});

export default Login;
