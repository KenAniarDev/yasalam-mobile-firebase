import React from 'react';
import { Text, Pressable, Image, View, Flex, FlatList } from 'native-base';
import ScreenWrapper from '../components/ScreenWrapper';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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

const Banner = ({ navigation }) => {
  return (
    <View style={styles.banner}>
      <Image
        width='100%'
        height='100%'
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2Fbanner-img.jpg?alt=media&token=e60945e7-0cec-4c27-b63a-90c7539c56e8',
        }}
        alt='Banner Image'
      />
      <View style={styles.innerBanner}>
        <Pressable
          style={styles.menuButton}
          onPress={() => navigation.toggleDrawer()}
        >
          <Ionicons name='menu-sharp' size={34} color='white' />
        </Pressable>
        <Text fontSize='4xl' bold letterSpacing={3} uppercase color='white'>
          Hotels
        </Text>
      </View>
    </View>
  );
};

export default function SingleCategoryScreen({ navigation }) {
  return (
    <ScreenWrapper>
      <Banner navigation={navigation} />
      <View>
        <FlatList
          my='4'
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
}

const styles = StyleSheet.create({
  banner: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  innerBanner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#00000099',
  },
  menuButton: {
    position: 'absolute',
    zIndex: 1,
    top: 12,
    left: 12,
  },
});
