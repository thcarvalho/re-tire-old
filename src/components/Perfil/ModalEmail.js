/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { TouchableOpacity, TouchableHighlight, Dimensions, StyleSheet, View, Text, TextInput } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/AntDesign';
import Firebase from "../../controller/Firebase";

export default class ModalEmail extends Component {
    state= {
        email: '',
    };
    
    Firebase = new Firebase()

    componentDidMount() {
		this.Firebase.refUsuarios
            .where('email', '==', this.Firebase.auth.currentUser.email)
			.onSnapshot(snapshot => {
				snapshot.forEach(doc => {
                    this.setState({ email: doc.data().email });
				})
			})
    }

  constructor(props){
    super(props);
    this.state ={
      width: Dimensions.get('window').width,
    };
    Dimensions.addEventListener('change', (e) => {
      this.setState(e.window);
    });
  }

  closeModal = () => {
    this.props.modalEmail(false);
  }


  render(){
    return(
    <View  style={styles.container}>
      <TouchableOpacity activeOpacity = {1} disable={true} >
        <View style={[styles.modal, {width: this.state.width - 55}]}>
        <Text style={styles.texto}>Email:</Text>
        <View style={styles.cont}>
        <TextInput
            value={this.state.email}
            editable={true}
            onChangeText={(email) => this.setState({email})}
            autoCapitalize="none"
            keyboardType= 'email-address'
            style={styles.entradaTexto}
            underlineColorAndroid={'#00695c'}
            autoCorrect={false}
          />
          </View>
          <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>     
              <TouchableOpacity onPress={() => {this.closeModal()}} style={styles.btnCancel}>
                  <Text style={styles.textoBotao}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSalvar} onPress={() => {this.editarEmail()}}>
                  <Text style={styles.textoBotao}>Salvar</Text>
              </TouchableOpacity>
        </View>
    </View>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
  modal:{
    height: 160,
    paddingTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  cont: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto:{
  marginLeft: 8,
  color: '#009688',
  paddingVertical: 4,
  },
  entradaTexto:{
  width: '96%',
  fontSize: 20,
  justifyContent: 'center',
  alignItems: 'center',
  },
  btnCancel:{
   alignItems: 'flex-start'
  },
  btnSalvar: {
    borderLeftWidth: 1,
    borderLeftColor: '#dcdcdc',
    alignItems: 'flex-end'
  },
  textoBotao: {
   fontSize: 18,
   fontWeight: 'bold',
   paddingVertical: 6,
   paddingHorizontal: 24,
   color: '#009688',
  },
});