// hooks/useGeolocation.ts
import {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

interface GeolocationError {
  code: number;
  message: string;
}

const useGeolocation = () => {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const [error, setError] = useState<GeolocationError | null>(null);

  useEffect(() => {
    const onLocationSuccess = info => {
      const {latitude, longitude} = info.coords;
      console.log('Exito obteniendo la posición: ', info.coords);
      setCurrentPosition({latitude: latitude, longitude: longitude});
    };

    const onLocationError = (error: GeolocationError) => {
      console.log('Error obteniendo la posición: ', error);
      setError(error);
    };

    const watchId = Geolocation.watchPosition(
      onLocationSuccess,
      onLocationError,
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  const checkAndRequestPermission = async () => {
    const result = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    console.log('result', result);
    if (result === RESULTS.DENIED) {
      try {
        const permissionResult2 = await request(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );
        const permissionResult = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);

        if (
          permissionResult === RESULTS.GRANTED ||
          permissionResult2 === RESULTS.GRANTED
        ) {
          console.log('Permiso otorgado');
        } else {
          console.log('Permiso denegado');
          // Puedes manejar el caso cuando el usuario deniega el permiso
        }
      } catch (error) {
        console.error('Error al solicitar permisos: ', error);
      }
    }
  };

  return {currentPosition, error, checkAndRequestPermission};
};

export default useGeolocation;
