import { useEffect, useState } from 'react';
import { FlatList, Text, Flex, Image, View, Pressable } from 'native-base';
import ScreenWrapper from '../components/ScreenWrapper';
import Tabs from '../components/Tabs';
import SearchWithFilter from '../components/SearchWithFilter';
import colors from '../config/colors';
import useStore from '../hooks/useStore';

const ExperienceScreen = ({ navigation }) => {
  const outlets = useStore((state) => state.outlets);
  const [experienceOutlets, setExperienceOutlets] = useState([]);
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

    const filtered = experienceOutlets.filter((val) => {
      if (
        val.name.match(searchTextRegex) &&
        val.categoryId.match(categoryRegex) &&
        val.regionId.match(regionRegex) &&
        val.featureId.match(featureRegex)
      ) {
        console.log('left here');
        return val;
      }
    });
    setFilteredOutlets(filtered);
  };

  useEffect(() => {
    const experience = outlets.filter((e) => e.experience);
    setExperienceOutlets(experience);
    setFilteredOutlets(experience);
  }, [outlets]);

  return (
    <ScreenWrapper>
      <Tabs active='experience' navigation={navigation} />
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
          renderItem={({ item }) => (
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

export default ExperienceScreen;
