import * as SQLite from 'expo-sqlite';
import { Place } from '../models/place';

export async function init() {
  const database = SQLite.openDatabaseAsync('places.db');

  (await database).withTransactionAsync(async () => {
    await (
      await database
    ).execAsync(
      'CREATE TABLE IF NOT EXISTS places (id TEXT PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);'
    );
  });
  return Promise.resolve();
}

export function insertPlace(place: Place) {
  return SQLite.openDatabaseAsync('places.db').then((db) =>
    db
      .runAsync(
        'INSERT INTO places (id, title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?, ?);',
        [
          place.id || Math.random().toString(),
          place.title || '',
          place.imageUri || '',
          place.address || '',
          place.location.lat || 0,
          place.location.lng || 0,
        ]
      )
      .then((result) => console.log(result.changes))
  );
}

export function fetchPlaces() {
  return SQLite.openDatabaseAsync('places.db').then(async (db) => {
    const places: Place[] = [];
    const result = await db.getAllAsync('SELECT * FROM places;');

    result.forEach((row: any) => {
      places.push({
        id: row.id,
        title: row.title,
        imageUri: row.imageUri,
        address: row.address,
        location: { lat: row.lat, lng: row.lng },
      });
    });

    return places;
  });
}

export function fetchPlace(id: string) {
  return SQLite.openDatabaseAsync('places.db').then(async (db) => {
    const places: Place[] = [];
    const result = await db.getAllAsync('SELECT * FROM places WHERE id = ?;', [
      id,
    ]);

    result.forEach((row: any) => {
      places.push({
        id: row.id,
        title: row.title,
        imageUri: row.imageUri,
        address: row.address,
        location: { lat: row.lat, lng: row.lng },
      });
    });

    return places[0];
  });
}

export function deletePlaceFromDB(id: string) {
  return SQLite.openDatabaseAsync('places.db').then((db) =>
    db.runAsync('DELETE FROM places WHERE id = ?;', [id])
  );
}
