import React, { useState, useCallback } from 'react';
import { Text, Flex, View, ScrollView, useToast, Pressable } from 'native-base';
import CustomHeader from '../components/CustomHeader';
import ScreenWrapper from '../components/ScreenWrapper';
import axios from 'axios';
import baseUrl from '../utility/baseUrl';
import useStore from '../hooks/useStore';
import Loader from '../components/Loader';
import colors from '../config/colors';
import { useFocusEffect } from '@react-navigation/native';

const TextRow = ({ title, value }) => (
  <Flex
    p='4'
    my='2'
    borderRadius='10'
    flexDirection='row'
    justifyContent='space-between'
    backgroundColor='white'
  >
    <Text fontSize='lg'>{title}:</Text>
    <Text fontSize='lg'>{value}</Text>
  </Flex>
);

const AccountScreen = ({ navigation }) => {
  const toast = useToast();
  const member = useStore((state) => state.member);
  const setMember = useStore((state) => state.setMember);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const result = await axios.post(`${baseUrl}/member/getbyotp`, {
        email: member.email,
        otp: member.otp,
      });
      setProfile(result.data);
      setMember(result.data);
    } catch (error) {
      console.log(error);
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

  useFocusEffect(
    useCallback(() => {
      fetchData();
      return () => {};
    }, [])
  );

  return (
    <ScreenWrapper>
      <CustomHeader navigation={navigation} title='My Profile' />
      {loading ? (
        <Loader />
      ) : (
        <ScrollView p='4'>
          <TextRow title={'Name'} value={profile.name} />
          <TextRow title={'Email'} value={profile.email} />
          <TextRow title={'Mobile'} value={profile.mobileNumber} />
          <TextRow title={'Nationality'} value={profile.nationality} />
          <TextRow title={'Gender'} value={profile.gender} />
          <TextRow title={'Birthdate'} value={profile.birthdate} />
          <TextRow title={'Employer Details'} value={profile.employerDetails} />
          <TextRow title={'Account Type'} value={profile.userType} />
          <TextRow title={'Issued Date'} value={profile.issueDate} />
          <TextRow title={'Expiry Date'} value={profile.expiryDate} />

          <Flex
            p='4'
            mb='2'
            borderRadius='10'
            flexDirection='row'
            justifyContent='center'
            backgroundColor='white'
          >
            <Text fontSize='lg'>CHILDREN</Text>
          </Flex>

          {profile.children.map((e, i) => (
            <Flex
              key={i}
              p='4'
              mb='2'
              borderRadius='10'
              backgroundColor={
                e.gender === 'male' ? colors.primary : colors.secondary
              }
            >
              <TextRow title={'Name'} value={e.name} />
              <TextRow title={'Gender'} value={e.gender} />
              <TextRow title={'Birthdate'} value={e.birthdate} />
            </Flex>
          ))}

          {profile.children.length < 3 && (
            <Pressable
              mt='2'
              width='100%'
              p='4'
              borderRadius='10'
              backgroundColor={colors.primary}
              onPress={() => navigation.navigate('AddChild')}
            >
              <Text textAlign='center' color='white' fontSize='lg' bold>
                ADD CHILDREN
              </Text>
            </Pressable>
          )}
          <View width='100%' height='10'></View>
        </ScrollView>
      )}
    </ScreenWrapper>
  );
};

export default AccountScreen;
