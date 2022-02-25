import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  TextInput,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { useToast } from 'native-base';

import colors from '../config/colors';
import ScreenWrapper from '../components/ScreenWrapper';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import useStore from '../hooks/useStore';
import axios from 'axios';
import baseUrl from '../utility/baseUrl';

function AddChildScreen({ navigation, route }) {
  const toast = useToast();
  const member = useStore((state) => state.member);
  const [name, setName] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(undefined);
  const [birthdate, setBirthDate] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState('male');
  const [items, setItems] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ]);

  const [loading, setLoading] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setDate(date.toLocaleDateString());
    setBirthDate(date);
    hideDatePicker();
    setError({ ...error, birthdate: false });
  };

  const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async () => {
    if (name.length < 1) {
      toast.show({
        title: 'Error',
        description: 'Name is Required',
        status: 'error',
        placement: 'top',
      });
      return;
    }
    if (getAge(birthdate) > 17) {
      toast.show({
        title: 'Error',
        description: 'You can only add children below 18',
        status: 'error',
        placement: 'top',
      });
      return;
    }
    if (typeof birthdate === 'undefined') {
      toast.show({
        title: 'Error',
        description: 'Birthdate is Required',
        status: 'error',
        placement: 'top',
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${baseUrl}/member/add-child`, {
        email: member.email,
        otp: member.otp,
        name,
        gender,
        age: getAge(birthdate),
        birthdate: moment(birthdate).format('YYYY-MM-DD'),
      });

      navigation.goBack();
    } catch (error) {
      toast.show({
        title: 'Error',
        description: error.response.data,
        status: 'error',
        placement: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper backgroundColor={colors.primary} paddingTop={0}>
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
          CHILD
        </Text>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TextInput
            style={styles.input}
            placeholder='Name'
            placeholderTextColor={colors.white}
            email
            onChangeText={(text) => setName(text)}
            value={name}
          />

          <DropDownPicker
            style={[
              styles.input,
              {
                backgroundColor: 'transparent',
                borderWidth: 0,
                paddingHorizontal: 0,
              },
            ]}
            textStyle={{
              color: colors.white,
              fontSize: 14,
            }}
            listItemLabelStyle={{
              color: '#000',
            }}
            placeholder='Male'
            open={open}
            value={gender}
            items={items}
            setOpen={setOpen}
            setValue={setGender}
            setItems={setItems}
            onChangeValue={() => {}}
          />

          <TouchableWithoutFeedback onPress={showDatePicker}>
            <Text style={[styles.input, { textAlignVertical: 'center' }]}>
              Birthdate
            </Text>
          </TouchableWithoutFeedback>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode='date'
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <TouchableOpacity activeOpacity={0.5} onPress={handleSubmit}>
            <Text
              style={{
                marginTop: 30,
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
              ADD
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    color: colors.white,
    borderBottomWidth: 2,
    borderColor: colors.white,
    width: '100%',
    marginTop: 20,
  },
  error: {
    textAlign: 'left',
    color: colors.secondary,
    width: '100%',
    marginTop: 5,
  },
});

export default AddChildScreen;
