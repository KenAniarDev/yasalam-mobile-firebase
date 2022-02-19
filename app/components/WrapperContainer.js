import GlobalStyles from '../styles/GlobalStyles';
import { SafeAreaView } from 'react-native';

export default function WrapperContainer({ children }) {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>{children}</SafeAreaView>
  );
}
