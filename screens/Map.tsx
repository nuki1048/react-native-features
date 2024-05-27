import { Alert, StyleSheet } from 'react-native';
import React, { useCallback, useLayoutEffect } from 'react';
import MapView, { LatLng, Marker, Region } from 'react-native-maps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import IconButton from '../components/ui/IconButton';

const Map: React.FC<NativeStackScreenProps<RootStackParamList, 'Map'>> = ({
  navigation,
  route,
}) => {
  const location = route.params?.initialLocation;
  console.log(location);
  const region: Region = {
    latitude: location?.lat || 37.78,
    longitude: location?.lng || -122.43,
    longitudeDelta: 0.0922,
    latitudeDelta: 0.0421,
  };
  const [marker, setMarker] = React.useState<LatLng | null>(region);

  const savePickedLocationHandler = useCallback(() => {
    if (!marker) {
      Alert.alert('No location picked!', 'Please pick a location on the map.', [
        { text: 'OK' },
      ]);
      return;
    }
    const pickedLocation = { lat: marker.latitude, lng: marker.longitude };

    navigation.navigate('AddPlace', { pickedLocation });
  }, [marker, navigation]);

  useLayoutEffect(() => {
    if (location) return;
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon='checkmark'
          onPress={savePickedLocationHandler}
          size={24}
          color={tintColor}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      zoomControlEnabled
      showsUserLocation
      onPress={(e) => !location && setMarker(e.nativeEvent.coordinate)}
    >
      {marker && <Marker coordinate={marker} title='Picked location' />}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
