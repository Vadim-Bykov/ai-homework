import axios from "axios";

const API_BASE_URL = "https://dog.ceo/api";

/**
 * Fetches a list of all dog breeds.
 * @returns {Promise<string[]>} A promise that resolves to an array of breed names.
 */
export const getAllBreeds = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/breeds/list/all`);
    // The API returns a message object where keys are breed names.
    const breeds = Object.keys(response.data.message);
    return breeds;
  } catch (error) {
    console.error("Error fetching all breeds:", error);
    throw new Error("Failed to fetch dog breeds.");
  }
};

/**
 * Fetches a list of image URLs for a specific dog breed.
 * @param {string} breedName - The name of the breed to fetch images for.
 * @returns {Promise<string[]>} A promise that resolves to an array of image URLs.
 */
export const getBreedImages = async (breedName: string): Promise<string[]> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/breed/${breedName}/images`
    );
    // The API returns a message object containing an array of image URLs.
    return response.data.message;
  } catch (error) {
    console.error(`Error fetching images for breed ${breedName}:`, error);
    throw new Error(`Failed to fetch images for ${breedName}.`);
  }
};
