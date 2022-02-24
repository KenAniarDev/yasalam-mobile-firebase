import React, { useState, useEffect, useCallback } from 'react';
import { RefreshControl } from 'react-native';
import {
  Text,
  Flex,
  View,
  FlatList,
  useToast,
  Image,
  Pressable,
} from 'native-base';
import CustomHeader from '../components/CustomHeader';
import ScreenWrapper from '../components/ScreenWrapper';
import colors from '../config/colors';
import { getAllVouchersById } from '../utility/firebase';
import useStore from '../hooks/useStore';
import { useFocusEffect } from '@react-navigation/native';

const VoucherScreen = ({ navigation }) => {
  const toast = useToast();
  const member = useStore((state) => state.member);
  const [vouchers, setVouchers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const vouchersDB = await getAllVouchersById(member.id);
      setVouchers(vouchersDB);
    } catch (error) {
      console.log(error);
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

      return () => setVouchers([]);
    }, [])
  );

  return (
    <ScreenWrapper>
      <CustomHeader navigation={navigation} title='My Vouchers' />
      <View>
        {vouchers.length === 0 ? (
          <Flex height='100%' alignItems='center' justifyContent='center'>
            <Text>No Vouchers</Text>
            <Pressable onPress={fetchData}>
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
            width='100%'
            data={vouchers}
            renderItem={({ item }) => (
              <View backgroundColor='white' borderRadius='20' p='2' mb='4'>
                <Flex flexDirection='row' alignItems='center'>
                  <Image
                    size='md'
                    width='120'
                    resizeMode='contain'
                    source={{
                      uri: item.image,
                    }}
                    alt={'outlet ' + item.name}
                  />
                  <View pl='2' flexGrow='1'>
                    <Text fontSize='lg' bold>
                      {item.name}
                    </Text>
                    <Text fontSize='sm' color='gray' width='60%'>
                      {item.description}
                    </Text>
                  </View>
                </Flex>
                <Flex flexDirection='row' justifyContent='center' mt='4'>
                  <View
                    width='100%'
                    borderRadius='10'
                    px='10'
                    py='2'
                    backgroundColor={
                      item.claimed ? colors.light : colors.yellow
                    }
                  >
                    <Text textAlign='center' color='white' fontSize='xl'>
                      {item.claimed ? 'CLAIMED' : 'UNCLAIMED'}
                    </Text>
                  </View>
                </Flex>
              </View>
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

export default VoucherScreen;
