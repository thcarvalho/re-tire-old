/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, View, Text, Modal } from 'react-native';
import Firebase from "../../controller/Firebase";

import ModalConfirmacao from "./ConfirmacaoExclusao";

export default class ModalExcluirConta extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width,
      modalVisibleConfirmacao: false,
    };
    Dimensions.addEventListener('change', (e) => {
      this.setState(e.window);
    });
  }
  Firebase = new Firebase()

  modalConfirmacao = (bool) => {
    this.setState({ modalVisibleConfirmacao: bool });
  }
  closeModal = () => {
    this.setState({ modalVisibleConfirmacao: false });
    this.props.modalExcluirConta(false)
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity activeOpacity={1} disable={true} >
          <View style={[styles.modal, { width: this.state.width - 55 }]}>
            <Text style={styles.texto}>Deseja realmente excluir a conta?</Text>
            <View style={styles.alinhamentoBotoes}>
              <TouchableOpacity onPress={() => { this.closeModal() }} style={styles.btnCancel}>
                <Text style={styles.textoBotao}>Não</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSalvar} onPress={() => {
                this.modalConfirmacao();
              }}>
                <Text style={styles.textoBotao}>Sim</Text>
              </TouchableOpacity>
            </View>
          </ View>
        </TouchableOpacity>
        <Modal visible={this.state.modalVisibleConfirmacao} onRequestClose={() => { this.closeModal() }}
          animationType='slide' transparent>
          <ModalConfirmacao closeModal={this.closeModal} />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    height: 140,
    paddingTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  texto: {
    fontSize: 22,
    marginLeft: 8,
    color: '#009688',
    paddingVertical: 4,
  },
  alinhamentoBotoes: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCancel: {
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