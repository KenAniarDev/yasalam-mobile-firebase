import React, { useEffect, useState } from 'react';
import {
  View,
  Pressable,
  Text,
  Flex,
  Button,
  Modal,
  ScrollView,
} from 'native-base';
import { TextInput, StyleSheet } from 'react-native';
import colors from '../config/colors';
import { AntDesign } from '@expo/vector-icons';
import Collapsible from 'react-native-collapsible';
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button';
import { Ionicons } from '@expo/vector-icons';
import useStore from '../hooks/useStore';

const YasalamSearch = () => {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <View mx='3' my='6'>
        <Flex direction='row' alignItems='center'>
          <View style={styles.inputContainer}>
            <Pressable>
              <AntDesign name='search1' size={24} color='black' />
            </Pressable>
            <TextInput
              placeholderTextColor={colors.medium}
              style={styles.input}
              placeholder='Search Here'
              placeholderTextColor='#333'
              value={text}
              onChangeText={(value) => setText(value)}
              onSubmitEditing={() => {}}
              returnKeyType={'search'}
            />
          </View>
          <Pressable style={styles.searchIcon} onPress={openModal}>
            <Text style={styles.filterText}>Filter</Text>
          </Pressable>
        </Flex>
      </View>
      <ModalComponent open={open} setOpen={setOpen} />
    </>
  );
};

const ModalComponent = ({ open, setOpen }) => {
  const categories = useStore((state) => state.categories);
  const regions = useStore((state) => state.regions);
  const features = useStore((state) => state.features);

  const [cat, setCat] = useState(categories[0]);
  const [isCollapsed, setIsCollapsed] = useState({
    category: false,
    region: false,
    feature: false,
  });

  useEffect(() => {
    if (categories[0].name !== 'All') {
      categories.unshift({
        id: '8172431808asd80da8s098123081231329',
        name: 'All',
      });
    }
    if (regions[0].name !== 'All') {
      regions.unshift({
        id: '8172431808asd80da8s098123081231329',
        name: 'All',
      });
    }
    if (features[0].name !== 'All') {
      features.unshift({
        id: '8172431808asd80da8s098123081231329',
        name: 'All',
      });
    }
  }, []);

  return (
    <>
      <Modal isOpen={open} onClose={() => setOpen(false)} mt={12}>
        <Modal.Content
          backgroundColor='#F6F6F6'
          borderRadius='20'
          maxWidth='400'
        >
          <Modal.Header>
            <View style={{ position: 'relative' }}>
              <Text fontSize='2xl' bold letterSpacing='2'>
                FILTER
              </Text>
              <Pressable
                style={{ position: 'absolute', right: 0 }}
                onPress={() => {
                  setOpen(false);
                }}
              >
                <AntDesign
                  name='closecircleo'
                  size={30}
                  color={colors.secondary}
                />
              </Pressable>
            </View>
          </Modal.Header>
          <Modal.Body>
            <ScrollView>
              <Flex
                alignItem='space-between'
                justifyContent='center'
                backgroundColor='white'
                px='3'
                borderRadius='20'
              >
                {/* Category */}
                <Pressable
                  py='4'
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  onPress={() => {
                    setIsCollapsed({
                      ...isCollapsed,
                      category: !isCollapsed.category,
                    });
                  }}
                >
                  <Text fontSize='xl' bold>
                    Categories
                  </Text>
                  <Ionicons
                    name='caret-up-circle-outline'
                    size={26}
                    color={colors.secondary}
                  />
                </Pressable>
                <Collapsible collapsed={isCollapsed.category}>
                  <RadioButtonGroup
                    containerStyle={{
                      width: '100%',
                    }}
                    selected={cat}
                    onSelected={(value) => setCat(value)}
                    radioBackground='#17B9CF'
                    size={20}
                  >
                    {categories.map((item, i) => (
                      <RadioButtonItem
                        style={{ marginVertical: 5 }}
                        key={i}
                        value={item.id}
                        label={<Text fontSize='md'>{item.name}</Text>}
                      />
                    ))}
                  </RadioButtonGroup>
                </Collapsible>
                {/* Region */}
                <Pressable
                  py='4'
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  onPress={() => {
                    setIsCollapsed({
                      ...isCollapsed,
                      region: !isCollapsed.region,
                    });
                  }}
                >
                  <Text fontSize='xl' bold>
                    Region
                  </Text>
                  <Ionicons
                    name='caret-up-circle-outline'
                    size={26}
                    color={colors.secondary}
                  />
                </Pressable>
                <Collapsible collapsed={isCollapsed.region}>
                  <RadioButtonGroup
                    containerStyle={{
                      width: '100%',
                    }}
                    selected={cat}
                    onSelected={(value) => setCat(value)}
                    radioBackground='#17B9CF'
                    size={20}
                  >
                    {regions.map((item, i) => (
                      <RadioButtonItem
                        style={{ marginVertical: 5 }}
                        key={i}
                        value={item.id}
                        label={<Text fontSize='md'>{item.name}</Text>}
                      />
                    ))}
                  </RadioButtonGroup>
                </Collapsible>
                {/* Feature */}
                <Pressable
                  py='4'
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  onPress={() => {
                    setIsCollapsed({
                      ...isCollapsed,
                      feature: !isCollapsed.feature,
                    });
                  }}
                >
                  <Text fontSize='xl' bold>
                    Feature
                  </Text>
                  <Ionicons
                    name='caret-up-circle-outline'
                    size={26}
                    color={colors.secondary}
                  />
                </Pressable>
                <Collapsible collapsed={isCollapsed.feature}>
                  <RadioButtonGroup
                    containerStyle={{
                      width: '100%',
                    }}
                    selected={cat}
                    onSelected={(value) => setCat(value)}
                    radioBackground='#17B9CF'
                    size={20}
                  >
                    {features.map((item, i) => (
                      <RadioButtonItem
                        style={{ marginVertical: 5 }}
                        key={i}
                        value={item.id}
                        label={<Text fontSize='md'>{item.name}</Text>}
                      />
                    ))}
                  </RadioButtonGroup>
                </Collapsible>
              </Flex>
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <Button
              backgroundColor={colors.secondary}
              borderRadius='20'
              width='100%'
              py='3'
              onPress={() => {
                setOpen(false);
              }}
            >
              <Text fontSize='lg' color='white' letterSpacing='2'>
                SEARCH
              </Text>
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: 'white',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 14,
  },
  input: {
    width: '100%',
    color: '#333',
    fontSize: 18,
    paddingLeft: 6,
  },
  searchIcon: {
    justifyContent: 'center',
    height: 50,
    borderRadius: 30,
    marginLeft: 10,
    paddingHorizontal: 30,
    backgroundColor: 'white',
  },
  filterText: {
    color: '#333',
    fontSize: 18,
  },
});

export default YasalamSearch;
