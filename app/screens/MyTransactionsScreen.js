import React, { useEffect, useState, useCallback } from 'react';
import { Pressable, RefreshControl } from 'react-native';
import { Text, Flex, View, FlatList, useToast } from 'native-base';
import CustomHeader from '../components/CustomHeader';
import ScreenWrapper from '../components/ScreenWrapper';
import colors from '../config/colors';
import { getAllTransactionsByMemberId } from '../utility/firebase';
import useStore from '../hooks/useStore';
import { useFocusEffect } from '@react-navigation/native';

const MyTransactionsScreen = ({ navigation }) => {
  const toast = useToast();
  const member = useStore((state) => state.member);
  const [transactions, setTransactions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = async () => {
    try {
      const transactionsDB = await getAllTransactionsByMemberId(member.id);
      setTransactions(transactionsDB);
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

      return () => setTransactions([]);
    }, [])
  );

  return (
    <ScreenWrapper>
      <CustomHeader navigation={navigation} title='My Transactions' />
      <View>
        {transactions.length === 0 ? (
          <Flex height='100%' alignItems='center' justifyContent='center'>
            <Text>No Transactions</Text>
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
            data={transactions}
            renderItem={({ item }) => (
              <Flex
                backgroundColor='white'
                flexDirection='row'
                alignItems='center'
                borderRadius='20'
                py='10'
                px='6'
                mb='4'
                position='relative'
              >
                <View>
                  <Text fontSize='lg' bold>
                    {item.outletName}
                  </Text>
                  <Text fontSize='sm' color='coolGray.600'>
                    {item.paymentDesciption}
                  </Text>
                </View>

                <Flex flexDirection='row' position='absolute' right='4' top='3'>
                  <Text fontSize='md' bold color={colors.primary}>
                    {item.year + '-' + item.month + '-' + item.day}
                  </Text>
                </Flex>
                <Flex
                  flexDirection='row'
                  alignItems='center'
                  position='absolute'
                  right='5'
                  bottom='3'
                >
                  <Text fontSize='md' color='coolGray.600' bold>
                    Total Price :{' '}
                  </Text>
                  <Text fontSize='md' color={colors.secondary} bold>
                    {item.totalPrice} AED
                  </Text>
                </Flex>
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

export default MyTransactionsScreen;
