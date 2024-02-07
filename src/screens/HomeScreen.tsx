import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useGetStores} from '../hooks/useGetStores';
import MapView, {Marker} from 'react-native-maps';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/MainNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import IkpCarousel from '../components/IkpCarousel';
import useGeolocation from '../hooks/useGeolocation';
import {colors} from '../stylesheet/colors';
import Loader from '../components/Loader';

type HomeScreenProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const mapRef = useRef(null);
  const {data, isLoading} = useGetStores();
  const {currentPosition, permission} = useGeolocation();

  useEffect(() => {
    if (!isLoading && data && data.length > 0) {
      const firstStore = data[0];
      mapRef.current.animateToRegion(firstStore.address.coordinate, 500);
    }
  }, [isLoading, data]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.primaryColor}}>
      <View style={styles.mainContainer}>
        {isLoading && <Loader />}

        <MapView
          ref={mapRef}
          style={styles.mapView}
          initialRegion={{
            ...currentPosition,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}>
          {data?.map(store => (
            <Marker
              key={store.id}
              title={store.name}
              coordinate={{
                latitude: store.address.coordinate.latitude,
                longitude: store.address.coordinate.longitude,
              }}
              description={store.address.direction}>
              <Image
                source={require('../../assets/images/store-marker.png')}
                style={{width: 45, height: 45}}
                resizeMode="contain"
              />
            </Marker>
          ))}

          <Image
            style={{width: '50%'}}
            source={require('../../assets/images/iskaypet-logoo.png')}
            resizeMode="contain"
          />
        </MapView>

        {data ? (
          <IkpCarousel
            data={data}
            mapRef={mapRef}
            navigation={navigation}
            currentPosition={currentPosition}
            permission={permission}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  mapView: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
});
