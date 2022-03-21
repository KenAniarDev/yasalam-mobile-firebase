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

const NotificationScreen = ({ navigation }) => (
  <ScreenWrapper>
    <CustomHeader navigation={navigation} title='Notifications' />
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
            alignItems='center'
            borderRadius='20'
            pt='10'
            pb='6'
            px='6'
            mb='4'
            position='relative'
          >
            <View>
              <Text fontSize='lg' bold>
                Welcome to Royal
              </Text>
              <Text fontSize='sm' color='coolGray.600'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              </Text>
            </View>

            <Flex flexDirection='row' position='absolute' right='4' top='3'>
              <Text fontSize='md' bold color={colors.primary}>
                Jan 22, 2020
              </Text>
            </Flex>
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

export default NotificationScreen;
