// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import Message from "./Message";
import Button from "./Button";
import BackButton from "./BackButton";
import styles from "./Form.module.scss";

export function convertToEmoji(countryCode: string) {
  if (!countryCode) return "";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char: string) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const { lat, lng } = useUrlPosition();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [cityName, setCityName] = useState("");
  // const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();
        console.log(data);

        if (!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else 😉");

        setCityName(data.city || data.locality || "");
        // setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        console.error(error);
        setError((error as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCityData();
  }, [lat, lng]);

  if (isLoading) return <Spinner />;

  if (error) return <Message msg={error} />;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input id="cityName" onChange={(e) => setCityName(e.target.value)} value={cityName} />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input id="date" type="date" onChange={(e) => setDate(e.target.value)} value={date} />
        {/* <input
          id="date"
          type="date"
          onChange={(e) => setDate(e.target.valueAsDate!)}
          value={date.toISOString().split("T")[0]}
        /> */}
        {/* <input id="date" type="date" onChange={(e) => setDate(e.target.valueAsDate || new Date())} value={date.toISOString().split('T')[0]} /> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
