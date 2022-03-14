import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import colors from '../config/colors';

function RegisterTypeScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../assets/splash.jpg')}
    >
      <View intensity={100} style={styles.buttonsContainer}>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate('Register', { type: 'Individual' })
          }
        >
          <View style={styles.button}>
            <Text style={styles.text}>INDIVIDUAL</Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Register', { type: 'Family' })}
        >
          <View style={styles.button}>
            <Text style={styles.text}>FAMILY</Text>
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

export default RegisterTypeScreen;
