import { Image, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import OutlineButton from '../ui/OutlineButton';
import { Colors } from '../../style/colors';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location';
import { requestThePersmissions } from '../../utils/utils';
import { getAdddress, getLocationPreview } from '../../utils/location';
import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RootStackParamList } from '../../App';
const LocationPicker: React.FC<{
  onLocationTaken: (object: {
    lat: number;
    lng: number;
    address: string;
  }) => void;
}> = ({ onLocationTaken }) => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'AddPlace'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'AddPlace'>>();
  const isFocused = useIsFocused();
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    address?: string;
  } | null>(null);
  const [status, requestPermission] = useForegroundPermissions();

  const locationHandler = async () => {
    const permissions = await requestThePersmissions(
      status?.status,
      requestPermission,
      'You need to grant location permissions to use this app.'
    );

    if (!permissions) return;

    const location = await getCurrentPositionAsync();

    setLocation({
      lng: location.coords.longitude,
      lat: location.coords.latitude,
    });
  };
  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  };

  useEffect(() => {
    if (!isFocused && !route.params) return;

    const pickedLocation = route.params?.pickedLocation;
    if (pickedLocation) {
      setLocation(pickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function getTheLocation() {
      if (location) {
        const address = await getAdddress(location);
        onLocationTaken({ ...location, address: address });
      }
    }
    getTheLocation();
  }, [location]);

  return (
    <View>
      <View style={styles.mapPreview}>
        {location && (
          <Image
            source={{ uri: getLocationPreview(location) }}
            style={styles.map}
          />
        )}
      </View>
      <View style={styles.actions}>
        <OutlineButton icon='location' onPress={locationHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon='map' onPress={pickOnMapHandler}>
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
