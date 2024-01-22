import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import AppLayout from "./pages/AppLayout";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";

function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="cities" />} />
            <Route
              path="cities"
              element={
                <>
                  <CityList />
                </>
              }
            />
            <Route
              path="cities/:id"
              element={
                <>
                  <City />
                </>
              }
            />
            <Route
              path="countries"
              element={
                <>
                  <CountryList />
                </>
              }
            />
            <Route path="form" element={<Form />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  ); //<div>GeoTraveller</div>;
}

export default App;
