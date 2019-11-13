import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { ScrollView, SafeAreaView, StatusBar, Platform, Image, StyleSheet, AsyncStorage, Alert } from 'react-native';

import SpotList from '../components/SpotList';
import logo from '../assets/logo.png';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    async function connectToIO() {
      await AsyncStorage.getItem('user').then(user_id => {
        const socket = socketio('http://192.168.0.107:3333', { //IP do expo
          query: { user_id },
        });

        socket.on('booking_response', booking => {
          Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
        });
      })
    }

    connectToIO();
  }, []);

  useEffect(() => {
    async function getTechs() {
      await AsyncStorage.getItem('techs').then(storagedTechs => {
        const techsArray = storagedTechs.split(',').map(tech => tech.trim());

        setTechs(techsArray);
      })
    }

    getTechs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo}></Image>

      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10
  }
})