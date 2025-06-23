import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getAllBreeds, getBreedImages, getBreedThumbnail } from "./DogApi";

const API_BASE_URL = "https://dog.ceo/api";

describe("DogApi Service", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  // Test case for getAllBreeds success
  describe("getAllBreeds", () => {
    it("should fetch and parse all breeds successfully", async () => {
      const mockData = {
        message: {
          affenpinscher: [],
          african: [],
          airedale: [],
        },
        status: "success",
      };
      mock.onGet(`${API_BASE_URL}/breeds/list/all`).reply(200, mockData);

      const breeds = await getAllBreeds();

      expect(breeds).toEqual(["affenpinscher", "african", "airedale"]);
      expect(breeds.length).toBe(3);
    });

    it("should throw an error if the API call fails", async () => {
      mock.onGet(`${API_BASE_URL}/breeds/list/all`).networkError();

      await expect(getAllBreeds()).rejects.toThrow(
        "Failed to fetch dog breeds."
      );
    });
  });

  // Test case for getBreedImages success and failure
  describe("getBreedImages", () => {
    const breedName = "boxer";

    it("should fetch images for a specific breed successfully", async () => {
      const mockData = {
        message: [
          "https://images.dog.ceo/breeds/boxer/n02108089_1.jpg",
          "https://images.dog.ceo/breeds/boxer/n02108089_10.jpg",
        ],
        status: "success",
      };
      mock
        .onGet(`${API_BASE_URL}/breed/${breedName}/images`)
        .reply(200, mockData);

      const images = await getBreedImages(breedName);

      expect(images).toEqual(mockData.message);
      expect(images.length).toBe(2);
    });

    it("should throw an error if fetching images fails", async () => {
      mock.onGet(`${API_BASE_URL}/breed/${breedName}/images`).reply(500);

      await expect(getBreedImages(breedName)).rejects.toThrow(
        `Failed to fetch images for ${breedName}.`
      );
    });
  });

  describe("getBreedThumbnail", () => {
    const breedName = "labrador";
    it("should fetch a random thumbnail for a breed successfully", async () => {
      const mockData = {
        message: "https://images.dog.ceo/breeds/labrador/n02099712_1006.jpg",
        status: "success",
      };
      mock
        .onGet(`${API_BASE_URL}/breed/${breedName}/images/random`)
        .reply(200, mockData);
      const url = await getBreedThumbnail(breedName);
      expect(url).toBe(mockData.message);
    });
    it("should return null if the API call fails", async () => {
      mock
        .onGet(`${API_BASE_URL}/breed/${breedName}/images/random`)
        .networkError();
      const url = await getBreedThumbnail(breedName);
      expect(url).toBeNull();
    });
    it("should return null if API status is not success", async () => {
      const mockData = {
        message: "",
        status: "error",
      };
      mock
        .onGet(`${API_BASE_URL}/breed/${breedName}/images/random`)
        .reply(200, mockData);
      const url = await getBreedThumbnail(breedName);
      expect(url).toBeNull();
    });
  });
});
