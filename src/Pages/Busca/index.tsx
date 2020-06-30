import React, { useState, useEffect } from 'react'
import { View, SafeAreaView, StyleSheet, Text } from 'react-native'
import { Appbar, Searchbar, ActivityIndicator, Card } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { FlatList } from 'react-native-gesture-handler';
import api from '../../services/API';
interface Grupo{
    _id:string,
    Titulo:string,
    Descricao:string,
    DataEncontro:Date
}
const Busca = () =>{
    const navigation = useNavigation()
    const [busca,setBusca] = useState("");
    const [textoBusca,setTextoBusca] = useState("");

    const [carregando,setCarregando] = useState(false)
    const porpagina = 4;
    const [pagina,setPagina] = useState(1);
    
    const [grupos,setGrupos] = useState<Grupo[]>([] as Grupo[])

    useEffect(()=>{
        loadGrupos();
    },[])
    async function loadGrupos(){
        if(carregando) return;
        
        setCarregando(true)
        let querystring=`?page=${pagina}`
        if(busca && busca!==""){
            querystring+=`&Busca=${busca}`
        }
        console.log({grupos:grupos.length,pagina,busca,querystring:`/Grupos${querystring}`})
        const resposta = await api.get(`/Grupos${querystring}`)
        const gruposres = resposta.data.docs
        setGrupos([...grupos,...gruposres])
        setPagina(pagina+1)
        setCarregando(false)

        
    }
    function renderLoading(){
        return <View><ActivityIndicator style={{marginTop:16}}/></View>
    }
    function handleNavigatetogrupo(id:string){
        navigation.navigate('Grupo',{id})
    }

    function RenderItem({item}:{item:Grupo}){
        return <Card style={styles.listItem} onPress={()=>{handleNavigatetogrupo(item._id)}}>
            <Card.Content>
                <Text>{item.Titulo}</Text>
            </Card.Content>
        </Card>
    }
    function handleBusca(){
        setBusca(textoBusca)
        setGrupos([] as Grupo[]);
        setPagina(1)
        setCarregando(false)
        loadGrupos();
    }
    return <>
    <Appbar>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Busca" />
      </Appbar>
      <SafeAreaView style={styles.main}>
        <Searchbar 
        placeholder="Título do Grupo"
        onChangeText={setTextoBusca}
        onSubmitEditing={handleBusca}
        value={textoBusca}
        />
        <FlatList style={{marginTop:16}}
        data={grupos}
        renderItem={RenderItem}
        keyExtractor={item=>item._id}
        onEndReached={loadGrupos}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderLoading} />
      </SafeAreaView>
    </>
}
const styles = StyleSheet.create({
    main:{
        padding:16
    },
    listItem: {
        backgroundColor: '#FFF',
        marginTop: 20,
        padding: 20,
      },
      
})


export default Busca