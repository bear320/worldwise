export type City = {
  cityName: string;
  country: string;
  date: string;
  emoji: string;
  id: string;
  notes: string;
  position: { lat: number; lng: number };
};

export type CitiesContextType = {
  isLoading: boolean;
  cities: City[];
  currentCity: City;
  error: string;
  getCity: (id: string) => void;
  createCity: (city: Omit<City, "id">) => void;
  deleteCity: (id: string) => void;
};

export type StateType = {
  isLoading: boolean;
  cities: City[];
  currentCity: City;
  error: string;
};

export type ActionType =
  | { type: "loading" }
  | { type: "cities/fetched"; payload: City[] }
  | { type: "city/fetched"; payload: City }
  | { type: "city/created"; payload: City }
  | { type: "city/deleted"; payload: string }
  | { type: "rejected"; payload: string };
