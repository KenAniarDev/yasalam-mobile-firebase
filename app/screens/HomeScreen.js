import React from 'react';
import { ScrollView } from 'native-base';
import ScreenWrapper from '../components/ScreenWrapper';
import HomeBanner from '../components/HomeBanner';
import Tabs from '../components/Tabs';
import HomeOutletList from '../components/HomeOutletList';

const data = [
  {
    id: 1,
    name: 'Myles Nunez',
    image:
      'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2FRectangle%20364.png?alt=media&token=7eb07970-5057-4f4a-962d-4acb4a667a46',
  },
  {
    id: 2,
    name: 'Myles Nunez',
    image:
      'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2FRectangle%20364.png?alt=media&token=7eb07970-5057-4f4a-962d-4acb4a667a46',
  },
  {
    id: 3,
    name: 'Myles Nunez',
    image:
      'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2FRectangle%20364.png?alt=media&token=7eb07970-5057-4f4a-962d-4acb4a667a46',
  },
  {
    id: 4,
    name: 'Myles Nunez',
    image:
      'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2FRectangle%20364.png?alt=media&token=7eb07970-5057-4f4a-962d-4acb4a667a46',
  },
  {
    id: 5,
    name: 'Myles Nunez',
    image:
      'https://firebasestorage.googleapis.com/v0/b/yasalam-55cc7.appspot.com/o/mobile-app-images%2FRectangle%20364.png?alt=media&token=7eb07970-5057-4f4a-962d-4acb4a667a46',
  },
];

const HomeScreen = ({ navigation }) => (
  <ScreenWrapper>
    <ScrollView>
      <HomeBanner navigation={navigation} />
      <Tabs active='home' navigation={navigation} />
      <HomeOutletList data={data} navigation={navigation} />
      <HomeOutletList data={data} navigation={navigation} />
      <HomeOutletList data={data} navigation={navigation} />
      <HomeOutletList data={data} navigation={navigation} />
      <HomeOutletList data={data} navigation={navigation} />
    </ScrollView>
  </ScreenWrapper>
);

export default HomeScreen;
