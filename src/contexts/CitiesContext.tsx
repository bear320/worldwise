import { useEffect, useReducer, createContext, useCallback } from "react";
import { City, CitiesStateType, CitiesActionType, CitiesContextType } from "../types";

const CitiesContext = createContext({} as CitiesContextType);

const initialState: CitiesStateType = {
  isLoading: false,
  cities: [],
  currentCity: {} as City,
  error: "",
};

const reducer = (state: CitiesStateType, action: CitiesActionType): CitiesStateType => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/fetched":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/fetched":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {} as City,
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
};

const CitiesProvider = ({ children }: { children: React.ReactNode }) => {
  const [{ isLoading, cities, currentCity, error }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/fetched", payload: data });
      } catch (error) {
        console.error(error);
        dispatch({ type: "rejected", payload: "Failed to fetch cities" });
      }
    };

    fetchCities();
  }, []);

  const getCity = useCallback(
    async (id: string) => {
      if (+id === +currentCity.id) return;

      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/fetched", payload: data });
      } catch (error) {
        console.error(error);
        dispatch({ type: "rejected", payload: "Failed to fetch city" });
      }
    },
    [currentCity.id]
  );

  const createCity = async (city: Omit<City, "id">) => {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      console.error(error);
      dispatch({ type: "rejected", payload: "Failed to create city" });
    }
  };

  const deleteCity = async (id: string) => {
    dispatch({ type: "loading" });

    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (error) {
      console.error(error);
      dispatch({ type: "rejected", payload: "Failed to delete city" });
    }
  };

  return (
    <CitiesContext.Provider value={{ isLoading, cities, currentCity, error, getCity, createCity, deleteCity }}>
      {children}
    </CitiesContext.Provider>
  );
};

export { CitiesContext, CitiesProvider };
