import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useGetStores} from '../hooks/useGetStores';
import MapView, {Marker} from 'react-native-maps';
import Carousel from 'react-native-snap-carousel';
import Geolocation from '@react-native-community/geolocation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/MainNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';

type HomeScreenProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const mapRef = useRef(null);

  const {data} = useGetStores();

  useEffect(() => {
    Geolocation.getCurrentPosition(info => console.log(info));
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={styles.carouselItem}>
        <Image
          source={require('../../assets/images/tiendanimal.jpeg')}
          style={{height: 100, width: 100, marginRight: 10}}
        />
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'white'}}>{item.name}</Text>
          <Text style={{color: 'white'}}>Distancia: 10 km</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Store')}>
            <Text style={{color: 'white'}}>Ver tienda</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onStoreChange = index => {
    setActiveIndex(index);

    const store = data[index];
    const mapRegion = {
      latitude: parseFloat(store.address.coordinate.lat),
      longitude: parseFloat(store.address.coordinate.lng),
      latitudeDelta: 0.04,
      longitudeDelta: 0.04,
    };
    mapRef.current.animateToRegion(mapRegion, 500);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.mainContainer}>
        {/* <Image
          source={require('../../assets/images/iskaypet-logo.png')}
          resizeMode="center"
        /> */}
        <MapView
          ref={mapRef}
          style={{height: '100%', width: '100%'}}
          initialRegion={{
            latitude: 36.6834695,
            longitude: -4.4706081,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}>
          {data?.map(store => (
            <Marker
              key={store.id}
              title={store.name}
              coordinate={{
                latitude: parseFloat(store.address.coordinate.lat),
                longitude: parseFloat(store.address.coordinate.lng),
              }}
              description={store.address.direction}
            />
          ))}
        </MapView>

        <View style={styles.carouselContainer}>
          <Carousel
            data={data ?? []}
            renderItem={renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={300}
            onSnapToItem={onStoreChange}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#492D2D',
  },
  carouselContainer: {
    position: 'absolute',
    bottom: 10,
  },
  carouselItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,10, 0.7)',
    padding: 10,
    borderRadius: 10,
  },
});
