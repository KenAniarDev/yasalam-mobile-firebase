import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';

import colors from '../config/colors';

function LoginScreen({ navigation }) {
  return (
    <ScreenWrapper backgroundColor={colors.secondary}>
      <View style={styles.container}>
        <Text style={styles.loginText}>Login</Text>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <>
            <View style={{ width: '100%' }}>
              <TextInput
                style={styles.input}
                placeholder='Email'
                placeholderTextColor={colors.white}
                // onChangeText={handleChange('email')}
                // onBlur={handleBlur('email')}
                // value={values.email}
              />
            </View>

            <TouchableOpacity
              // disabled={isSubmitting}
              onPress={() => navigation.navigate('OTP')}
            >
              <Text style={styles.loginButton}>LOGIN</Text>
            </TouchableOpacity>
          </>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: colors.white, fontWeight: 'bold' }}>
            Don’t have an account?
          </Text>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('RegisterType')}
          >
            <Text style={styles.coloredText}>Join Yasalam</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 28,
    paddingBottom: 40,
    paddingHorizontal: 30,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loginText: {
    color: colors.white,
    fontSize: 28,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.white,
    width: '100%',
    textAlign: 'center',
  },
  loginButton: {
    marginTop: 50,
    backgroundColor: colors.white,
    paddingVertical: 20,
    width: 150,
    borderRadius: 60,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    color: colors.white,
    borderBottomWidth: 2,
    borderColor: colors.white,
    width: '100%',
  },
  coloredText: {
    color: colors.yellow,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default LoginScreen;
