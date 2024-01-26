import { createContext, useEffect, useContext, useReducer } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: "",
  };

  function reducer(state, action) {
    switch (action.type) {
      case "loading":
        return {
          ...state,
          isLoading: true,
        };
      case "cities/created":
        return {
          ...state,
          isLoading: false,
          cities: action.payload,
        };
      case "cities/getCity":
        return {
          ...state,
          isLoading: false,
          currentCity: action.payload,
        };
      case "cities/addCity":
        return {
          ...state,
          isLoading: false,
          cities: [...state.cities, action.payload],
          currentCity: action.payload,
        };
      case "cities/deleteCity":
        return {
          ...state,
          isLoading: false,
          cities: state.cities.filter((city) => city.id !== action.payload),
        };
      case "rejected":
        return {
          ...state,
          error: action.payload,
        };

      default:
        return state;
    }
  }

  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const BASE_URL = "http://localhost:9000";

  useEffect(function () {
    async function callApi() {
      try {
        // setIsLoading(true);
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        // setCities(data);
        dispatch({ type: "cities/created", payload: data });
      } catch (e) {
        console.log("something went wrong");
      }
    }

    callApi();
  }, []);

  async function getCity(id) {
    try {
      // setIsLoading(true);
      if (Number(id) == currentCity.id) return;
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      // setCurrentCity(data);
      dispatch({ type: "cities/getCity", payload: data });
    } catch (e) {
      console.log("something went wrong");
    }
  }

  async function addCity(newCity) {
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);

      // setCities((cities) => [...cities, data]);
      dispatch({ type: "cities/addCity", payload: data });
    } catch (e) {
      console.log("something went wrong");
    }
  }

  async function deleteCity(id) {
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: "cities/deleteCity", payload: id });
    } catch (e) {
      console.log("something went wron,id not found");
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        addCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context == undefined)
    throw new Error("Tried to get access of context from outer position");

  return context;
}

export { CitiesProvider, useCities };
