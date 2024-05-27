import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Colors } from '../../style/colors';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../ui/Button';
import { Place } from '../../models/place';

const PlaceForm: React.FC<{ onCreatePlace: (data: any) => void }> = ({
  onCreatePlace,
}) => {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const [pickedLocation, setPickedLocation] = useState<{
    lat: number;
    lng: number;
    address?: string;
  } | null>(null);
  const [title, setTitle] = useState<string>('');

  const handleSubmit = () => {
    savePlace();
  };

  const imageHandler = (image: string) => {
    setPickedImage(image);
  };
  const locationHandler = useCallback(
    (location: { lat: number; lng: number; address: string }) => {
      setPickedLocation(location);
    },
    []
  );

  const savePlace = () => {
    const data: Place = {
      location: {
        lat: pickedLocation?.lat,
        lng: pickedLocation?.lng,
      },
      address: pickedLocation?.address,
      title,
      imageUri: pickedImage,
      id: Math.random().toString(),
    };
    onCreatePlace(data);
  };
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput onChangeText={setTitle} value={title} style={styles.input} />
      </View>
      <ImagePicker onImageTaken={imageHandler} />
      <LocationPicker onLocationTaken={locationHandler} />
      <Button onPress={handleSubmit}>Add place</Button>
    </ScrollView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
