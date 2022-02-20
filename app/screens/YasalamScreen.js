import React from 'react';
import { FlatList, Text, Flex, Image, View } from 'native-base';
import ScreenWrapper from '../components/ScreenWrapper';
import Tabs from '../components/Tabs';
import SearchWithFilter from '../components/SearchWithFilter';
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

const YasalamScreen = ({ navigation }) => (
  <ScreenWrapper>
    <Tabs active='yasalam' navigation={navigation} />
    <SearchWithFilter />
    <View>
      <FlatList
        px='4'
        width='100%'
        data={data}
        renderItem={({ item }) => (
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
                uri: item.image,
              }}
              alt={'outlet ' + item.name}
            />
            <View>
              <Text fontSize='lg'>{item.name}</Text>
              <Text fontSize='sm' color='gray' style={{ maxWidth: 200 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              </Text>
            </View>

            <Flex flexDirection='row' position='absolute' right='5' top='1'>
              <Text fontSize='2xl' color={colors.secondary}>
                10
              </Text>
              <Text mt='3'>/10</Text>
            </Flex>
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

export default YasalamScreen;
