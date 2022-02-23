import { useState, useEffect } from 'react';
import {
  Text,
  Flex,
  View,
  FlatList,
  Image,
  useToast,
  Pressable,
} from 'native-base';
import CustomHeader from '../components/CustomHeader';
import ScreenWrapper from '../components/ScreenWrapper';
import colors from '../config/colors';
import Search from '../components/SearchWithFilter';
import { getProducts } from '../utility/firebase';

const ShopScreen = ({ navigation }) => {
  const toast = useToast();
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const productsDB = await getProducts();
      setProducts(productsDB);
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Error',
        description: 'Error please try again',
        status: 'error',
        placement: 'top',
      });
    }
  };

  useEffect(() => {
    fetchData();
    return () => setProducts([]);
  }, []);
  return (
    <ScreenWrapper>
      <CustomHeader navigation={navigation} title='Shop' />
      <View>
        <FlatList
          p='4'
          width='100%'
          data={products}
          renderItem={({ item }) => (
            <View backgroundColor='white' borderRadius='20' p='2' mb='4'>
              <Flex flexDirection='row' alignItems='center'>
                <Image
                  size='md'
                  width='120'
                  resizeMode='contain'
                  source={{
                    uri: item.image,
                  }}
                  alt={'outlet ' + item.name}
                />
                <View pl='2' flexGrow='1'>
                  <Text fontSize='lg' bold>
                    {item.name}
                  </Text>
                  <Text fontSize='sm' color='gray' width='60%'>
                    {item.description}
                  </Text>

                  <Flex
                    flexDirection='row'
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    <Flex flexDirection='row' alignItems='center'>
                      <Text color='coolGray.700' mr='1' bold>
                        Quantity
                      </Text>
                      <Text fontSize='lg' color={colors.yellow} bold>
                        {item.quantity}
                      </Text>
                    </Flex>
                    <Flex flexDirection='row' alignItems='center'>
                      <Text color='coolGray.700' mr='1' bold>
                        Points
                      </Text>
                      <Text fontSize='lg' color={colors.secondary} bold>
                        {item.points}
                      </Text>
                    </Flex>
                  </Flex>
                </View>
              </Flex>
              <Flex flexDirection='row' justifyContent='center' mt='4'>
                <Pressable
                  width='100%'
                  borderRadius='10'
                  px='10'
                  py='2'
                  backgroundColor={colors.primary}
                  onPress={() => {}}
                >
                  <Text textAlign='center' color='white' fontSize='xl'>
                    BUY WITH POINTS
                  </Text>
                </Pressable>
              </Flex>
            </View>
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          // refreshing={refreshing}
          // onRefresh={() => {
          //   fetchData();
          // }}
        />
      </View>
    </ScreenWrapper>
  );
};

export default ShopScreen;
