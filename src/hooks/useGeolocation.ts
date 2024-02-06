// hooks/useGeolocation.ts
import {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';

const useGeolocation = () => {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const onLocationSuccess = info => {
      const {latitude, longitude} = info.coords;
      setCurrentPosition({latitude: latitude, longitude: longitude});
    };

    const onLocationError = error => {
      console.log('Error obteniendo la posición: ', error);
    };

    const watchId = Geolocation.watchPosition(
      onLocationSuccess,
      onLocationError,
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  return currentPosition;
};

export default useGeolocation;
