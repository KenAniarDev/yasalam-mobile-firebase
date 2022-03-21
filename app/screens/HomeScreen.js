import { useEffect, useState } from 'react';
import { ScrollView } from 'native-base';
import useStore from '../hooks/useStore';
import ScreenWrapper from '../components/ScreenWrapper';
import HomeBanner from '../components/HomeBanner';
import Tabs from '../components/Tabs';
import HomeOutletList from '../components/HomeOutletList';
import {
  getCategories,
  getOutlets,
  getRegions,
  getFeatures,
} from '../utility/firebase';
import Loader from '../components/Loader';

const HomeScreen = ({ navigation }) => {
  const setData = useStore((state) => state.setData);
  const outlets = useStore((state) => state.outlets);
  const [loading, setLoading] = useState(true);

  const [categoryOutlets, setCategoryOutlets] = useState({
    hotels: [], //badd5250-87e5-11ec-83b7-978d5a8626ab
    healthClubs: [], //bc00eac0-87e5-11ec-83b7-978d5a8626ab
    fitnessSportCenter: [], //bdd360d0-87e5-11ec-83b7-978d5a8626ab
    sportAcademy: [], //bbb93360-87e5-11ec-83b7-978d5a8626ab
    marineSport: [], //b9265380-87e5-11ec-83b7-978d5a8626ab
  });

  const fetchData = async () => {
    const outletDb = await getOutlets();
    const categoryDb = await getCategories();
    const regionDb = await getRegions();
    const featureDb = await getFeatures();
    setData(outletDb, categoryDb, regionDb, featureDb);
    setLoading(false);
  };
  useEffect(() => {
    if (outlets.length === 0) {
      fetchData();
    } else {
      setLoading(false);
    }
    const hotels = outlets.filter(
      (e) => e.categoryId === 'badd5250-87e5-11ec-83b7-978d5a8626ab'
    );
    const healthClubs = outlets.filter(
      (e) => e.categoryId === 'bc00eac0-87e5-11ec-83b7-978d5a8626ab'
    );
    const fitnessSportCenter = outlets.filter(
      (e) => e.categoryId === 'bdd360d0-87e5-11ec-83b7-978d5a8626ab'
    );
    const sportAcademy = outlets.filter(
      (e) => e.categoryId === 'bbb93360-87e5-11ec-83b7-978d5a8626ab'
    );
    const marineSport = outlets.filter(
      (e) => e.categoryId === 'b9265380-87e5-11ec-83b7-978d5a8626ab'
    );

    setCategoryOutlets({
      hotels,
      healthClubs,
      fitnessSportCenter,
      sportAcademy,
      marineSport,
    });
  }, [outlets]);

  return (
    <ScreenWrapper backgroundColor='white'>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView>
          <HomeBanner navigation={navigation} />
          <Tabs active='home' navigation={navigation} location='home' />
          <HomeOutletList
            data={categoryOutlets.hotels}
            navigation={navigation}
            title='Hotel'
          />
          <HomeOutletList
            data={categoryOutlets.healthClubs}
            navigation={navigation}
            title='Health Clubs '
          />
          <HomeOutletList
            data={categoryOutlets.fitnessSportCenter}
            navigation={navigation}
            title='Fitness Sport Center '
          />
          <HomeOutletList
            data={categoryOutlets.sportAcademy}
            navigation={navigation}
            title='Sport Academy'
          />
          <HomeOutletList
            data={categoryOutlets.marineSport}
            navigation={navigation}
            title='Marine Sport'
          />
        </ScrollView>
      )}
    </ScreenWrapper>
  );
};

export default HomeScreen;
