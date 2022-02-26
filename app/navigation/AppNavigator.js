import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Alert, View } from 'react-native';
import { MEMBER } from '../utility/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStore from '../hooks/useStore';
import moment from 'moment';
import axios from 'axios';
import baseUrl from '../utility/baseUrl';
import colors from '../config/colors';
import * as Linking from 'expo-linking';
import {
  Ionicons,
  FontAwesome,
  FontAwesome5,
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Loader from '../components/Loader';

const Drawer = createDrawerNavigator();
import TabNavigator from './TabNavigator';

import MyTransactionsScreen from '../screens/MyTransactionsScreen';
import VisitsScreen from '../screens/VisitsScreen';
import NotificationScreen from '../screens/NotificationScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import ShopScreen from '../screens/ShopScreen';
import VoucherScreen from '../screens/VoucherScreen';
import AccountNavigator from './AccountNavigator';

const AppNavigator = () => {
  const member = useStore((state) => state.member);
  const [loading, setLoading] = useState(true);

  async function setMemberNull() {
    try {
      await AsyncStorage.removeItem(MEMBER);
    } catch (error) {}
  }

  const checkIfAvailable = async () => {
    try {
      const result = await axios.post(`${baseUrl}/member/get-by-email-otp`, {
        email: member.email,
        otp: member.otp,
      });

      const expiryDate = moment(result.data.expiryDate);
      const now = moment();
      if (now > expiryDate) {
        setMemberNull(null);
      }
      if (result.data.otp !== member.otp) {
        setMemberNull(null);
      }
    } catch (error) {
      setMemberNull(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkIfAvailable();
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Drawer.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: '#17B9CF',
            drawerActiveTintColor: 'white',
            drawerLabelStyle: { marginLeft: -25 },
            // headerBackground: () => (
            //   <Image
            //     style={StyleSheet.absoluteFill}
            //     source={{
            //       uri: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg',
            //     }}
            //   />
            // ),
            // headerTintColor: colors.primary,
            // headerTitle: () => <></>,
          }}
          drawerContent={(props) => {
            return (
              <View style={{ flex: 1, backgroundColor: colors.yellow }}>
                <DrawerContentScrollView {...props}>
                  <View style={{ flex: 1 }}>
                    <DrawerItemList {...props} />
                  </View>
                  <DrawerItem
                    label='Contact Us'
                    labelStyle={{ marginLeft: -25 }}
                    icon={({ focused, color, size }) => (
                      <MaterialIcons
                        name='contact-phone'
                        size={24}
                        color={color}
                      />
                    )}
                    onPress={() =>
                      Linking.openURL('https://yasalamae.ae/contact-us')
                    }
                  />
                  <DrawerItem
                    label='Terms and Condition'
                    labelStyle={{ marginLeft: -25 }}
                    icon={({ focused, color, size }) => (
                      <Ionicons
                        name='newspaper-sharp'
                        size={24}
                        color={color}
                      />
                    )}
                    onPress={() =>
                      Linking.openURL('https://yasalamae.ae/terms')
                    }
                  />
                  <DrawerItem
                    label='Privacy Policy'
                    labelStyle={{ marginLeft: -25 }}
                    icon={({ focused, color, size }) => (
                      <MaterialIcons name='policy' size={24} color={color} />
                    )}
                    onPress={() =>
                      Linking.openURL('https://yasalamae.ae/privacy')
                    }
                  />
                  <DrawerItem
                    label='FAQs'
                    labelStyle={{ marginLeft: -25 }}
                    icon={({ focused, color, size }) => (
                      <MaterialCommunityIcons
                        name='head-question-outline'
                        size={24}
                        color={color}
                      />
                    )}
                    onPress={() => Linking.openURL('https://yasalamae.ae/faqs')}
                  />
                  <DrawerItem
                    label='Instagram'
                    labelStyle={{ marginLeft: -25 }}
                    icon={({ focused, color, size }) => (
                      <MaterialCommunityIcons
                        name='instagram'
                        size={28}
                        color={color}
                      />
                    )}
                    onPress={() =>
                      Linking.openURL('https://www.instagram.com/yasalamuae/')
                    }
                  />
                  <DrawerItem
                    label='Facebook'
                    labelStyle={{ marginLeft: -25 }}
                    icon={({ focused, color, size }) => (
                      <MaterialCommunityIcons
                        name='facebook'
                        size={28}
                        color={color}
                      />
                    )}
                    onPress={() =>
                      Linking.openURL(
                        'https://www.facebook.com/YaSalam-UAE-100492529092540/'
                      )
                    }
                  />
                  <DrawerItem
                    label='Website'
                    labelStyle={{ marginLeft: -25 }}
                    icon={({ focused, color, size }) => (
                      <MaterialCommunityIcons
                        name='web'
                        size={28}
                        color={color}
                      />
                    )}
                    onPress={() =>
                      Linking.openURL('https://www.tiktok.com/@yasalamuae')
                    }
                  />
                </DrawerContentScrollView>
              </View>
            );
          }}
        >
          <Drawer.Screen
            name='Home'
            component={TabNavigator}
            options={{
              headerTitle: () => <Text style={styles.headerTitle}>Home</Text>,
              drawerIcon: ({ color }) => (
                <Ionicons name='ios-home-outline' size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name='Transactions'
            options={{
              headerTitle: () => (
                <Text style={styles.headerTitle}>My Transactions</Text>
              ),
              drawerIcon: ({ color }) => (
                <FontAwesome name='money' size={24} color={color} />
              ),
            }}
            component={MyTransactionsScreen}
          />
          <Drawer.Screen
            name='Visits'
            options={{
              headerTitle: () => (
                <Text style={styles.headerTitle}>My Visits</Text>
              ),
              drawerIcon: ({ color }) => (
                <FontAwesome5 name='person-booth' size={24} color={color} />
              ),
            }}
            component={VisitsScreen}
          />
          <Drawer.Screen
            name='Favorite'
            options={{
              headerTitle: () => (
                <Text style={styles.headerTitle}>My Favorite</Text>
              ),
              drawerIcon: ({ color }) => (
                <FontAwesome name='heart' size={24} color={color} />
              ),
            }}
            component={FavoriteScreen}
          />
          <Drawer.Screen
            name='Shop'
            options={{
              headerTitle: () => <Text style={styles.headerTitle}>Shop</Text>,
              drawerIcon: ({ color }) => (
                <Entypo name='shop' size={24} color={color} />
              ),
            }}
            component={ShopScreen}
          />
          <Drawer.Screen
            name='Voucher'
            options={{
              headerTitle: () => (
                <Text style={styles.headerTitle}>Voucher</Text>
              ),
              drawerIcon: ({ color }) => (
                <FontAwesome5 name='ticket-alt' size={24} color={color} />
              ),
            }}
            component={VoucherScreen}
          />
          <Drawer.Screen
            name='Profile'
            options={{
              headerTitle: () => (
                <Text style={styles.headerTitle}>Profile</Text>
              ),
              drawerIcon: ({ color }) => (
                <FontAwesome5 name='user-circle' size={24} color={color} />
              ),
            }}
            component={AccountNavigator}
          />
          {/* <Drawer.Screen
            name='Notifications'
            options={{
              headerTitle: () => (
                <Text style={styles.headerTitle}>My Notifications</Text>
              ),
              drawerIcon: ({ color }) => (
                <Ionicons name='ios-home-outline' size={24} color={color} />
              ),
            }}
            component={NotificationScreen}
          /> */}
        </Drawer.Navigator>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
});

export default AppNavigator;
