export const GOOGLE_API_KEY = 'AIzaSyC3PTmhciPEdCsZtxJwfjGOfXKYP0ofDsw';

export function getLocationPreview(coords: { lat: number; lng: number }) {
  const { lng, lat } = coords;

  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x300&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
}

export async function getAdddress(coords: { lat: number; lng: number }) {
  const { lng, lat } = coords;

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch address');
  }

  const data = await response.json();

  const address = data.results[0].formatted_address;
  return address;
}
