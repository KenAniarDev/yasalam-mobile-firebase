import React, { useState, useCallback } from 'react';
import { RefreshControl } from 'react-native';
import { Text, Flex, View, FlatList, useToast, Pressable } from 'native-base';
import CustomHeader from '../components/CustomHeader';
import ScreenWrapper from '../components/ScreenWrapper';
import colors from '../config/colors';
import { getAllVisitsByMemberId } from '../utility/firebase';
import useStore from '../hooks/useStore';

import { useFocusEffect } from '@react-navigation/native';

const VisitsScreen = ({ navigation }) => {
  const toast = useToast();
  const member = useStore((state) => state.member);
  const [visits, setVisits] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const visitsDB = await getAllVisitsByMemberId(member.id);
      setVisits(visitsDB);
      console.log(visitsDB);
    } catch (error) {
      toast.show({
        title: 'Error',
        description: 'Error please try again',
        status: 'error',
        placement: 'top',
      });
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();

      return () => setVisits([]);
    }, [])
  );

  return (
    <ScreenWrapper>
      <CustomHeader navigation={navigation} title='My Visits' />
      <View>
        {visits.length === 0 ? (
          <Flex height='100%' alignItems='center' justifyContent='center'>
            <Text>No Visits</Text>
            <Pressable onPress={onRefresh}>
              <View
                mt='4'
                p='2'
                borderRadius='4'
                backgroundColor={colors.primary}
              >
                <Text color='white'>RELOAD</Text>
              </View>
            </Pressable>
          </Flex>
        ) : (
          <FlatList
            p='4'
            pb='20'
            width='100%'
            data={visits}
            renderItem={({ item }) => (
              <Flex
                backgroundColor='white'
                flexDirection='row'
                alignItems='flex-start'
                justifyContent='space-between'
                borderRadius='16'
                py='6'
                px='4'
                mb='4'
                position='relative'
              >
                <Text fontSize='md' bold width='220' color='coolGray.700'>
                  {item.outletName}
                </Text>
                <Text fontSize='md' bold color={colors.primary}>
                  {item.year + '-' + item.month + '-' + item.day}
                </Text>
              </Flex>
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </ScreenWrapper>
  );
};
export default VisitsScreen;
