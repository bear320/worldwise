import { useOutletContext } from "react-router-dom";
import { City, ContextType } from "../types";
import Spinner from "./Spinner";
import Message from "./Message";
import CityItem from "./CityItem";
import styles from "./CityList.module.scss";

const CityList = () => {
  const { cities, isLoading } = useOutletContext<ContextType>();

  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message msg="Add your first city by clicking on a city on the map" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city: City) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
};

export default CityList;
