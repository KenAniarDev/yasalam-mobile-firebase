import React from 'react';
import { Text, Flex, View, FlatList } from 'native-base';
import CustomHeader from '../components/CustomHeader';
import ScreenWrapper from '../components/ScreenWrapper';
import colors from '../config/colors';

const data = [
  {
    id: 1,
    name: 'Myles Nunez',
    image:
      'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2FRectangle%20364.png?alt=media&token=7eb07970-5057-4f4a-962d-4acb4a667a46',
  },
  {
    id: 2,
    name: 'Myles Nunez',
    image:
      'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2FRectangle%20364.png?alt=media&token=7eb07970-5057-4f4a-962d-4acb4a667a46',
  },
  {
    id: 3,
    name: 'Myles Nunez',
    image:
      'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2FRectangle%20364.png?alt=media&token=7eb07970-5057-4f4a-962d-4acb4a667a46',
  },
  {
    id: 4,
    name: 'Myles Nunez',
    image:
      'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2FRectangle%20364.png?alt=media&token=7eb07970-5057-4f4a-962d-4acb4a667a46',
  },
  {
    id: 5,
    name: 'Myles Nunez',
    image:
      'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2FRectangle%20364.png?alt=media&token=7eb07970-5057-4f4a-962d-4acb4a667a46',
  },
];
const VisitsScreen = ({ navigation }) => (
  <ScreenWrapper>
    <CustomHeader navigation={navigation} title='My Visits' />
    <View>
      <FlatList
        p='4'
        pb='20'
        width='100%'
        data={data}
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
              St Regis Abu Dhabi The Nation Riviera Beach Club
            </Text>
            <Text fontSize='md' bold color={colors.primary}>
              Jan 28, 2022
            </Text>
          </Flex>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        // refreshing={refreshing}
        // onRefresh={() => {
        //   fetchData();
        // }}
      />
    </View>
  </ScreenWrapper>
);

export default VisitsScreen;
