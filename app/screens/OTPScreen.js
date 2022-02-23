import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useToast, Text } from 'native-base';
import ScreenWrapper from '../components/ScreenWrapper';
import colors from '../config/colors';
import axios from 'axios';
import baseUrl from '../utility/baseUrl';
import { MEMBER } from '../utility/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStore from '../hooks/useStore';
async function setMemberLocalStorage(member) {
  try {
    await AsyncStorage.setItem(MEMBER, JSON.stringify(member));
  } catch (error) {
    console.log(error);
  }
}

const OTPScreen = ({ navigation, route }) => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const setMember = useStore((state) => state.setMember);

  const [otp, setOtp] = useState(new Array(6).fill(''));
  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();

  const handleChange = (value, index) => {
    setOtp([...otp.map((data, i) => (i === index ? value : data))]);
  };

  const handleSubmit = async () => {
    if (otp.join('').length < 6) {
      return toast.show({
        title: 'Error',
        description: 'Please complete OTP',
        status: 'error',
        placement: 'top',
      });
    }
    try {
      const result = await axios.post(`${baseUrl}/member/otp-login`, {
        email,
        otp: otp.join(''),
      });
      setMember(result.data);
      setMemberLocalStorage(result.data);
      toast.show({
        title: 'Sucess  ',
        description: 'Nice',
        status: 'success',
        placement: 'top',
      });
      // navigation.navigate('OTP');
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Error',
        description: error.response.data,
        status: 'error',
        placement: 'top',
      });
    }
  };
  useEffect(() => {
    setEmail(route.params.email);
  }, []);
  return (
    <ScreenWrapper backgroundColor={colors.yellow}>
      <View style={styles.container}>
        <Text
          style={{
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
          }}
        >
          ENTER CODE
        </Text>
        <View style={styles.otp}>
          <View style={styles.inputcontainer}>
            <TextInput
              autoFocus={true}
              returnKeyType='next'
              style={styles.input}
              maxLength={1}
              keyboardType='numeric'
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleChange('', 0);
                }
              }}
              onChangeText={(value) => {
                handleChange(value, 0);
                if (value !== '') {
                  ref_input2.current.focus();
                }
              }}
              value={otp[0]}
              ref={ref_input1}
            />
          </View>
          <View style={styles.inputcontainer}>
            <TextInput
              returnKeyType='next'
              style={styles.input}
              maxLength={1}
              keyboardType='numeric'
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleChange('', 1);
                  ref_input1.current.focus();
                }
              }}
              onChangeText={(value) => {
                handleChange(value, 1);
                if (value !== '') {
                  ref_input3.current.focus();
                }
              }}
              value={otp[1]}
              ref={ref_input2}
            />
          </View>
          <View style={styles.inputcontainer}>
            <TextInput
              returnKeyType='next'
              style={styles.input}
              maxLength={1}
              keyboardType='numeric'
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleChange('', 2);
                  ref_input2.current.focus();
                }
              }}
              onChangeText={(value) => {
                handleChange(value, 2);
                if (value !== '') {
                  ref_input4.current.focus();
                }
              }}
              value={otp[2]}
              ref={ref_input3}
            />
          </View>
          <View style={styles.inputcontainer}>
            <TextInput
              returnKeyType='next'
              style={styles.input}
              maxLength={1}
              keyboardType='numeric'
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleChange('', 3);
                  ref_input3.current.focus();
                }
              }}
              onChangeText={(value) => {
                handleChange(value, 3);
                if (value !== '') {
                  ref_input5.current.focus();
                }
              }}
              value={otp[3]}
              ref={ref_input4}
            />
          </View>
          <View style={styles.inputcontainer}>
            <TextInput
              returnKeyType='next'
              style={styles.input}
              maxLength={1}
              keyboardType='numeric'
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleChange('', 4);
                  ref_input4.current.focus();
                }
              }}
              onChangeText={(value) => {
                handleChange(value, 4);
                if (value !== '') {
                  ref_input6.current.focus();
                }
              }}
              value={otp[4]}
              ref={ref_input5}
            />
          </View>
          <View style={styles.inputcontainer}>
            <TextInput
              returnKeyType='next'
              style={styles.input}
              maxLength={1}
              keyboardType='numeric'
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  handleChange('', 5);
                  ref_input5.current.focus();
                }
              }}
              onChangeText={(value) => {
                handleChange(value, 5);
              }}
              value={otp[5]}
              ref={ref_input6}
            />
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          // onPress={verify}
          onPress={handleSubmit}
        >
          <Text
            style={{
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
            }}
          >
            VERIFY
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 28,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 170,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  input: {
    width: 30,
  },
  inputcontainer: {
    backgroundColor: colors.white,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingRight: 24,
    marginVertical: 10,
    width: 26,
    height: 40,
    marginHorizontal: 5,
    borderRadius: 5,
    textAlign: 'left',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  otp: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OTPScreen;
