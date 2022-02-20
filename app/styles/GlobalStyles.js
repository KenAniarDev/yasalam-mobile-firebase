import { StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
});
