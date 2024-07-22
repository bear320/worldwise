import { useOutletContext } from "react-router-dom";
import { City, Country, ContextType } from "../types";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.scss";

const CountryList = () => {
  const { cities, isLoading } = useOutletContext<ContextType>();

  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message msg="Add your first city by clicking on a city on the map" />;

  const courtries: Country[] = cities.reduce((arr: Country[], city: City) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {courtries.map((country: Country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
};

export default CountryList;
