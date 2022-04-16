import { useEffect, useState, useCallback } from 'react';
import { FlatList, Text, Flex, Image, View, Pressable } from 'native-base';
import ScreenWrapper from '../components/ScreenWrapper';
import Tabs from '../components/Tabs';
import SearchWithFilter from '../components/SearchWithFilter';
import colors from '../config/colors';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../utility/firebase';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import useStore from '../hooks/useStore';
const YasalamScreen = ({ navigation }) => {
  const setOutlets = useStore((state) => state.setOutlets);
  const currentDate = moment(new Date()).format('YYYY-MM-DD');

  const [yasalamOutlets, setYasalamOutlets] = useState([]);
  const [filteredOutlets, setFilteredOutlets] = useState([]);

  const [filterVal, setFilterVal] = useState({
    searchText: '',
    category: '',
    region: '',
    feature: '',
  });

  const handleSearch = ({ searchText, category, region, feature }) => {
    const searchTextRegex = new RegExp(`${searchText}`, 'gi');
    const categoryRegex = new RegExp(`${category}`, 'gi');
    const regionRegex = new RegExp(`${region}`, 'gi');
    const featureRegex = new RegExp(`${feature}`, 'gi');

    const filtered = yasalamOutlets.filter((val) => {
      if (
        val.name.match(searchTextRegex) &&
        val.categoryId.match(categoryRegex) &&
        val.regionId.match(regionRegex) &&
        val.featureId.match(featureRegex)
      ) {
        return val;
      }
    });
    setFilteredOutlets(filtered);
  };

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = onSnapshot(collection(db, 'outlets'), (snapshot) => {
        let data = [];
        let alldata = [];
        snapshot.docs.forEach((doc) => {
          if (doc.data().yasalam) {
            data.push({ ...doc.data(), id: doc.id });
          }
          alldata.push({ ...doc.data(), id: doc.id });
        });
        setOutlets(alldata);
        setYasalamOutlets(data);
        setFilteredOutlets(data);
      });
      return () => {
        unsubscribe();
      };
    }, [])
  );
  return (
    <ScreenWrapper>
      <Tabs active='yasalam' navigation={navigation} />
      <SearchWithFilter
        handleSearch={handleSearch}
        filterVal={filterVal}
        setFilterVal={setFilterVal}
      />
      <View>
        <FlatList
          px='4'
          width='100%'
          data={filteredOutlets}
          extraData={yasalamOutlets}
          renderItem={({ item }) => {
            if (item.isBranch) {
              return <></>;
            }
            return (
              <Pressable
                onPress={() => navigation.navigate('SingleOutlet', { item })}
              >
                <Flex
                  backgroundColor='white'
                  flexDirection='row'
                  alignItems='center'
                  borderRadius='20'
                  py='10'
                  mb='4'
                  position='relative'
                >
                  <Image
                    size='md'
                    width='150'
                    resizeMode='contain'
                    source={{
                      uri: item.logo,
                    }}
                    alt={'outlet ' + item.name}
                  />
                  <View>
                    <Text fontSize='lg' style={{ maxWidth: 200 }}>
                      {item.name}
                    </Text>
                    <Text fontSize='sm' color='gray' style={{ maxWidth: 200 }}>
                      {item.address}
                    </Text>
                  </View>

                  <Flex
                    flexDirection='row'
                    position='absolute'
                    right='5'
                    top='1'
                  >
                    <Text fontSize='2xl' color={colors.secondary}>
                      {item.currentVisitDate ? (
                        <>
                          {item.currentVisitDate !== currentDate ? (
                            10
                          ) : (
                            <>{item.visits ? 10 - item.visits : 10}</>
                          )}
                        </>
                      ) : (
                        10
                      )}
                    </Text>
                    <Text mt='3'>/10</Text>
                  </Flex>
                  <Flex
                    flexDirection='row'
                    alignItems='center'
                    position='absolute'
                    right='5'
                    bottom='3'
                  >
                    <Text color={colors.secondary}>{item.regionName}</Text>
                    <Text mx='2'>|</Text>
                    <Text color={colors.yellow}>{item.categoryName}</Text>
                    <Text mx='2'>|</Text>
                    <Text color={colors.primary}>{item.featureName}</Text>
                  </Flex>
                </Flex>
              </Pressable>
            );
          }}
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

export default YasalamScreen;
