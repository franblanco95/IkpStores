// hooks/useGeolocation.ts
import {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, request} from 'react-native-permissions';
import {AppState} from 'react-native';

interface GeolocationError {
  code: number;
  message: string;
}

const useGeolocation = () => {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const [permission, setPermission] = useState(false);

  useEffect(() => {
    const appStateChangeHandler = (newState: string) => {
      if (newState === 'active') {
        checkAndRequestPermission();
      }
    };

    const appStateSubscription = AppState.addEventListener(
      'change',
      appStateChangeHandler,
    );
    return () => {
      appStateSubscription.remove();
    };
  }, []);

  const checkAndRequestPermission = async () => {
    const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (['blocked', 'denied'].includes(result)) {
      setPermission(false);
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      info => {
        const {latitude, longitude} = info.coords;
        setCurrentPosition({latitude: latitude, longitude: longitude});
        setPermission(true);
      },
      (error: GeolocationError) => {
        console.error('Error: ', error);
        setPermission(false);
      },
    );
  };

  return {currentPosition, permission};
};

export default useGeolocation;
