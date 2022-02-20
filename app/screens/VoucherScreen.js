import React from 'react';
import { Text, Flex, View, ScrollView } from 'native-base';
import CustomHeader from '../components/CustomHeader';
import ScreenWrapper from '../components/ScreenWrapper';
import colors from '../config/colors';

const VoucherScreen = ({ navigation }) => (
  <ScreenWrapper>
    <CustomHeader navigation={navigation} title='My Vouchers' />
  </ScreenWrapper>
);

export default VoucherScreen;
