import {Image, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import {useGetStores} from '../hooks/useGetStores';
import MapView, {Marker} from 'react-native-maps';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/MainNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import IkpCarousel from '../components/IkpCarousel';
import useGeolocation from '../hooks/useGeolocation';
import {colors} from '../stylesheet/colors';

type HomeScreenProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const mapRef = useRef(null);
  const {data} = useGetStores();
  const currentPosition = useGeolocation();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.primaryColor}}>
      <View style={styles.mainContainer}>
        {data ? (
          <MapView
            ref={mapRef}
            style={styles.mapView}
            initialRegion={{
              latitude: data
                ? data[0].address.coordinate.latitude
                : currentPosition.latitude,
              longitude: data
                ? data[0].address.coordinate.longitude
                : currentPosition.longitude,
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
                  source={require('../../assets/images/pets-pin.png')}
                  style={{width: 55, height: 55}}
                />
              </Marker>
            ))}

            <Image
              style={{width: '50%'}}
              source={require('../../assets/images/iskaypet-logoo.png')}
              resizeMode="contain"
            />
          </MapView>
        ) : null}
        {data ? (
          <IkpCarousel data={data} mapRef={mapRef} navigation={navigation} />
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
