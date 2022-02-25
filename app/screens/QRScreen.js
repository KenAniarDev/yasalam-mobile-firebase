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
      <CustomHeader navigation={navigation} title='QR CODE PAGE' />
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
                <Text fontSize='3xl' bold>
                  My YaSalam
                </Text>
                <View position='relative'>
                  <Image
                    left='0'
                    size='md'
                    width='300'
                    height='300'
                    resizeMode='contain'
                    source={{
                      uri: 'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2Foutput-onlinegiftools.gif?alt=media&token=7379ad3f-537f-4c52-aadd-af0c6c0ea2ba',
                    }}
                    alt={'qr'}
                  />
                  <View position='absolute' style={{ top: 50, left: 53 }}>
                    <QRCode value={item.id} size={200} />
                  </View>
                </View>
                <View
                  p='5'
                  mt='4'
                  width='100%'
                  backgroundColor='white'
                  borderRadius='26'
                >
                  <Flex flexDirection='row' justifyContent='space-between'>
                    <Text fontSize='sm' color='gray.500'>
                      Name
                    </Text>
                    <Text fontSize='sm' bold color={colors.secondary}>
                      {item.name}
                    </Text>
                  </Flex>
                  <Flex
                    flexDirection='row'
                    justifyContent='space-between'
                    my='2'
                  >
                    <Text fontSize='sm' color='gray.500'>
                      Birthday
                    </Text>
                    <Text fontSize='sm' bold color={colors.yellow}>
                      {item.birthdate}
                    </Text>
                  </Flex>
                  <Flex flexDirection='row' justifyContent='space-between'>
                    <Text fontSize='sm' color='gray.500'>
                      Expiry
                    </Text>
                    <Text fontSize='sm' bold color={colors.primary}>
                      {member.expiryDate}
                    </Text>
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
