import React from 'react';
import { View, Text, Pressable, Image } from 'native-base';
import { StyleSheet } from 'react-native';
import colors from '../config/colors';

const Tabs = ({ active, navigation, location = '' }) => {
  return (
    <View
      style={[
        styles.tabContainer,
        { marginTop: location === 'home' ? -80 : 0 },
      ]}
    >
      <Image
        height='100%'
        // source={{
        //   uri: 'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2Fheader.jpg?alt=media&token=29a3d0b6-50ef-42c3-8f47-f109bcf9d91d',
        // }}
        source={{
          uri:
            location === 'home'
              ? ''
              : 'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2Flanding.jpg?alt=media&token=58f22a66-27e1-4df2-b183-7190a5beffa2',
        }}
      />

      <View style={styles.linkContainer}>
        <Pressable
          style={[
            styles.linkButton,
            {
              backgroundColor: active === 'yasalam' ? '#F7D9D3' : '#99999999',
            },
            {
              borderColor: active === 'yasalam' ? colors.secondary : 'white',
            },
          ]}
          onPress={() => navigation.navigate('Yasalam')}
        >
          <Text
            style={[
              styles.linkText,
              { color: active === 'yasalam' ? colors.secondary : 'white' },
            ]}
          >
            Royal
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.linkButton,
            {
              backgroundColor:
                active === 'experience' ? '#F7D9D3' : '#99999999',
            },
            {
              borderColor: active === 'experience' ? colors.secondary : 'white',
            },
          ]}
          onPress={() => navigation.navigate('Experience')}
        >
          <Text
            style={[
              styles.linkText,
              { color: active === 'experience' ? colors.secondary : 'white' },
            ]}
          >
            Experience
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.linkButton,
            { backgroundColor: active === 'reward' ? '#F7D9D3' : '#99999999' },
            { borderColor: active === 'reward' ? colors.secondary : 'white' },
          ]}
          onPress={() => navigation.navigate('Reward')}
        >
          <Text
            style={[
              styles.linkText,
              { color: active === 'reward' ? colors.secondary : 'white' },
            ]}
          >
            Reward
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    position: 'relative',
    zIndex: 2,
    height: 80,
    width: '100%',
  },
  linkContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  linkButton: {
    marginHorizontal: 4,
    paddingVertical: 4,
    backgroundColor: '#99999999',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
  },
  linkText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
    lineHeight: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
});

export default Tabs;
