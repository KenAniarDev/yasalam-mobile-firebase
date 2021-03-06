import React, { useState, useCallback } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import Tabs from '../components/Tabs';
import { View, Text, ScrollView, Image, Flex, useToast } from 'native-base';
import { StyleSheet } from 'react-native';
import colors from '../config/colors';
import axios from 'axios';
import baseUrl from '../utility/baseUrl';
import useStore from '../hooks/useStore';
import { useFocusEffect } from '@react-navigation/native';

const RewardsScreen = ({ navigation }) => {
  const toast = useToast();
  const member = useStore((state) => state.member);
  const setMember = useStore((state) => state.setMember);
  const [profile, setProfile] = useState(member);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const result = await axios.post(`${baseUrl}/member/get-by-email-otp`, {
        email: member.email,
        otp: member.otp,
      });
      setProfile(result.data);
      setMember(result.data);
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

  useFocusEffect(
    useCallback(() => {
      fetchData();
      return () => {};
    }, [])
  );

  return (
    <ScreenWrapper>
      <Tabs active='reward' navigation={navigation} />
      <Flex justifyContent='center' height='100%'>
        <Flex style={styles.container}>
          <View style={styles.card}>
            <Flex
              justifyContent='space-between'
              height='100%'
              flexDirection='row'
            >
              <Image
                height='20'
                width='20'
                resizeMode='contain'
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2Froyal.png?alt=media&token=5fb3934a-e8f0-4be4-a25f-7868938cc343',
                }}
              />
              <View ml='2'>
                <Text fontSize='xl' color={colors.white}>
                  Total Points
                </Text>
                <Text fontSize='3xl' bold color={colors.white}>
                  {profile.points}
                </Text>
              </View>
            </Flex>
          </View>
          <View style={styles.card}>
            <Flex
              justifyContent='space-between'
              height='100%'
              flexDirection='row'
            >
              <Image
                height='20'
                width='20'
                resizeMode='contain'
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2Froyal.png?alt=media&token=5fb3934a-e8f0-4be4-a25f-7868938cc343',
                }}
              />
              <View ml='2'>
                <Text fontSize='xl' color={colors.white}>
                  Total Savings
                </Text>
                <Text fontSize='3xl' bold color={colors.white}>
                  {profile.savings}
                </Text>
              </View>
            </Flex>
          </View>
        </Flex>
      </Flex>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.primary,
    marginBottom: 40,
    width: '100%',
    marginRight: 14,
    padding: 20,
    paddingVertical: 40,
    borderColor: colors.secondary,
    borderWidth: 2,
    justifyContent: 'space-between',
  },
});

export default RewardsScreen;
