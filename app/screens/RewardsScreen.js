import ScreenWrapper from '../components/ScreenWrapper';
import Tabs from '../components/Tabs';
import { View, Text, ScrollView, Image, Flex } from 'native-base';
import { RefreshControl, StyleSheet } from 'react-native';
import colors from '../config/colors';

const RewardsScreen = ({ navigation }) => {
  // const { userData, setUserData } = useAuth();

  // const fetchUser = async () => {
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };
  //   try {
  //     const body = JSON.stringify({
  //       otp: userData.otp,
  //       id: userData._id,
  //     });
  //     const result = await axios.post(
  //       `${baseUrl}/api/mobile/user`,
  //       body,
  //       config
  //     );
  //     setUserData(result.data.data.user);
  //   } catch (error) {}
  // };

  // const [refreshing, setRefreshing] = React.useState(false);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   fetchUser();
  //   setRefreshing(false);
  // }, []);

  return (
    <ScreenWrapper>
      <Tabs active='reward' navigation={navigation} />
      <ScrollView
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <Flex justifyContent='space-between' height='100%'>
              <Text fontSize='2xl' bold color={colors.yellow}>
                Total Points
              </Text>
              <Text fontSize='2xl' color={colors.secondary}>
                100
              </Text>
            </Flex>
            <Image
              height='20'
              width='20'
              resizeMode='contain'
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2Fyasalam-logo.png?alt=media&token=a1b2d925-a55f-46b0-8aba-e7e06018f285',
              }}
            ></Image>
          </View>
          <View style={styles.card}>
            <Flex justifyContent='space-between' height='100%'>
              <Text fontSize='2xl' bold color={colors.primary}>
                Total Savings
              </Text>
              <Text fontSize='2xl' color={colors.secondary}>
                1000 AED
              </Text>
            </Flex>
            <Image
              height='20'
              width='20'
              resizeMode='contain'
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2Fyasalam-logo.png?alt=media&token=a1b2d925-a55f-46b0-8aba-e7e06018f285',
              }}
            ></Image>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 200,
    borderRadius: 15,
    backgroundColor: colors.white,
    marginBottom: 40,
    width: '100%',
    marginRight: 14,
    padding: 20,
    borderColor: colors.secondary,
    borderWidth: 2,
    justifyContent: 'space-between',
  },
});

export default RewardsScreen;
