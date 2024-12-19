import { Coordinates } from "../types/types";

/**
 * Fetches the address corresponding to the provided latitude and longitude
 * using the BigDataCloud reverse geocoding API.
 *
 * @param {Coordinates} coordinates - The latitude and longitude of the location.
 * @returns {Promise<any>} - Returns the data from the API, typically containing the address.
 * @throws {Error} - Throws an error if the API request fails.
 */
export async function getAddress({ latitude, longitude }: Coordinates) {
  // Make an HTTP GET request to the
  // BigDataCloud reverse geocoding API using the latitude and longitude
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`,
  );

  // If the response is not successful, throw an error
  if (!res.ok) throw Error("Failed getting address");

  // Parse the response JSON and return the data (the address information)
  const data = await res.json();
  return data;
}
