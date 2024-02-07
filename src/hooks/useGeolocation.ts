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

  const [error, setError] = useState<string | null>(null);
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    checkAndRequestPermission();
  }, []);

  const checkAndRequestPermission = async () => {
    const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    console.log('result', result);
    if (['blocked', 'denied'].includes(result)) {
      console.log('entro aca');
      setError('ERROR');
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        console.log('Exito obteniendo la posición: ', info.coords);
        setCurrentPosition({latitude: latitude, longitude: longitude});
        setPermission(true);
      },
      (error: GeolocationError) => {
        console.log('Error obteniendo la posición: ', error);
        setPermission(false);
      },
    );
  };

  return {currentPosition, error, permission};
};

export default useGeolocation;
