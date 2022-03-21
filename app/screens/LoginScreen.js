import axios from 'axios';
import { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { useToast, Text } from 'native-base';
import ScreenWrapper from '../components/ScreenWrapper';

import colors from '../config/colors';
import baseUrl from '../utility/baseUrl';

function LoginScreen({ navigation }) {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await axios.post(`${baseUrl}/member/check-email-login`, {
        email,
      });
      navigation.navigate('OTP', { email });
    } catch (error) {
      toast.show({
        title: 'Error',
        description: error.response.data,
        status: 'error',
        placement: 'top',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                onChangeText={(value) => setEmail(value.toLocaleLowerCase())}
                value={email}
              />
            </View>

            <TouchableOpacity
              disabled={isSubmitting}
              onPress={() => {
                handleSubmit();
              }}
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
            <Text style={styles.coloredText}>Join Royal</Text>
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
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.white,
    width: '100%',
    textAlign: 'center',
    paddingTop: 30,
    paddingVertical: 18,
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
    color: colors.white,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default LoginScreen;
