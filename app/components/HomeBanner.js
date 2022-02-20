import React from 'react';
import { Text, Pressable, Image, View } from 'native-base';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeBanner({ navigation }) {
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

        <Text fontSize='lg' color='white' pb='6'>
          Level up your life style with
        </Text>
        <Image
          height='20'
          width='20'
          resizeMode='contain'
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2Fyasalam-logo.png?alt=media&token=a1b2d925-a55f-46b0-8aba-e7e06018f285',
          }}
        ></Image>
        <Text fontSize='4xl' bold letterSpacing={3} uppercase color='white'>
          YaSalam
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'relative',
    width: '100%',
    height: 300,
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
