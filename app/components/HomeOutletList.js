import React, { useEffect } from 'react';
import { Text, Pressable, FlatList, View, Image, Flex } from 'native-base';
import colors from '../config/colors';

const HomeOutletList = ({ data, navigation, title }) => {
  useEffect(() => {}, [data]);

  return (
    <View p='6'>
      <Flex
        pb='4'
        flexDirection='row'
        justify='space-between'
        alignItems='center'
      >
        <Text bold fontSize='2xl'>
          {title}
        </Text>
        <Pressable
          onPress={() =>
            navigation.navigate('SingleCategory', { outlets: data, title })
          }
        >
          <Text fontSize='md' color={colors.primary}>
            VIEW
          </Text>
        </Pressable>
      </Flex>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          if (item.isBranch) {
            return <></>;
          }
          return (
            <Pressable
              onPress={() => navigation.navigate('SingleOutlet', { item })}
              p='4'
              mr='4'
              rounded='20'
              background='white'
              borderColor={colors.primary}
              borderWidth={1}
            >
              <Image
                size='md'
                width='150'
                resizeMode='contain'
                source={{
                  uri: item.logo,
                }}
                alt={'outlet ' + item.name}
              />

              <Flex
                direction='row'
                justifyContent='center'
                flexWrap='wrap'
                width='150'
              >
                <Text
                  fontSize='md'
                  mt='2'
                  bold
                  style={{ maxWidth: 200, textAlign: 'center' }}
                >
                  {item.name}
                </Text>
              </Flex>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeOutletList;
