import React, { useState, useEffect } from 'react';
import { Text, Flex, View, ScrollView, useToast } from 'native-base';
import CustomHeader from '../components/CustomHeader';
import ScreenWrapper from '../components/ScreenWrapper';
import axios from 'axios';
import baseUrl from '../utility/baseUrl';
import useStore from '../hooks/useStore';
import Loader from '../components/Loader';

const TextRow = ({ title, value }) => (
  <Flex
    p='4'
    mb='2'
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
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const result = await axios.post(`${baseUrl}/member/getbyotp`, {
        email: member.email,
        otp: member.otp,
      });
      setProfile(result.data);
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

  useEffect(() => {
    fetchData();
  }, []);

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
        </ScrollView>
      )}
    </ScreenWrapper>
  );
};

export default AccountScreen;
