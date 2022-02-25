import { useCallback, useEffect, useState } from 'react';
import { Text, Flex, View, FlatList, Pressable, Image } from 'native-base';
import CustomHeader from '../components/CustomHeader';
import ScreenWrapper from '../components/ScreenWrapper';
import colors from '../config/colors';
import useStore from '../hooks/useStore';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import baseUrl from '../utility/baseUrl';

const FavoriteScreen = ({ navigation }) => {
  const outlets = useStore((state) => state.outlets);
  const [favoriteOutlets, setFavoriteOutlets] = useState([]);
  const member = useStore((state) => state.member);
  const setMember = useStore((state) => state.setMember);

  const fetchData = async () => {
    try {
      const result = await axios.post(`${baseUrl}/member/get-by-email-otp`, {
        email: member.email,
        otp: member.otp,
      });
      setMember(result.data);
    } catch (error) {
      toast.show({
        title: 'Error',
        description: error.response.data,
        status: 'error',
        placement: 'top',
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
      const favs = outlets.filter((e) => member.favorites.includes(e.id));
      setFavoriteOutlets(favs);

      return () => {};
    }, [member.favorites.length !== favoriteOutlets.length])
  );

  return (
    <ScreenWrapper>
      <CustomHeader navigation={navigation} title='My Favorites' />
      <View>
        {favoriteOutlets.length === 0 ? (
          <Flex height='100%' alignItems='center' justifyContent='center'>
            <Text>No Favorite Outlets</Text>
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
            my='4'
            px='4'
            width='100%'
            data={favoriteOutlets}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => navigation.navigate('SingleOutlet', { item })}
              >
                <Flex
                  backgroundColor='white'
                  flexDirection='row'
                  alignItems='center'
                  borderRadius='20'
                  py='10'
                  mb='4'
                  position='relative'
                >
                  <Image
                    size='md'
                    width='150'
                    resizeMode='contain'
                    source={{
                      uri: item.logo,
                    }}
                    alt={'outlet ' + item.name}
                  />
                  <View>
                    <Text fontSize='lg' style={{ maxWidth: 200 }}>
                      {item.name}
                    </Text>
                    <Text fontSize='sm' color='gray' style={{ maxWidth: 200 }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed
                    </Text>
                  </View>
                  <Flex
                    flexDirection='row'
                    alignItems='center'
                    position='absolute'
                    right='5'
                    bottom='3'
                  >
                    <Text color={colors.secondary}>Abu Dhabi</Text>
                    <Text mx='2'>|</Text>
                    <Text color={colors.yellow}>Hotel</Text>
                    <Text mx='2'>|</Text>
                    <Text color={colors.primary}>Family</Text>
                  </Flex>
                </Flex>
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            // refreshing={refreshing}
            // onRefresh={() => {
            //   fetchData();
            // }}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default FavoriteScreen;
