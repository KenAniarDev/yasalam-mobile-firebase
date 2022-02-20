import React from 'react';
import { Text, Flex, View, Image, FlatList } from 'native-base';
import CustomHeader from '../components/CustomHeader';
import ScreenWrapper from '../components/ScreenWrapper';
import QRCode from 'react-native-qrcode-svg';
import colors from '../config/colors';

const data = [
  {
    id: 1,
    name: 'Gary Senoc',
    birthday: 'Mar 02, 1999',
    expiry: 'Mar 02, 2023',
  },
  {
    id: 2,
    name: 'Gary Senoc Junior',
    birthday: 'Jan 02, 2014',
    expiry: 'Mar 02, 2023',
  },
  {
    id: 3,
    name: 'Gray Senoc',
    birthday: 'Dec 02, 2009',
    expiry: 'Mar 02, 2023',
  },
];

const QRScreen = ({ navigation }) => (
  <ScreenWrapper>
    <CustomHeader navigation={navigation} title='QR CODE PAGE' />
    <FlatList
      nestedScrollEnabled={true}
      px='4'
      data={data}
      renderItem={({ item }) => (
        <Flex alignItems='center' m='4'>
          <Text fontSize='3xl' bold>
            My YaSalam
          </Text>
          <View position='relative'>
            <Image
              left='0'
              size='md'
              width='300'
              height='300'
              resizeMode='contain'
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2Foutput-onlinegiftools.gif?alt=media&token=7379ad3f-537f-4c52-aadd-af0c6c0ea2ba',
              }}
              alt={'qr'}
            />
            <View position='absolute' style={{ top: 50, left: 53 }}>
              <QRCode value={'id'} size={200} />
            </View>
          </View>
          <View
            p='5'
            mt='4'
            width='100%'
            backgroundColor='white'
            borderRadius='26'
          >
            <Flex flexDirection='row' justifyContent='space-between'>
              <Text fontSize='md' color='gray.500'>
                Name
              </Text>
              <Text fontSize='md' bold color={colors.secondary}>
                {item.name}
              </Text>
            </Flex>
            <Flex flexDirection='row' justifyContent='space-between' my='2'>
              <Text fontSize='md' color='gray.500'>
                Birthday
              </Text>
              <Text fontSize='md' bold color={colors.yellow}>
                {item.birthday}
              </Text>
            </Flex>
            <Flex flexDirection='row' justifyContent='space-between'>
              <Text fontSize='md' color='gray.500'>
                Expiry
              </Text>
              <Text fontSize='md' bold color={colors.primary}>
                {item.expiry}
              </Text>
            </Flex>
          </View>
        </Flex>
      )}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      // refreshing={refreshing}
      // onRefresh={() => {
      //   fetchData();
      // }}
    />
  </ScreenWrapper>
);

export default QRScreen;
