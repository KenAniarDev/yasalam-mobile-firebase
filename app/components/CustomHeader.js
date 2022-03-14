import React from 'react';
import { Text, Pressable, Image, View } from 'native-base';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CustomHeader({ navigation, title }) {
  return (
    <View style={styles.banner}>
      <Image
        width='100%'
        height='100%'
        // source={{
        //   uri: 'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2Fheader.jpg?alt=media&token=29a3d0b6-50ef-42c3-8f47-f109bcf9d91d',
        // }}
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2Flanding.jpg?alt=media&token=58f22a66-27e1-4df2-b183-7190a5beffa2',
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
        <Text fontSize='xl' bold letterSpacing={2} color='white'>
          {title.toUpperCase()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'relative',
    width: '100%',
    height: 70,
  },
  innerBanner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    paddingHorizontal: 12,
    backgroundColor: '#00000055',
  },
  menuButton: {
    position: 'absolute',
    zIndex: 1,
    top: 16,
    left: 12,
  },
});
