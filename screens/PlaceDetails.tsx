import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import OutlineButton from '../components/ui/OutlineButton';
import { Place } from '../models/place';
import { Colors } from '../style/colors';
import { deletePlaceFromDB, fetchPlace, init } from '../utils/database';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
type Props = NativeStackScreenProps<RootStackParamList, 'PlaceDetails'>;

const PlaceDetails: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const [place, setPlace] = useState<Place | null>(null);
  const showOnMapHandler = () => {
    console.log('Show on map');
    navigation.navigate('Map', {
      initialLocation: {
        lat: place?.location?.lat || 0,
        lng: place?.location?.lng || 0,
      },
    });
  };

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Warning!',
        body: `You are successfuly deleted the place: ${place?.title}!`,
      },
      trigger: { seconds: 2 },
    });
  }

  const deletePlace = async () => {
    await deletePlaceFromDB(id);
    schedulePushNotification();
    navigation.navigate('AllPlaces');
  };

  useEffect(() => {
    const loadPlace = async () => {
      const place = await fetchPlace(id);

      navigation.setOptions({
        title: place?.title,
      });
      setPlace(place);
    };
    loadPlace();
  }, []);

  if (!place) {
    return (
      <View style={styles.fallbackContainer}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {place?.imageUri && (
        <Image style={styles.image} source={{ uri: place?.imageUri }} />
      )}
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place?.address}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <OutlineButton icon='map' onPress={showOnMapHandler}>
            View on map
          </OutlineButton>
          <OutlineButton icon='trash' onPress={deletePlace}>
            Delete place
          </OutlineButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
