import React, { useEffect } from "react";
import { Text, StyleSheet, Alert, Image } from "react-native";
import colors from "../config/colors";
import useAuth from '../auth/useAuth'

import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
import TabNavigator from "./TabNavigator";

import MyTransactionsScreen from "../screens/MyTransactionsScreen";
import VisitsScreen from "../screens/VisitsScreen";
import NotificationScreen from "../screens/NotificationScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import ShopScreen from "../screens/ShopScreen";
import VoucherScreen from "../screens/VoucherScreen";
import AccountNavigator from "./AccountNavigator";

const AppNavigator = () =>  {
  const { logOut, userData } = useAuth()
  return (
    <Drawer.Navigator 
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle:{
          backgroundColor: colors.primary,
        },
        headerTintColor: 'white',
        headerTitle: () => <></>
      }}
      drawerContent={props => {
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
        )
      }}
    >
      <Drawer.Screen name="Home" options={{
          headerRight: () => <Text style={{ 
            paddingRight: 20,
            color: colors.white,
            fontSize: 20,
            fontWeight: 'bold' 
          }}>{userData && "Welcome, "+ userData.name.split(" ")[0]}</Text>,
      }} component={TabNavigator} />
      <Drawer.Screen name="Transactions" options={{
        headerTitle: () => <Text style={styles.headerTitle}>My Transactions</Text>
      }} component={MyTransactionsScreen} />
      <Drawer.Screen name="Visits" options={{
         headerTitle: () => <Text style={styles.headerTitle}>My Visits</Text>
      }} component={VisitsScreen} />
      <Drawer.Screen name="Favorite" options={{
           headerTitle: () => <Text style={styles.headerTitle}>My Favorite</Text>
      }} component={FavoriteScreen} />
      <Drawer.Screen name="Shop" options={{
           headerTitle: () => <Text style={styles.headerTitle}>Shop</Text>
      }} component={ShopScreen} />
      <Drawer.Screen name="Voucher" options={{
           headerTitle: () => <Text style={styles.headerTitle}>Voucher</Text>
      }} component={VoucherScreen} />
      <Drawer.Screen name="Profile" options={{
          headerTitle: () => <Text style={styles.headerTitle}>Profile</Text>
      }} component={AccountNavigator} />
      <Drawer.Screen name="Notifications" options={{
           headerTitle: () => <Text style={styles.headerTitle}>My Notifications</Text>
      }} component={NotificationScreen} />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
})

export default AppNavigator;
