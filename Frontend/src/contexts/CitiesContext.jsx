import { createContext, useEffect, useContext, useReducer } from "react";
// import "dotenv/config";
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
          cities: state.cities.filter((city) => city._id !== action.payload),
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

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(function () {
    async function callApi() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/cities`);

        const data = await res.json();
        console.log("sidd inside data context", data);

        dispatch({ type: "cities/created", payload: data });
      } catch (e) {
        console.log("something went wrong");
      }
    }

    callApi();
  }, []);

  async function getCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      console.log("sass inside getcity", data);
      dispatch({ type: "cities/getCity", payload: data });
    } catch (e) {
      console.log("something went wrong");
    }
  }

  async function addCity(newCity) {
    try {
      dispatch({ type: "loading" });
      console.log("sidd req 2", newCity);
      const res = await fetch(`${BASE_URL}/cities/add`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log("sidd data inside addCity", data);
      dispatch({ type: "cities/addCity", payload: data });
    } catch (e) {
      console.log("something went wrong");
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: "loading" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
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
