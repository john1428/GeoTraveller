import { useContext, useReducer, createContext } from "react";

const AuthContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isUserVerified: true };
    case "logout":
      return { ...state, user: null, isUserVerified: false };

    default:
      throw new Error("Could not find user");
  }
}

function FakeAuthProvider({ children }) {
  const initialState = {
    user: null,
    isUserVerified: false,
  };

  function login(email, password) {
    if (email == FAKE_USER.email && password == FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  const [{ user, isUserVerified }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <AuthContext.Provider
      value={{
        isUserVerified,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const authcontext = useContext(AuthContext);
  if (authcontext == undefined)
    throw new Error("Tried to get context from outside scopre");
  return authcontext;
}

export { useAuth, FakeAuthProvider };
