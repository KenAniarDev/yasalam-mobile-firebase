import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Button,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../config/colors';

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/splash.jpg')}
    >
      <View intensity={100} style={styles.buttonsContainer}>
        <View style={styles.logoContainer}></View>
        {/* <TouchableWithoutFeedback
          onPress={() => navigation.navigate('GuestRegister')}
        >
          <LinearGradient
            colors={['#FBD800', '#FF9900']}
            start={[0, 0]}
            end={[1, 1]}
            location={[0.25, 0.4, 1]}
            style={styles.button}
          >
            <Text style={styles.text}>FREE REGISTERs</Text>
          </LinearGradient>
        </TouchableWithoutFeedback> */}

        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('RegisterType')}
        >
          <View style={styles.button}>
            <Text style={styles.text}>Royal Register</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
          <View style={styles.button}>
            <Text style={styles.text}>Login</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonsContainer: {
    padding: 20,
    width: '100%',
  },

  tagline: {
    fontSize: 25,
    fontWeight: '600',
    paddingVertical: 20,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    paddingVertical: 20,
    width: '100%',
    marginVertical: 10,
    borderColor: 'white',
    borderWidth: 2,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  buttonGradient: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default WelcomeScreen;
