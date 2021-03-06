import React, { useState, useEffect, useCallback } from 'react';
import { onSnapshot, doc, collection } from 'firebase/firestore';
import { getOutlet, getOutlets } from '../utility/firebase';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Touchable,
} from 'react-native';
import {
  Image,
  Flex,
  View,
  Text,
  FlatList,
  Pressable,
  useToast,
} from 'native-base';
import * as Linking from 'expo-linking';
import { SliderBox } from 'react-native-image-slider-box';
import colors from '../config/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import moment from 'moment';
import * as Location from 'expo-location';
import useStore from '../hooks/useStore';
import axios from 'axios';
import baseUrl from '../utility/baseUrl';

import haversine from 'haversine-distance';

import { useFocusEffect } from '@react-navigation/native';

const SingleOutletScreen = ({ navigation, route }) => {
  const toast = useToast();
  const member = useStore((state) => state.member);
  const setMember = useStore((state) => state.setMember);
  const setOutlets = useStore((state) => state.setOutlets);
  const currentDate = moment(new Date()).format('YYYY-MM-DD');
  const [outlet, setOutlet] = useState(route.params.item);
  const [visits, setVisits] = useState(outlet.visits);
  const [location, setLocation] = useState(undefined);
  const [branches, setBranches] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [loading, setLoading] = useState(false);

  const [webHeight, setWebHeight] = useState(100);
  const webViewScript = `
    setTimeout(function() { 
        window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight); 
    }, 500);
    true; // note: this is required, or you'll sometimes get silent failures
    `;

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      setLocation({ latitude, longitude });
    } catch (error) {}
  };
  const fetchData = async () => {
    try {
      const result = await axios.post(`${baseUrl}/member/get-by-email-otp`, {
        email: member.email,
        otp: member.otp,
      });
      setMember(result.data);
      const latestOutlet = await getOutlet(route.params.item.id);
      setOutlet(latestOutlet);
      setVisits(latestOutlet.visits);

      const latestOutlets = await getOutlets();
      setOutlets(latestOutlets);

      if (outlet.outletgroupName !== 'Single') {
        const branches = latestOutlets.filter(
          (e) => e.outletgroupId === outlet.outletgroupId && e.id !== outlet.id
        );
        setBranches(branches);
      }
    } catch (error) {
      toast.show({
        title: 'Error',
        description: error.response.data,
        status: 'error',
        placement: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  const addNewFavorite = async (outletId) => {
    setLoading(true);
    try {
      await axios.post(`${baseUrl}/member/add-favorite`, {
        email: member.email,
        otp: member.otp,
        outletId: outletId,
      });
      fetchData();
    } catch (error) {
      toast.show({
        title: 'Error',
        description: error.response.data,
        status: 'error',
        placement: 'top',
      });
    } finally {
      setLoading(false);
    }
  };
  const deleteFavorite = async (outletId) => {
    setLoading(true);
    try {
      await axios.post(`${baseUrl}/member/delete-favorite`, {
        email: member.email,
        otp: member.otp,
        outletId: outletId,
      });
      fetchData();
    } catch (error) {
      toast.show({
        title: 'Error',
        description: error.response.data,
        status: 'error',
        placement: 'top',
      });
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      getLocation();
      fetchData();
      return () => {};
    }, [])
  );
  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SliderBox images={outlet.gallery} style={{ height: 250 }} />
        <View p='4'>
          <Flex
            flexDirection='row'
            alignItems='center'
            justifyContent='space-between'
            flexWrap='wrap'
          >
            <Image
              size='xl'
              resizeMode='contain'
              source={{
                uri: outlet.logo,
              }}
              alt={'outlet '}
            />
            <View>
              <Text
                style={{
                  ...styles.badge,
                  backgroundColor: colors.secondary,
                  marginBottom: 5,
                  textAlign: 'center',
                }}
              >
                {outlet.categoryName}
              </Text>
              <Text
                style={{
                  ...styles.badge,
                  backgroundColor: colors.yellow,
                  marginBottom: 5,
                  textAlign: 'center',
                }}
              >
                {outlet.featureName}
              </Text>
              <Text
                style={{
                  ...styles.badge,
                  backgroundColor: colors.primary,
                  textAlign: 'center',
                }}
              >
                {outlet.regionName}
              </Text>
            </View>
          </Flex>
          <Flex
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
            flexWrap='wrap'
            mt='2'
          >
            <Text fontSize='xl' bold mr='2' width='70%'>
              {outlet.name}
            </Text>
            {member.favorites.includes(outlet.id) ? (
              <TouchableOpacity onPress={() => deleteFavorite(outlet.id)}>
                <MaterialCommunityIcons
                  // name={isFavorite ? 'heart' : 'heart-outline'}
                  name={'heart'}
                  size={36}
                  color={colors.secondary}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => addNewFavorite(outlet.id)}>
                <MaterialCommunityIcons
                  // name={isFavorite ? 'heart' : 'heart-outline'}
                  name={'heart-outline'}
                  size={36}
                  color={colors.secondary}
                />
              </TouchableOpacity>
            )}
          </Flex>
          <Flex width='100%'>
            <Text fontSize='md'>{outlet.address}</Text>
            <TouchableOpacity
              onPress={() => {
                if (location) {
                  Linking.openURL(
                    `https://www.google.com/maps/dir/${outlet.latitude},${outlet.longitude}/${location.latitude},${location.longitude}`
                  );
                } else {
                  Linking.openURL(
                    `https://www.google.com/maps/dir/${outlet.latitude},${outlet.longitude}/`
                  );
                }
              }}
            >
              <Flex
                flexDirection='row'
                alignItems='center'
                justifyContent='center'
                backgroundColor={colors.primary}
                p='3'
                borderRadius='10'
                mt='2'
              >
                <MaterialCommunityIcons
                  name='directions'
                  size={20}
                  color={colors.white}
                />
                <Text
                  color={colors.white}
                  ml='2'
                  fontSize='sm'
                  textTransform='uppercase'
                >
                  Get Directions
                  {/* - 100KM */}
                </Text>
              </Flex>
            </TouchableOpacity>
          </Flex>
          {outlet.yasalam && (
            <Flex
              flexDirection='row'
              alignItems='center'
              justifyContent='space-between'
              mt='4'
            >
              <Text fontSize='xl'>Entries</Text>
              <Flex flexDirection='row'>
                <Text fontSize='4xl' color={colors.secondary}>
                  {outlet.currentVisitDate ? (
                    <>
                      {outlet.currentVisitDate !== currentDate ? (
                        10
                      ) : (
                        <>{visits ? 10 - visits : 10}</>
                      )}
                    </>
                  ) : (
                    10
                  )}
                </Text>
                <Text fontSize='md' mt='3'>
                  /10
                </Text>
              </Flex>
            </Flex>
          )}

          <View style={{ ...styles.flexContainer, marginTop: 10 }}>
            <View style={{ width: '100%', height: webHeight + 20 }}>
              <Text fontSize='xl'>Description</Text>
              <WebView
                opacity={0.99}
                originWhitelist={['*']}
                source={{
                  html: `<!DOCTYPE html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>* { color: gray, height: auto }</style></head><body>${outlet.description}</body></html>`,
                }}
                automaticallyAdjustContentInsets={false}
                scrollEnabled={false}
                onMessage={(event) => {
                  setWebHeight(parseInt(event.nativeEvent.data));
                }}
                javaScriptEnabled={true}
                injectedJavaScript={webViewScript}
                domStorageEnabled={true}
              />
            </View>
          </View>

          <Flex flexDirection='row' my='4'>
            {outlet.phone && (
              <Text
                fontSize='md'
                style={{
                  marginRight: 10,
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: colors.secondary,
                  color: 'white',
                }}
              >
                {outlet.phone}
              </Text>
            )}
            {outlet.email && (
              <Text
                fontSize='md'
                style={{
                  marginRight: 10,
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: colors.secondary,
                  color: 'white',
                }}
              >
                {outlet.email}
              </Text>
            )}
          </Flex>

          <Flex flexDirection='row' alignItems='center'>
            {outlet.facebook ? (
              <TouchableOpacity
                style={{
                  marginRight: 10,
                  borderRadius: 10,
                  padding: 8,
                  backgroundColor: '#4F6AA3',
                }}
                onPress={() => Linking.openURL(outlet.facebook)}
              >
                <MaterialCommunityIcons
                  name='facebook'
                  size={35}
                  color='white'
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
            {outlet.youtube ? (
              <TouchableOpacity
                style={{
                  marginRight: 10,
                  borderRadius: 10,
                  padding: 8,
                  backgroundColor: '#F21B3B',
                }}
                onPress={() => Linking.openURL(outlet.youtube)}
              >
                <MaterialCommunityIcons
                  name='youtube'
                  size={35}
                  color='white'
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
            {outlet.instagram ? (
              <TouchableOpacity
                style={{
                  marginRight: 10,
                  borderRadius: 10,
                  padding: 8,
                  backgroundColor: '#E4457B',
                }}
                onPress={() => Linking.openURL(outlet.instagram)}
              >
                <MaterialCommunityIcons
                  name='instagram'
                  size={35}
                  color='white'
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
            {outlet.twitter ? (
              <TouchableOpacity
                style={{
                  marginRight: 10,
                  borderRadius: 10,
                  padding: 8,
                  backgroundColor: '#34ABF3',
                }}
                onPress={() => Linking.openURL(outlet.twitter)}
              >
                <MaterialCommunityIcons
                  name='twitter'
                  size={35}
                  color='white'
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
            {outlet.whatsapp ? (
              <TouchableOpacity
                style={{
                  marginRight: 10,
                  borderRadius: 10,
                  padding: 8,
                  backgroundColor: '#5CB637',
                }}
                onPress={() => Linking.openURL(outlet.whatsapp)}
              >
                <MaterialCommunityIcons
                  name='whatsapp'
                  size={35}
                  color='white'
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
            {outlet.website ? (
              <TouchableOpacity
                style={{
                  marginRight: 10,
                  borderRadius: 10,
                  padding: 8,
                  backgroundColor: '#20BCF6',
                }}
                onPress={() => Linking.openURL(outlet.website)}
              >
                <MaterialCommunityIcons name='web' size={35} color='white' />
              </TouchableOpacity>
            ) : (
              <></>
            )}
          </Flex>
          {outlet.video.length > 0 && (
            <View style={{ marginTop: 20 }}>
              <WebView
                style={{ width: '100%', height: 200 }}
                opacity={0.99}
                originWhitelist={['*']}
                source={{
                  html: `<style>iframe { height: 500px !important; width: 100% !important; object-fit: cover !important  }</style>${outlet.video}`,
                }}
              />
            </View>
          )}
          {outlet.outletgroupName !== 'Single' ? (
            <>
              <Text fontSize='xl' mt='6' mb='2'>
                Branches
              </Text>
              {branches.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => navigation.navigate('SingleOutlet', { item })}
                >
                  <Flex
                    backgroundColor='white'
                    flexDirection='row'
                    alignItems='center'
                    borderRadius='20'
                    py='16'
                    mb='4'
                    position='relative'
                    borderColor={colors.primary}
                    borderWidth='2'
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
                    <View>
                      <Text fontSize='lg' style={{ maxWidth: 200 }}>
                        {item.name}
                      </Text>
                      <Text
                        fontSize='sm'
                        color='gray'
                        style={{ maxWidth: 200 }}
                      >
                        {item.address}
                      </Text>
                      <Text color={colors.secondary}>- {item.regionName}</Text>
                    </View>

                    <Flex
                      flexDirection='row'
                      position='absolute'
                      right='5'
                      top='1'
                    >
                      <Text fontSize='2xl' color={colors.secondary}>
                        {item.currentVisitDate ? (
                          <>
                            {item.currentVisitDate !== currentDate ? (
                              10
                            ) : (
                              <>{item.visits ? 10 - item.visits : 10}</>
                            )}
                          </>
                        ) : (
                          10
                        )}
                      </Text>
                      <Text mt='3'>/10</Text>
                    </Flex>
                    <Flex
                      flexDirection='row'
                      alignItems='center'
                      justifyContent='space-between'
                      position='absolute'
                      right='5'
                      left='5'
                      bottom='3'
                    >
                      <TouchableOpacity
                        onPress={() => {
                          if (location) {
                            Linking.openURL(
                              `https://www.google.com/maps/dir/${item.latitude},${item.longitude}/${location.latitude},${location.longitude}`
                            );
                          } else {
                            Linking.openURL(
                              `https://www.google.com/maps/dir/${item.latitude},${item.longitude}/`
                            );
                          }
                        }}
                      >
                        <Flex
                          flexDirection='row'
                          alignItems='center'
                          justifyContent='center'
                          backgroundColor={colors.dark}
                          p='2'
                          borderRadius='10'
                        >
                          <Text
                            color={colors.white}
                            fontSize='xs'
                            textTransform='uppercase'
                          >
                            Get Directions
                            {/* - 100KM */}
                          </Text>
                        </Flex>
                      </TouchableOpacity>
                      <Flex
                        flexDirection='row'
                        alignItems='center'
                        justifyContent='flex-end'
                      >
                        <Text color={colors.yellow}>{item.categoryName}</Text>
                        <Text mx='2'>|</Text>
                        <Text color={colors.primary}>{item.featureName}</Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Pressable>
              ))}
            </>
          ) : (
            <Text> No Branches</Text>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  branch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width: '100%',
    padding: 10,
    borderRadius: 6,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 36,
  },
  badge: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: 'white',
    flexShrink: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
});

export default SingleOutletScreen;
