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
import {calculateDistance} from '../utils/getDistance';
import useGeolocation from '../hooks/useGeolocation';
import {Store} from '../services/stores/storesTranslators';

type CarouselProps = {
  data: Store[];
  mapRef: any;
  navigation: any;
};

const IkpCarousel: React.FC<CarouselProps> = ({data, mapRef, navigation}) => {
  const {currentPosition, error} = useGeolocation();

  const onStoreChange = (index: number) => {
    const store = data[index];
    mapRef.current.animateToRegion(store.address.coordinate, 500);
  };

  const renderItem = ({item, index}: {item: Store; index: number}) => {
    const distance = calculateDistance(
      currentPosition.latitude,
      currentPosition.longitude,
      item.address.coordinate.latitude,
      item.address.coordinate.longitude,
    ).toFixed(2);

    return (
      <View key={index} style={styles.carouselItem}>
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.carouselImage}
        />
        <View style={styles.textCarouselContainer}>
          <Text style={styles.carouselTitle}>{item.name}</Text>
          {!error && (
            <Text style={styles.carouselText}>Distance: {distance} km</Text>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate('Store', {store: item})}>
            <Text style={styles.carouselText}>Visit store</Text>
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
  carouselTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  carouselText: {
    color: 'white',
  },
});
