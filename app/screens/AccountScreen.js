import React from 'react';
import { Text, Flex, View, ScrollView } from 'native-base';
import CustomHeader from '../components/CustomHeader';
import ScreenWrapper from '../components/ScreenWrapper';
import colors from '../config/colors';

const AccountScreen = ({ navigation }) => (
  <ScreenWrapper>
    <CustomHeader navigation={navigation} title='My Profile' />
  </ScreenWrapper>
);

export default AccountScreen;
