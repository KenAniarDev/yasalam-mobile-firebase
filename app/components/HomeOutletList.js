import React from 'react';
import { Text, Pressable, FlatList, View, Image, Flex } from 'native-base';
import colors from '../config/colors';

const renderItem = ({ item }) => (
  <Pressable p='4' mr='4' rounded='20' background='white'>
    <Image
      size='md'
      width='150'
      resizeMode='contain'
      source={{
        uri: item.image,
      }}
      alt={'outlet ' + item.name}
    />

    <Flex direction='row' justifyContent='center'>
      <Text fontSize='md' mt='2' bold numberOfLines={1}>
        {item.name}
      </Text>
    </Flex>
  </Pressable>
);

const HomeOutletList = ({ data, navigation }) => (
  <View p='6'>
    <Flex
      pb='4'
      flexDirection='row'
      justify='space-between'
      alignItems='center'
    >
      <Text bold fontSize='2xl'>
        Hotels
      </Text>
      <Pressable onPress={() => navigation.navigate('SingleCategory')}>
        <Text fontSize='md' color={colors.primary}>
          VIEW
        </Text>
      </Pressable>
    </Flex>
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

export default HomeOutletList;
