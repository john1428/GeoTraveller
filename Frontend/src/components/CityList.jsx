import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CityList() {
  // console.log("cities are :", cities);
  // console.log("isLoading here", isLoading);
  const { cities, isLoading } = useCities();
  if (isLoading) {
    return <Spinner />;
  }
  if (cities === undefined) {
    return <Message />; // or any other appropriate fallback
  }

  // Check if cities is an array
  if (!cities.length) {
    return <Message message="Add cities by clicking on the map" />;
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
