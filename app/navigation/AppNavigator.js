import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Alert, Image } from 'react-native';
import { MEMBER } from '../utility/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStore from '../hooks/useStore';
import moment from 'moment';
import axios from 'axios';
import baseUrl from '../utility/baseUrl';

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
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                {/* <DrawerItem label="Logout" onPress={() => {
              Alert.alert(
                "LOGOUT WARNING",
                "Are you sure you want to Logout? Once you logout you have to contact the administrator to get your new OTP",
                [
                  {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => logOut() }
                ]
              )
            }} /> */}
              </DrawerContentScrollView>
            );
          }}
        >
          <Drawer.Screen name='Home' component={TabNavigator} />
          <Drawer.Screen
            name='Transactions'
            options={{
              headerTitle: () => (
                <Text style={styles.headerTitle}>My Transactions</Text>
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
            }}
            component={VisitsScreen}
          />
          <Drawer.Screen
            name='Favorite'
            options={{
              headerTitle: () => (
                <Text style={styles.headerTitle}>My Favorite</Text>
              ),
            }}
            component={FavoriteScreen}
          />
          <Drawer.Screen
            name='Shop'
            options={{
              headerTitle: () => <Text style={styles.headerTitle}>Shop</Text>,
            }}
            component={ShopScreen}
          />
          <Drawer.Screen
            name='Voucher'
            options={{
              headerTitle: () => (
                <Text style={styles.headerTitle}>Voucher</Text>
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
            }}
            component={AccountNavigator}
          />
          <Drawer.Screen
            name='Notifications'
            options={{
              headerTitle: () => (
                <Text style={styles.headerTitle}>My Notifications</Text>
              ),
            }}
            component={NotificationScreen}
          />
        </Drawer.Navigator>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default AppNavigator;
