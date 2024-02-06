import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {calcularDistancia} from '../utils/getDistance';
import useGeolocation from '../hooks/useGeolocation';
import {Stores} from '../services/stores/storesService';

type CarouselProps = {
  data: Stores[];
  mapRef: any;
  navigation: any;
};

const IkpCarousel: React.FC<CarouselProps> = ({data, mapRef, navigation}) => {
  const currentPosition = useGeolocation();

  const onStoreChange = (index: number) => {
    const store = data[index];
    const mapRegion = {
      latitude: parseFloat(store.address.coordinate.lat),
      longitude: parseFloat(store.address.coordinate.lng),
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };
    mapRef.current.animateToRegion(mapRegion, 500);
  };

  const renderItem = ({item, index}: {item: Stores; index: number}) => {
    const distancia = calcularDistancia(
      currentPosition.latitud,
      currentPosition.longitud,
      parseFloat(item.address.coordinate.lat),
      parseFloat(item.address.coordinate.lng),
    ).toFixed(2);

    return (
      <View key={index} style={styles.carouselItem}>
        <Image
          source={require('../../assets/images/tiendanimal.jpeg')}
          style={styles.carouselImage}
        />
        <View style={styles.textCarouselContainer}>
          <Text style={styles.carouselText}>{item.name}</Text>
          <Text style={styles.carouselText}>Distancia: {distancia} km</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Store')}>
            <Text style={styles.carouselText}>Ver tienda</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.carouselContainer}>
      <Carousel
        data={data ?? []}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={300}
        onSnapToItem={onStoreChange}
      />
    </View>
  );
};

export default IkpCarousel;

const styles = StyleSheet.create({
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
  carouselImage: {
    height: 100,
    width: 100,
    marginRight: 10,
  },
  textCarouselContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  carouselText: {
    color: 'white',
  },
});
