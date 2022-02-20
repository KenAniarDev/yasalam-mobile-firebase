import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../config/colors';

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/pattern.png')}
    >
      <View intensity={100} style={styles.buttonsContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/yasalam-logo.png')}
          />
        </View>
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
          <LinearGradient
            colors={['#17B9CF', '#1777CF']}
            start={[0, 0]}
            end={[1, 1]}
            location={[0.25, 0.4, 1]}
            style={styles.button}
          >
            <Text style={styles.text}>Yasalam Register</Text>
          </LinearGradient>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
          <LinearGradient
            colors={['#EC3C54', '#B00707']}
            start={[0, 0]}
            end={[1, 1]}
            location={[0.25, 0.4, 1]}
            style={styles.button}
          >
            <Text style={styles.text}>Login</Text>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    padding: 20,
    width: '100%',
  },
  logo: {
    width: 100,
    height: 170,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  tagline: {
    fontSize: 25,
    fontWeight: '600',
    paddingVertical: 20,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    paddingVertical: 20,
    width: '100%',
    marginVertical: 10,
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
