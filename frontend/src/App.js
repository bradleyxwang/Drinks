import "./vendors/bootstrap/css/bootstrap.min.css";
import "./vendors/bootstrap/bootstrap.min.css";
import "./vendors/fontawesome/css/all.min.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyApp from "./components";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import Profile from "./components/profile";
import SearchResults from "./components/search-results";
import DrinkDetails from "./components/drink-details";
import SearchPage from "./components/search-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyApp />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/:uid" element={<Profile />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="results" element={<SearchResults />} />
          <Route path="details/:did" element={<DrinkDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
