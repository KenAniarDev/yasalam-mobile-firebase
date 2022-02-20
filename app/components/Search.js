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

const regionOptions = [
  { key: 'All', value: 'all_region' },
  { key: 'Dubai', value: 'dubai' },
  { key: 'Abu Dhabi', value: 'abu dhabi' },
  { key: 'Al Ain', value: 'al ain' },
  { key: 'Sharjah', value: 'sharjah' },
  { key: 'Ajman', value: 'ajman' },
  { key: 'Ras Alkhaimah', value: 'ras alkhaimah' },
  { key: 'Fujairah', value: 'fujairah' },
  { key: 'Um Alquwain', value: 'um alquwain' },
];

const Search = () => {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  useEffect(() => {}, []);

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
  const [isCollapsed, setIsCollapsed] = useState({
    category: false,
    region: false,
    feature: false,
  });
  const [region, setRegion] = useState('all_region');
  const [current, setCurrent] = useState('test');

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
                    Regions
                  </Text>
                  <Ionicons
                    name='caret-up-circle-outline'
                    size={26}
                    color={colors.secondary}
                  />
                </Pressable>
                <Collapsible collapsed={isCollapsed.region}>
                  <RadioButtonGroup
                    containerStyle={{ marginBottom: 10 }}
                    selected={current}
                    onSelected={(value) => setCurrent(value)}
                    radioBackground={colors.secondary}
                  >
                    <RadioButtonItem
                      value='test1'
                      label={
                        <Text fontSize='md' pl='1' mb='1' numberOfLines={1}>
                          Example passing
                        </Text>
                      }
                    />
                    <RadioButtonItem
                      value='test'
                      label={
                        <Text fontSize='md' pl='1' mb='1' numberOfLines={1}>
                          Example passing
                        </Text>
                      }
                    />
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
                FILTER
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

export default Search;
