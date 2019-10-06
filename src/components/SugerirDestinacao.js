/* eslint-disable prettier/prettier */
import React, { Component } from 'react';

import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Geocoder from 'react-native-geocoding';
import { ScrollView } from 'react-native-gesture-handler';

var cepPromise = require("cep-promise");

import Firebase from "../Firebase";

Geocoder.init("AIzaSyBGKCuuDcjsWjiXKPY27se2ShLmOgn-Y4Q", { language: "pt-br" });
export default class Sugerir extends Component {
  state = {
    ecoponto: '',
    telefone: '',
    endereco: '',
    numero: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
    latitude: '',
    longitude: '',
  }
  Firebase = new Firebase();

  enviarSugestao() {
    const { ecoponto, telefone, endereco, numero, bairro, cep, cidade, estado } = this.state;
    let latitude = '';
    let longitude = '';
    if (ecoponto === '' || endereco === '' || numero === '' || bairro === '' || cep === '' || cidade === '' || estado === '') {
      alert('Faltam dados obrigatórios');
    } else {
      let enderecoCompleto = endereco + ' ' + numero + ' ' + bairro + ' ' + cep + ' ' + cidade + ' ' + estado;
      Geocoder.from(enderecoCompleto)
        .then(json => {
          let location = json.results[0].geometry.location;
          latitude = location.lat;
          longitude = location.lng;
          console.log(location);
          console.log(enderecoCompleto);
          this.Firebase.sugerirDestinacao(ecoponto, telefone, endereco, numero, bairro, cep, cidade, estado, latitude, longitude)
            .then(() => {
              alert('Obrigado pela sugestão!');
            })
            .catch((error) => console.log(error));
          this.setState({
            ecoponto: '',
            telefone: '',
            endereco: '',
            numero: '',
            bairro: '',
            cep: '',
            cidade: '',
            estado: '',
            latitude: '',
            longitude: '',
          })
        })
        .catch(error => console.log(error));
    }
  }

  recuperarCEP(cep) {
    cepPromise(cep)
    .then((CEP) => {
      console.log(CEP);
        this.setState({
          estado: CEP.state,
          cidade: CEP.city,
          bairro: CEP.neighborhood,
          endereco: CEP.street,
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    const { ecoponto, telefone, endereco, numero, bairro, cep, cidade, estado } = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity style={{ padding: 20, backgroundColor: '#009688' }} onPress={this.props.navigation.openDrawer}>
          <Icon name="bars" size={20} color={'#ddd'} />
        </TouchableOpacity>
        <View style={styles.container}>
          <Text style={{ textAlign: 'center', textAlignVertical: 'center', paddingBottom: 20, fontSize: 24 }}>Sugerir novo eco ponto</Text>

          <TextInput
            style={styles.caixasTexto}
            underlineColorAndroid="transparent"
            placeholder="Nome do Ecoponto"
            onChangeText={(ecoponto) => { this.setState({ ecoponto }) }}
            value={ecoponto}
          />

          <TextInput
            style={styles.caixasTexto}
            underlineColorAndroid="transparent"
            placeholder="CEP"
            onChangeText={(cep) => { this.setState({ cep }) }}
            onBlur={() => { this.recuperarCEP(cep) }}
            value={cep}
          />

          <TextInput
            style={styles.caixasTexto}
            underlineColorAndroid="transparent"
            placeholder="Endereço"
            onChangeText={(endereco) => { this.setState({ endereco }) }}
            value={endereco}
          />

          <TextInput
            style={styles.caixasTexto}
            underlineColorAndroid="transparent"
            placeholder="Bairro"
            onChangeText={(bairro) => { this.setState({ bairro }) }}
            value={bairro}
          />

          <TextInput
            style={styles.caixasTexto}
            underlineColorAndroid="transparent"
            placeholder="Numero"
            onChangeText={(numero) => { this.setState({ numero }) }}
            value={numero}
          />


          <TextInput
            style={styles.caixasTexto}
            underlineColorAndroid="transparent"
            placeholder="Cidade"
            onChangeText={(cidade) => { this.setState({ cidade }) }}
            value={cidade}
          />

          <TextInput
            style={styles.caixasTexto}
            underlineColorAndroid="transparent"
            placeholder="Estado"
            onChangeText={(estado) => { this.setState({ estado }) }}
            value={estado}
          />

          <TextInput
            style={styles.caixasTexto}
            underlineColorAndroid="transparent"
            placeholder="Telefone"
            onChangeText={(telefone) => { this.setState({ telefone }) }}
            value={telefone}
          />


          <TouchableOpacity style={styles.botao} onPress={() => { this.enviarSugestao() }}>
            <Text>Enviar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#009688',
    flex: 1,
    alignItems: 'center',
  },
  caixasTexto: {
    width: 250,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10,
  },
  botao: {
    alignItems: 'center',
    width: 80,
    borderRadius: 8,
    backgroundColor: '#E0FFFF',
    padding: 10,
    marginTop: 25,
    marginBottom: 25,
  },
});