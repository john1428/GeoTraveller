import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) {
    return <Spinner />;
  }
  if (cities === undefined) {
    return <Message />;
  }

  if (!cities.length) {
    return <Message message="Add cities by clicking on the map" />;
  }

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city._id} />
      ))}
    </ul>
  );
}

export default CityList;
