import { type City } from "./city";

export type ContextType = {
  cities: City[];
  isLoading: boolean;
};
