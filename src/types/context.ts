import { type City } from "./city";

export type CitiesContextType = {
  isLoading: boolean;
  cities: City[];
  currentCity: City;
  getCity: (id: string) => void;
  createCity: (city: Omit<City, "id">) => void;
  deleteCity: (id: string) => void;
};
