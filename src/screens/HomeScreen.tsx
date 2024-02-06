import {StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import {useGetStores} from '../hooks/useGetStores';
import MapView, {Marker} from 'react-native-maps';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/MainNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import IkpCarousel from '../components/IkpCarousel';

type HomeScreenProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const mapRef = useRef(null);
  const {data} = useGetStores();

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
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
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
    backgroundColor: '#492D2D',
  },
});
