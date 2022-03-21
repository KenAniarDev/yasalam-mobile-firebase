import { useState, useEffect } from 'react';
import { Text, Flex, View, Image, FlatList, useToast } from 'native-base';
import CustomHeader from '../components/CustomHeader';
import ScreenWrapper from '../components/ScreenWrapper';
import QRCode from 'react-native-qrcode-svg';
import colors from '../config/colors';
import axios from 'axios';
import baseUrl from '../utility/baseUrl';
import useStore from '../hooks/useStore';
import Loader from '../components/Loader';

const QRScreen = ({ navigation }) => {
  const toast = useToast();
  const member = useStore((state) => state.member);
  const [qrCodes, setQrCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const result = await axios.post(`${baseUrl}/member/get-by-email-otp`, {
        email:
          member.userType === 'secondary'
            ? member.mainAccountEmail
            : member.email,
        otp:
          member.userType === 'secondary' ? member.mainAccountOTP : member.otp,
      });
      if (member.userType === 'individual') {
        setQrCodes([
          {
            name: result.data.name,
            id: result.data.id,
            birthdate: result.data.birthdate,
          },
        ]);
      } else if (member.userType === 'family') {
        const family = [];
        family.push({
          name: result.data.name,
          id: result.data.id,
          birthdate: result.data.birthdate,
        });

        result.data.children.forEach((child) => {
          family.push({
            name: child.name,
            id: result.data.id,
            birthdate: child.birthdate,
          });
        });
        setQrCodes(family);
      } else {
        const family = [];
        family.push({
          name: member.name,
          id: member.id,
          birthdate: member.birthdate,
        });

        result.data.children.forEach((child) => {
          family.push({
            name: child.name,
            id: result.data.id,
            birthdate: child.birthdate,
          });
        });
        setQrCodes(family);
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScreenWrapper>
      <CustomHeader navigation={navigation} title='MY ROYAL' />
      {loading ? (
        <Loader />
      ) : (
        <Flex justifyContent='center' alignItems='center' height='100%'>
          <FlatList
            nestedScrollEnabled={true}
            px='4'
            data={qrCodes}
            renderItem={({ item }) => (
              <Flex justifyContent='center' alignItems='center' m='4'>
                <View position='relative'>
                  <Image
                    left='0'
                    size='md'
                    width='300'
                    height='300'
                    resizeMode='contain'
                    source={{
                      // uri: 'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2Foutput-onlinegiftools.gif?alt=media&token=7379ad3f-537f-4c52-aadd-af0c6c0ea2ba',
                      uri: 'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2Fgif.gif?alt=media&token=7bb77c8c-db8f-4c6f-bd0a-107f4348c611',
                    }}
                    alt={'qr'}
                  />
                  <View position='absolute' style={{ top: 50, left: 53 }}>
                    <QRCode value={item.id} size={200} />
                  </View>
                </View>
                <View
                  py='6'
                  px='4'
                  mt='4'
                  width='100%'
                  backgroundColor={colors.primary}
                  borderRadius='10'
                >
                  <Flex flexDirection='row' alignItems='center'>
                    <Image
                      left='0'
                      size='md'
                      width='20'
                      height='20'
                      resizeMode='contain'
                      source={{
                        uri: 'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2Froyal.png?alt=media&token=5fb3934a-e8f0-4be4-a25f-7868938cc343',
                      }}
                      alt={'qr'}
                    />
                    <View ml='2' flexGrow={'1'}>
                      <View mb='2'>
                        <Text fontSize='sm' color='white'>
                          Card Holder Name
                        </Text>
                        <Text fontSize='sm' bold color='white'>
                          {item.name}
                        </Text>
                      </View>
                      <Flex justifyContent='space-between' flexDirection='row'>
                        <View>
                          <Text fontSize='sm' color='white'>
                            Birthday
                          </Text>
                          <Text fontSize='sm' bold color='white'>
                            {item.birthdate}
                          </Text>
                        </View>
                        <View>
                          <Text fontSize='sm' color='white'>
                            Expiry
                          </Text>
                          <Text fontSize='sm' bold color='white'>
                            {member.expiryDate}
                          </Text>
                        </View>
                      </Flex>
                    </View>
                  </Flex>
                </View>
              </Flex>
            )}
            keyExtractor={(item) => item.id + item.birthdate}
            horizontal
            showsHorizontalScrollIndicator={false}
            // refreshing={refreshing}
            // onRefresh={() => {
            //   fetchData();
            // }}
          />
        </Flex>
      )}
    </ScreenWrapper>
  );
};

export default QRScreen;
