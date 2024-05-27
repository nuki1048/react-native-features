export interface Location {
  lng: number | undefined;
  lat: number | undefined;
}
export interface Place {
  title: string;
  imageUri?: string | null;
  address: string | undefined;
  location: Location;
  id: string;
}
