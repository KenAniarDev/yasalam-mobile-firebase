import React from 'react';
import { Text, Flex, View, FlatList, Image } from 'native-base';
import CustomHeader from '../components/CustomHeader';
import ScreenWrapper from '../components/ScreenWrapper';
import colors from '../config/colors';
import Search from '../components/SearchWithFilter';

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

const ShopScreen = ({ navigation }) => (
  <ScreenWrapper>
    <CustomHeader navigation={navigation} title='Shop' />
    <Search />
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
            p='2'
            mb='4'
            position='relative'
          >
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              </Text>

              <Flex
                flexDirection='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <Flex
                  width='60%'
                  flexDirection='row'
                  justifyContent='space-between'
                  mt='2'
                  alignItems='center'
                >
                  <Flex flexDirection='row' alignItems='center'>
                    <Text color='coolGray.700' mr='1' bold>
                      Quantity
                    </Text>
                    <Text fontSize='lg' color={colors.yellow} bold>
                      10
                    </Text>
                  </Flex>
                  <Flex flexDirection='row' alignItems='center'>
                    <Text color='coolGray.700' mr='1' bold>
                      Points
                    </Text>
                    <Text fontSize='lg' color={colors.secondary} bold>
                      110
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </View>
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

export default ShopScreen;
